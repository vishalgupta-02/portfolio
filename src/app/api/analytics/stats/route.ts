import { NextResponse } from "next/server";
import { getAggregateStats } from "@/lib/analytics/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const stats = await getAggregateStats();

    // Check optional admin authorization header for complete internal stats
    const authHeader = request.headers.get("x-analytics-key");
    const adminKey = process.env.ADMIN_ANALYTICS_KEY;

    if (adminKey && authHeader === adminKey) {
      return NextResponse.json(stats, {
        headers: {
          "Cache-Control": "private, no-cache",
        },
      });
    }

    // Public response: strictly aggregated visitor count only
    return NextResponse.json(
      {
        uniqueVisitors: stats.uniqueVisitors,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (err) {
    console.error("[Analytics Stats API Error]", err);
    return NextResponse.json({ uniqueVisitors: 0 }, { status: 500 });
  }
}
