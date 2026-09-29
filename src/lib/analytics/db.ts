import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import crypto from "crypto";
import type { AnalyticsEventType, AnalyticsStats } from "./types";

let sqlClient: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;

  if (!sqlClient) {
    sqlClient = neon(dbUrl);
  }
  return sqlClient;
}

// In-memory fallback for local development or when database is offline
const memoryStore = {
  visitors: new Map<string, { id: string; hash: string; lastSeen: Date }>(),
  events: [] as {
    id: string;
    visitorId: string;
    type: AnalyticsEventType;
    path: string;
    metadata: Record<string, unknown>;
    createdAt: Date;
  }[],
};

/**
 * Computes a SHA-256 hash of the visitor's random identifier.
 * Ensures that the raw cookie identifier is pseudonymized before storage.
 */
export function hashVisitorId(rawId: string): string {
  return crypto.createHash("sha256").update(rawId).digest("hex");
}

/**
 * Resolves or creates a visitor record based on the hashed visitor ID.
 * Returns the internal database visitor ID.
 */
export async function resolveVisitor(rawVisitorId: string): Promise<string> {
  const visitorHash = hashVisitorId(rawVisitorId);
  const sql = getSql();

  if (!sql) {
    const existing = memoryStore.visitors.get(visitorHash);
    if (existing) {
      existing.lastSeen = new Date();
      return existing.id;
    }
    const newId = crypto.randomUUID();
    memoryStore.visitors.set(visitorHash, {
      id: newId,
      hash: visitorHash,
      lastSeen: new Date(),
    });
    return newId;
  }

  try {
    const newId = crypto.randomUUID();
    const rows = await sql`
      INSERT INTO visitors (id, visitor_hash, first_seen, last_seen, created_at, updated_at)
      VALUES (${newId}, ${visitorHash}, NOW(), NOW(), NOW(), NOW())
      ON CONFLICT (visitor_hash)
      DO UPDATE SET last_seen = NOW(), updated_at = NOW()
      RETURNING id;
    `;

    return (rows[0] as { id: string }).id;
  } catch (err) {
    console.warn("[Analytics DB] Failed to resolve visitor in database, using fallback:", err);
    const existing = memoryStore.visitors.get(visitorHash);
    if (existing) return existing.id;
    const fallbackId = crypto.randomUUID();
    memoryStore.visitors.set(visitorHash, {
      id: fallbackId,
      hash: visitorHash,
      lastSeen: new Date(),
    });
    return fallbackId;
  }
}

/**
 * Records an analytics event in the database.
 */
export async function recordEvent({
  visitorId,
  type,
  path,
  metadata = {},
}: {
  visitorId: string;
  type: AnalyticsEventType;
  path: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const sql = getSql();
  const eventId = crypto.randomUUID();

  if (!sql) {
    memoryStore.events.push({
      id: eventId,
      visitorId,
      type,
      path,
      metadata,
      createdAt: new Date(),
    });
    return;
  }

  try {
    const jsonMetadata = JSON.stringify(metadata);
    await sql`
      INSERT INTO analytics_events (id, visitor_id, type, path, metadata, created_at)
      VALUES (${eventId}, ${visitorId}, ${type}, ${path}, ${jsonMetadata}::jsonb, NOW());
    `;
  } catch (err) {
    console.warn("[Analytics DB] Failed to record event in database, using fallback:", err);
    memoryStore.events.push({
      id: eventId,
      visitorId,
      type,
      path,
      metadata,
      createdAt: new Date(),
    });
  }
}

/**
 * Fetches aggregate statistics for display and reporting.
 * Never exposes visitor hashes, IPs, or individual session histories.
 */
export async function getAggregateStats(): Promise<AnalyticsStats> {
  const sql = getSql();

  const emptyEventCounts: Record<AnalyticsEventType, number> = {
    page_view: 0,
    project_view: 0,
    github_click: 0,
    live_demo_click: 0,
    resume_download: 0,
    contact_click: 0,
  };

  if (!sql) {
    const eventCounts = { ...emptyEventCounts };
    for (const ev of memoryStore.events) {
      if (eventCounts[ev.type] !== undefined) {
        eventCounts[ev.type]++;
      }
    }
    return {
      uniqueVisitors: memoryStore.visitors.size,
      totalPageViews: eventCounts.page_view,
      topProjects: [],
      eventCounts,
    };
  }

  try {
    const [visitorCountResult, pageViewsResult, eventCountsResult, topProjectsResult] =
      await Promise.all([
        sql`SELECT COUNT(*)::int AS count FROM visitors;`,
        sql`SELECT COUNT(*)::int AS count FROM analytics_events WHERE type = 'page_view';`,
        sql`SELECT type, COUNT(*)::int AS count FROM analytics_events GROUP BY type;`,
        sql`
          SELECT metadata->>'project' AS project, COUNT(*)::int AS count
          FROM analytics_events
          WHERE type = 'project_view' AND metadata->>'project' IS NOT NULL
          GROUP BY project
          ORDER BY count DESC
          LIMIT 5;
        `,
      ]);

    const uniqueVisitors = (visitorCountResult[0] as { count: number })?.count ?? 0;
    const totalPageViews = (pageViewsResult[0] as { count: number })?.count ?? 0;

    const eventCounts = { ...emptyEventCounts };
    for (const row of eventCountsResult as { type: AnalyticsEventType; count: number }[]) {
      if (eventCounts[row.type] !== undefined) {
        eventCounts[row.type] = row.count;
      }
    }

    const topProjects = (topProjectsResult as { project: string; count: number }[]).map(
      (r) => ({
        project: r.project,
        count: r.count,
      }),
    );

    return {
      uniqueVisitors,
      totalPageViews,
      topProjects,
      eventCounts,
    };
  } catch (err) {
    console.warn("[Analytics DB] Failed to query stats, falling back to memory:", err);
    return {
      uniqueVisitors: memoryStore.visitors.size,
      totalPageViews: 0,
      topProjects: [],
      eventCounts: emptyEventCounts,
    };
  }
}
