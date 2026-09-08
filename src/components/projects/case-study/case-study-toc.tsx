import type { CaseStudySectionItem } from "@/lib/projects/types"

interface CaseStudyTOCProps {
  sections?: CaseStudySectionItem[]
}

export default function CaseStudyTOC({ sections }: CaseStudyTOCProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <section
      aria-label="Table of Contents"
      className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
    >
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-foreground/60">
        <span>Table of Contents</span>
        <span>
          {sections.length < 10 ? `0${sections.length}` : sections.length} Sections
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pt-1">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="text-xs font-display text-foreground/70 hover:text-foreground hover:underline transition-colors flex items-center gap-1.5 py-0.5"
          >
            <span className="font-mono text-[10px] text-foreground/40">
              {sec.label}
            </span>
            <span className="truncate">{sec.title}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
