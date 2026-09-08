import {
  Shield,
  Zap,
  Cpu,
  Lock,
  Sparkles,
  Layers,
  FileText,
  Server,
  Database,
  type LucideIcon,
} from "lucide-react"
import { Github } from "@/components/socials"
import type { EngineeringHighlight, IconType } from "@/lib/projects/types"

const iconMap: Record<
  IconType | string,
  LucideIcon | React.ComponentType<{ className?: string }>
> = {
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  lock: Lock,
  database: Database,
  layers: Layers,
  server: Server,
  sparkles: Sparkles,
  fileText: FileText,
  git: Github,
}

interface ProjectHighlightsProps {
  highlights?: EngineeringHighlight[]
  title?: string
}

export default function ProjectHighlights({
  highlights,
  title = "Engineering Highlights",
}: ProjectHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-sans font-semibold text-foreground">
          {title}
        </h2>
        <span className="text-xs font-mono text-foreground/50">
          0{highlights.length} Core Pillars
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highlights.map((feature) => {
          const IconComponent = iconMap[feature.iconType] || Layers
          return (
            <div
              key={feature.title}
              className="rounded-xl border border-border/30 bg-card/40 dark:bg-custom-black/40 p-4 space-y-2 hover:border-border/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md border border-border/30 bg-background/80 text-foreground">
                  <IconComponent className="size-4 text-emerald-500" />
                </div>
                <h3 className="text-sm font-sans font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              {feature.subtitle && (
                <p className="font-display text-[11px] font-medium text-foreground/60 italic">
                  {feature.subtitle}
                </p>
              )}
              <p className="font-display text-xs text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
