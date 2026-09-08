import type { CaseStudyOverview as CaseStudyOverviewType } from "@/lib/projects/types"

interface CaseStudyOverviewProps {
  overview?: CaseStudyOverviewType
  stepNumber?: string
}

export default function CaseStudyOverview({
  overview,
  stepNumber = "01",
}: CaseStudyOverviewProps) {
  if (!overview || !overview.paragraphs || overview.paragraphs.length === 0) {
    return null
  }

  return (
    <section id="overview" className="space-y-3 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>OVERVIEW</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {overview.title || "Building the Primitives First"}
      </h2>
      <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
        {overview.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </section>
  )
}
