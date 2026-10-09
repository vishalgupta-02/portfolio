import { NextResponse } from "next/server";
import { z } from "zod";
import { recordEvent, resolveVisitor } from "@/lib/analytics/db";

export const dynamic = "force-dynamic";

const eventRequestSchema = z.object({
  type: z.enum([
    "page_view",
    "project_view",
    "github_click",
    "live_demo_click",
    "resume_download",
    "contact_click",
  ]),
  path: z.string().max(255).default("/"),
  visitorId: z.string().max(128).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// Simple sliding window rate limiter to prevent automated flood / abuse
const rateLimitWindow = new Map<string, { count: number; expiresAt: number }>();
const WINDOW_DURATION_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 60;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitWindow.get(identifier);

  if (!record || record.expiresAt < now) {
    rateLimitWindow.set(identifier, { count: 1, expiresAt: now + WINDOW_DURATION_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// Deduplication window: suppress duplicate events from the same visitor on the same path within 15 seconds
const recentEventsCache = new Map<string, number>();
const DEDUP_WINDOW_MS = 15 * 1000;

function isDuplicateEvent(visitorId: string, type: string, path: string): boolean {
  const now = Date.now();
  const key = `${visitorId}:${type}:${path}`;
  const lastTime = recentEventsCache.get(key);

  // Periodic pruning of stale keys
  if (recentEventsCache.size > 1000) {
    for (const [k, timestamp] of recentEventsCache.entries()) {
      if (now - timestamp > DEDUP_WINDOW_MS) {
        recentEventsCache.delete(k);
      }
    }
  }

  if (lastTime && now - lastTime < DEDUP_WINDOW_MS) {
    return true;
  }

  recentEventsCache.set(key, now);
  return false;
}

export async function POST(request: Request) {
  try {
    // 0. Development environment guard: telemetry is strictly production-only
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, devMode: true });
    }

    // 1. Payload size check
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 4096) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const body = await request.json();
    const parseResult = eventRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid analytics event payload" },
        { status: 400 },
      );
    }

    const { type, path, metadata } = parseResult.data;

    // 2. Resolve visitor identifier from cookie or payload
    const cookieHeader = request.headers.get("cookie") || "";
    let rawVisitorId = parseResult.data.visitorId || "";

    const cookies = cookieHeader.split("; ");
    for (const cookie of cookies) {
      const [name, val] = cookie.split("=");
      if (name === "_pa_vid" && val) {
        rawVisitorId = decodeURIComponent(val);
        break;
      }
    }

    let isNewCookie = false;
    if (!rawVisitorId) {
      rawVisitorId = crypto.randomUUID();
      isNewCookie = true;
    }

    // 3. Abuse prevention via rate limiting on visitor
    if (isRateLimited(rawVisitorId)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // 4. Resolve visitor identifier
    const internalVisitorId = await resolveVisitor(rawVisitorId);

    // 5. Deduplication check: suppress identical events within 15 seconds
    if (isDuplicateEvent(internalVisitorId, type, path)) {
      return NextResponse.json({ ok: true, deduplicated: true });
    }

    // 6. Record event
    await recordEvent({
      visitorId: internalVisitorId,
      type,
      path,
      metadata,
    });

    const response = NextResponse.json({ ok: true });

    if (isNewCookie) {
      response.cookies.set("_pa_vid", rawVisitorId, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
        sameSite: "lax",
        httpOnly: false,
      });
    }

    return response;
  } catch (err) {
    console.error("[Analytics API Error]", err);
    // Return standard error without exposing internals
    return NextResponse.json({ error: "Unable to process telemetry" }, { status: 500 });
  }
}
