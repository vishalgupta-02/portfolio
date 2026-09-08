import type { CaseStudyResult } from "@/lib/projects/types"

interface CaseStudyResultsProps {
  results?: {
    title?: string
    items: CaseStudyResult[]
  }
  stepNumber?: string
}

export default function CaseStudyResults({
  results,
  stepNumber = "09",
}: CaseStudyResultsProps) {
  if (!results || !results.items || results.items.length === 0) {
    return null
  }

  return (
    <section id="results" className="space-y-3 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>RESULTS & OUTCOMES</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {results.title || "Verified Outcomes"}
      </h2>
      <div className="space-y-2.5 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
        {results.items.map((res, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-border/25 bg-card/30 space-y-1"
          >
            <span className="font-mono text-xs font-semibold text-emerald-500">
              ✓ {res.title}
            </span>
            <p>{res.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
