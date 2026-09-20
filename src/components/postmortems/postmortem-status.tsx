import React from "react"
import { cn } from "@/lib/utils"
import type { PostmortemStatus } from "@/lib/postmortems/types"

interface PostmortemStatusBadgeProps {
  status: PostmortemStatus
  className?: string
}

const statusConfig: Record<
  PostmortemStatus,
  {
    label: string
    ariaLabel: string
    dotClass: string
    containerClass: string
  }
> = {
  resolved: {
    label: "Resolved",
    ariaLabel: "Incident Status: Resolved — mitigation applied and verified",
    dotClass: "bg-emerald-500 dark:bg-emerald-400",
    containerClass:
      "border-border text-muted-foreground bg-muted/30 font-medium",
  },
  monitoring: {
    label: "Monitoring",
    ariaLabel: "Incident Status: Monitoring — fix deployed, telemetry being observed",
    dotClass: "bg-amber-500 dark:bg-amber-400 animate-pulse",
    containerClass:
      "border-amber-500/30 text-amber-700 dark:text-amber-300 bg-amber-500/10 font-medium",
  },
  open: {
    label: "Investigating",
    ariaLabel: "Incident Status: Open / Under Active Investigation",
    dotClass: "bg-rose-500 dark:bg-rose-400 animate-ping",
    containerClass:
      "border-rose-500/30 text-rose-700 dark:text-rose-300 bg-rose-500/10 font-medium",
  },
}

export function PostmortemStatusBadge({
  status,
  className,
}: PostmortemStatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.resolved

  return (
    <span
      role="status"
      aria-label={config.ariaLabel}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs tracking-tight uppercase select-none font-mono",
        config.containerClass,
        className,
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", config.dotClass)}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  )
}
