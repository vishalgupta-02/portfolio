import React from "react"
import { cn } from "@/lib/utils"
import type { PostmortemSeverity } from "@/lib/postmortems/types"

interface PostmortemSeverityBadgeProps {
  severity: PostmortemSeverity
  className?: string
  showIcon?: boolean
}

const severityConfig: Record<
  PostmortemSeverity,
  {
    label: string
    ariaLabel: string
    dotClass: string
    containerClass: string
  }
> = {
  low: {
    label: "Low Severity",
    ariaLabel: "Severity Level: Low — minimal user or service impact",
    dotClass: "bg-emerald-500 dark:bg-emerald-400",
    containerClass:
      "border-border bg-muted/40 text-foreground dark:bg-muted/20",
  },
  medium: {
    label: "Medium Severity",
    ariaLabel: "Severity Level: Medium — partial service degradation or localized issue",
    dotClass: "bg-amber-500 dark:bg-amber-400",
    containerClass:
      "border-border bg-muted/40 text-foreground dark:bg-muted/20",
  },
  high: {
    label: "High Severity",
    ariaLabel: "Severity Level: High — significant impact on core workflows or authentication",
    dotClass: "bg-orange-500 dark:bg-orange-400",
    containerClass:
      "border-border bg-muted/40 text-foreground dark:bg-muted/20",
  },
  critical: {
    label: "Critical Severity",
    ariaLabel: "Severity Level: Critical — full service outage or critical security failure",
    dotClass: "bg-rose-500 dark:bg-rose-400 animate-pulse",
    containerClass:
      "border-border bg-muted/40 text-foreground dark:bg-muted/20",
  },
}

export function PostmortemSeverityBadge({
  severity,
  className,
  showIcon = true,
}: PostmortemSeverityBadgeProps) {
  const config = severityConfig[severity] ?? severityConfig.medium

  return (
    <span
      role="status"
      aria-label={config.ariaLabel}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight select-none",
        config.containerClass,
        className,
      )}
    >
      {showIcon && (
        <span
          className={cn("size-1.5 shrink-0 rounded-full", config.dotClass)}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  )
}
