import React from "react"
import { cn } from "@/lib/utils"

export interface TimelineEventItem {
  time: string
  title: string
  description?: string
  status?: "detected" | "investigating" | "identified" | "mitigated" | "resolved"
}

interface TimelineProps {
  children?: React.ReactNode
  items?: TimelineEventItem[]
  className?: string
}

interface TimelineEventProps {
  time: string
  title: string
  status?: "detected" | "investigating" | "identified" | "mitigated" | "resolved"
  children?: React.ReactNode
  className?: string
}

export function TimelineEvent({
  time,
  title,
  status = "investigating",
  children,
  className,
}: TimelineEventProps) {
  const getDotStyle = (s?: string) => {
    switch (s) {
      case "detected":
        return "border-rose-500 bg-rose-500/20 text-rose-500"
      case "identified":
        return "border-amber-500 bg-amber-500/20 text-amber-500"
      case "mitigated":
        return "border-blue-500 bg-blue-500/20 text-blue-500"
      case "resolved":
        return "border-emerald-500 bg-emerald-500/20 text-emerald-500"
      case "investigating":
      default:
        return "border-muted-foreground/60 bg-muted text-muted-foreground"
    }
  }

  return (
    <li className={cn("relative pl-7 pb-6 last:pb-2 group", className)}>
      {/* Vertical Connecting Line */}
      <span
        className="absolute left-[7px] top-3 bottom-0 w-px bg-border group-last:hidden"
        aria-hidden="true"
      />

      {/* Status Dot */}
      <span
        className={cn(
          "absolute left-0 top-1.5 size-3.5 rounded-full border-2 bg-background flex items-center justify-center transition-colors",
          getDotStyle(status),
        )}
        aria-hidden="true"
      >
        <span className="size-1 rounded-full bg-current" />
      </span>

      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <time className="font-mono text-xs font-semibold text-muted-foreground">
            {time}
          </time>
          <span className="text-muted-foreground/50 text-xs hidden sm:inline" aria-hidden="true">
            —
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>

        {children && (
          <div className="text-xs text-muted-foreground leading-relaxed pt-0.5">
            {children}
          </div>
        )}
      </div>
    </li>
  )
}

export function Timeline({ children, items, className }: TimelineProps) {
  return (
    <ol
      role="list"
      aria-label="Incident Timeline"
      className={cn(
        "my-6 space-y-0 rounded-xl border border-border bg-card/40 p-5 font-sans sm:p-6",
        className,
      )}
    >
      {items
        ? items.map((item, index) => (
            <TimelineEvent
              key={index}
              time={item.time}
              title={item.title}
              status={item.status}
            >
              {item.description}
            </TimelineEvent>
          ))
        : children}
    </ol>
  )
}

export { Timeline as PostmortemTimeline }
