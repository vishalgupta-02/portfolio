"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/tracker";

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Deduplicate rapid re-renders on identical path
    if (lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    // Non-blocking trigger after paint / hydration
    const timer = window.setTimeout(() => {
      trackEvent("page_view");
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
