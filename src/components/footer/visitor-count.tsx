"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function VisitorCount() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Fetch aggregate count after initial hydration non-blocking
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/analytics/stats");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.uniqueVisitors === "number") {
            setVisitorCount(data.uniqueVisitors);
          }
        }
      } catch {
        // Fails silently, visitor count badge simply hides or displays fallback
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, []);

  if (visitorCount === null || visitorCount === undefined) {
    return null;
  }

  return (
    <div
      title="Anonymous, first-party verified unique portfolio visitors"
      className="bg-muted/40 border-border/50 flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
    >
      <Users className="size-3 text-emerald-500/80" aria-hidden="true" />
      <span className="font-mono">
        {visitorCount.toLocaleString()} {visitorCount === 1 ? "visitor" : "visitors"}
      </span>
    </div>
  );
}
