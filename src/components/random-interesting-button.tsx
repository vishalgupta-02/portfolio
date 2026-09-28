"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Compass } from "lucide-react";
import { getRandomInterestingItem } from "@/lib/content-index";

interface RandomInterestingButtonProps {
  variant?: "hero" | "banner";
  className?: string;
}

export default function RandomInterestingButton({
  variant = "hero",
  className = "",
}: RandomInterestingButtonProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [peekItem, setPeekItem] = useState<{ title: string; url: string } | null>(null);

  const handleDiscovery = () => {
    setIsNavigating(true);
    const item = getRandomInterestingItem();
    setPeekItem({ title: item.title, url: item.url });
    setTimeout(() => {
      router.push(item.url);
      setIsNavigating(false);
    }, 180);
  };

  if (variant === "banner") {
    return (
      <div className={`rounded-xl border border-border/40 bg-card/20 p-4 transition-all duration-200 hover:border-border/70 hover:bg-card/40 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Curious where to start?</p>
            <p className="text-xs sm:text-sm text-foreground/90 font-medium font-display mt-0.5">
              Jump straight into a real production postmortem or concurrency breakdown.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDiscovery}
            disabled={isNavigating}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/70 px-3 py-1.5 text-xs font-medium text-foreground transition-all active:scale-[0.98] cursor-pointer"
          >
            <Compass className="size-3.5 text-muted-foreground" />
            <span>{isNavigating ? "Selecting..." : "Give me something interesting →"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDiscovery}
      disabled={isNavigating}
      aria-label="Explore a random engineering highlight"
      className={`group inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/20 hover:bg-muted/50 hover:border-border/80 px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-[0.98] cursor-pointer ${className}`}
    >
      <Compass className="size-3 transition-transform duration-200 group-hover:rotate-45" />
      <span>{isNavigating ? "Opening..." : "Give me something interesting"}</span>
      <span className="text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
    </button>
  );
}
