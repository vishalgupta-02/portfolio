import React from "react"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
  ShieldAlert,
  Zap,
} from "lucide-react"

export type PostmortemCalloutType =
  | "info"
  | "warning"
  | "root-cause"
  | "resolution"
  | "preventive"
  | "security"

interface PostmortemCalloutProps {
  type?: PostmortemCalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const calloutStyles: Record<
  PostmortemCalloutType,
  {
    container: string
    icon: React.ReactNode
    defaultTitle: string
    titleColor: string
  }
> = {
  info: {
    container: "border-border bg-muted/30 text-foreground",
    icon: <Info className="size-4 shrink-0 text-foreground" />,
    defaultTitle: "Technical Note",
    titleColor: "text-foreground",
  },
  warning: {
    container:
      "border-amber-500/30 bg-amber-500/5 text-foreground dark:bg-amber-500/10",
    icon: (
      <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
    ),
    defaultTitle: "Contributing Factor",
    titleColor: "text-amber-700 dark:text-amber-300",
  },
  "root-cause": {
    container:
      "border-rose-500/30 bg-rose-500/5 text-foreground dark:bg-rose-500/10",
    icon: <Zap className="size-4 shrink-0 text-rose-500" />,
    defaultTitle: "Root Cause Mechanism",
    titleColor: "text-rose-700 dark:text-rose-400",
  },
  resolution: {
    container:
      "border-emerald-500/30 bg-emerald-500/5 text-foreground dark:bg-emerald-500/10",
    icon: (
      <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
    ),
    defaultTitle: "Mitigation & Fix",
    titleColor: "text-emerald-700 dark:text-emerald-300",
  },
  preventive: {
    container:
      "border-blue-500/30 bg-blue-500/5 text-foreground dark:bg-blue-500/10",
    icon: (
      <ShieldAlert className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
    ),
    defaultTitle: "Preventive Control",
    titleColor: "text-blue-700 dark:text-blue-300",
  },
  security: {
    container:
      "border-purple-500/30 bg-purple-500/5 text-foreground dark:bg-purple-500/10",
    icon: (
      <HelpCircle className="size-4 shrink-0 text-purple-600 dark:text-purple-400" />
    ),
    defaultTitle: "Security Implication",
    titleColor: "text-purple-700 dark:text-purple-300",
  },
}

export function PostmortemCallout({
  type = "info",
  title,
  children,
  className,
}: PostmortemCalloutProps) {
  const config = calloutStyles[type] ?? calloutStyles.info

  return (
    <aside
      aria-label={title || config.defaultTitle}
      className={cn(
        "my-6 rounded-xl border p-4 sm:p-5 text-sm leading-relaxed backdrop-blur-xs",
        config.container,
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider">
        {config.icon}
        <span className={config.titleColor}>{title || config.defaultTitle}</span>
      </div>
      <div className="text-xs sm:text-sm text-foreground/90 space-y-2 prose-p:my-1">
        {children}
      </div>
    </aside>
  )
}
