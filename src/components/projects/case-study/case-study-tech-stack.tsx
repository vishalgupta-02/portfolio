import type { TechnologyCategory } from "@/lib/projects/types"

interface CaseStudyTechStackProps {
  techStack?: TechnologyCategory[]
  stepNumber?: string
}

export default function CaseStudyTechStack({
  techStack,
  stepNumber = "08",
}: CaseStudyTechStackProps) {
  if (!techStack || techStack.length === 0) {
    return null
  }

  return (
    <section id="tech-stack" className="space-y-4 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>TECHNOLOGY STACK</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        Architecture Stack
      </h2>

      <div className="space-y-3">
        {techStack.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
          >
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
              {group.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.items.map((tech) => (
                <div
                  key={tech.name}
                  className="p-2 rounded-lg border border-border/20 bg-background/60 text-xs"
                >
                  <span className="font-medium text-foreground block">
                    {tech.name}
                  </span>
                  {tech.description && (
                    <span className="text-[11px] font-display text-foreground/60">
                      {tech.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
