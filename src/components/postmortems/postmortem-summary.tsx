import React from "react"
import { cn } from "@/lib/utils"
import type { PostmortemMetadata } from "@/lib/postmortems/types"
import { PostmortemSeverityBadge } from "./postmortem-severity"
import { PostmortemStatusBadge } from "./postmortem-status"
import {
  AlertTriangle,
  Clock,
  Layers,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react"

interface PostmortemSummaryProps {
  metadata: PostmortemMetadata
  className?: string
}

export function PostmortemSummary({
  metadata,
  className,
}: PostmortemSummaryProps) {
  return (
    <section
      aria-label="Incident Summary Overview"
      className={cn(
        "my-8 rounded-xl border border-border bg-card/60 p-5 sm:p-6 shadow-xs backdrop-blur-xs",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Zap className="size-3.5 text-foreground" aria-hidden="true" />
          Incident Summary
        </h2>
        <div className="flex items-center gap-2">
          <PostmortemSeverityBadge severity={metadata.severity} />
          <PostmortemStatusBadge status={metadata.status} />
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {metadata.duration && (
          <div className="flex items-start gap-2.5">
            <Clock
              className="size-4 shrink-0 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                Duration / Time to Resolve
              </dt>
              <dd className="font-medium text-foreground mt-0.5">
                {metadata.duration}
              </dd>
            </div>
          </div>
        )}

        {metadata.category && (
          <div className="flex items-start gap-2.5">
            <Layers
              className="size-4 shrink-0 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                Domain / Category
              </dt>
              <dd className="font-medium text-foreground capitalize mt-0.5">
                {metadata.category}
              </dd>
            </div>
          </div>
        )}

        {metadata.systemsAffected && metadata.systemsAffected.length > 0 && (
          <div className="sm:col-span-2 flex items-start gap-2.5">
            <Server
              className="size-4 shrink-0 text-muted-foreground mt-0.5"
              aria-hidden="true"
            />
            <div>
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                Systems & Components Affected
              </dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {metadata.systemsAffected.map((sys) => (
                  <span
                    key={sys}
                    className="inline-flex items-center rounded border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-foreground"
                  >
                    {sys}
                  </span>
                ))}
              </dd>
            </div>
          </div>
        )}

        {metadata.impact && (
          <div className="sm:col-span-2 flex items-start gap-2.5 border-t border-border/60 pt-3">
            <AlertTriangle
              className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                User / System Impact
              </dt>
              <dd className="text-foreground leading-relaxed">
                {metadata.impact}
              </dd>
            </div>
          </div>
        )}

        {metadata.rootCause && (
          <div className="sm:col-span-2 flex items-start gap-2.5 border-t border-border/60 pt-3">
            <Zap
              className="size-4 shrink-0 text-rose-500 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                Root Cause
              </dt>
              <dd className="text-foreground leading-relaxed">
                {metadata.rootCause}
              </dd>
            </div>
          </div>
        )}

        {metadata.resolution && (
          <div className="sm:col-span-2 flex items-start gap-2.5 border-t border-border/60 pt-3">
            <ShieldCheck
              className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-0.5">
              <dt className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">
                Key Resolution
              </dt>
              <dd className="text-foreground leading-relaxed">
                {metadata.resolution}
              </dd>
            </div>
          </div>
        )}
      </dl>
    </section>
  )
}
