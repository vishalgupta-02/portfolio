import Link from "next/link";
import { ArrowUpRight, History, GitCommit } from "lucide-react";
import { BUILD_LOG_ENTRIES } from "@/lib/content-index";

export default function BuildLog() {
  return (
    <section
      id="build-log"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8 scroll-mt-16"
      aria-label="Engineering Build Log and Activity"
    >
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground font-sans text-xl font-semibold tracking-tight">
            Build Log &amp; System Milestones
          </h2>
          <p className="text-muted-foreground font-display mt-0.5 text-xs">
            Chronological engineering activity, production investigations, and architectural deployments
          </p>
        </div>
      </div>

      <div className="relative border-l border-border/60 ml-2.5 space-y-5">
        {BUILD_LOG_ENTRIES.map((entry) => (
          <div key={entry.title} className="relative pl-5 group">
            <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border border-border bg-background transition-colors group-hover:border-foreground/80 group-hover:bg-foreground" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="font-sans font-semibold text-xs text-foreground">
                {entry.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {entry.date}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.2 rounded border border-border/50 bg-muted/20 text-muted-foreground">
                  {entry.category}
                </span>
              </div>
            </div>

            <p className="font-display text-xs text-foreground/80 leading-relaxed">
              {entry.summary}
            </p>

            {entry.relatedUrl && (
              <div className="mt-1.5">
                <Link
                  href={entry.relatedUrl}
                  className="font-mono text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                >
                  <span>{entry.relatedLabel || "Investigate Details"}</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
