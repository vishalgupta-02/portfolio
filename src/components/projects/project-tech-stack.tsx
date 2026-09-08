import type { TechnologyCategory } from "@/lib/projects/types"

interface ProjectTechStackProps {
  techStack?: TechnologyCategory[]
  title?: string
}

export default function ProjectTechStack({
  techStack,
  title = "Technology Stack",
}: ProjectTechStackProps) {
  if (!techStack || techStack.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 pt-2">
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {title}
      </h2>
      <div className="space-y-4">
        {techStack.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2.5"
          >
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/25 bg-background/80 text-xs font-display text-foreground"
                >
                  <span className="font-medium">{tech.name}</span>
                  {tech.description && (
                    <span className="text-[10px] text-foreground/50 border-l border-border/25 pl-1.5">
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
