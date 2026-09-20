import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "vishalgupta-02";

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured in environment variables." },
      { status: 500 },
    );
  }

  try {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    const from = oneYearAgo.toISOString();
    const to = now.toISOString();

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Next.js GitHub Graph Widget",
      },
      body: JSON.stringify({
        query: GITHUB_CONTRIBUTIONS_QUERY,
        variables: { username, from, to },
      }),
      next: {
        revalidate: 3600,
      },

    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `GitHub API error: ${response.status} ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return NextResponse.json(
        { error: data.errors[0]?.message || "GraphQL query error." },
        { status: 400 },
      );
    }

    const calendar =
      data.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: `No contributions found for GitHub user "${username}".` },
        { status: 404 },
      );
    }

    const contributions: { date: string; count: number; level: number }[] = [];

    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level:
            LEVEL_MAP[day.contributionLevel] ??
            (day.contributionCount > 0 ? 1 : 0),
        });
      }
    }

    return NextResponse.json(
      {
        total: {
          lastYear: calendar.totalContributions,
        },
        contributions,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch contributions from GitHub API.",
      },
      { status: 500 },
    );
  }
}
