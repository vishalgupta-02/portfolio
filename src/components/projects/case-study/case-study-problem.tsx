import type { CaseStudyProblem as CaseStudyProblemType } from "@/lib/projects/types"

interface CaseStudyProblemProps {
  problem?: CaseStudyProblemType
  stepNumber?: string
}

export default function CaseStudyProblem({
  problem,
  stepNumber = "02",
}: CaseStudyProblemProps) {
  if (!problem) {
    return null
  }

  return (
    <section id="problem" className="space-y-3 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>THE PROBLEM & CONSTRAINTS</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {problem.title || "Core Constraints & Complexities"}
      </h2>
      <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
        {problem.introduction && <p>{problem.introduction}</p>}
        {problem.points && problem.points.length > 0 && (
          <ul className="space-y-2 pt-1">
            {problem.points.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-emerald-500 text-xs">▸</span>
                <span>
                  <strong className="text-foreground font-medium">
                    {pt.title}
                  </strong>{" "}
                  {pt.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
