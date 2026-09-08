import { CheckCircle2 } from "lucide-react"
import type { CaseStudyGoal } from "@/lib/projects/types"

interface CaseStudyGoalsProps {
  goals?: {
    title?: string
    items: CaseStudyGoal[]
  }
  stepNumber?: string
}

export default function CaseStudyGoals({
  goals,
  stepNumber = "03",
}: CaseStudyGoalsProps) {
  if (!goals || !goals.items || goals.items.length === 0) {
    return null
  }

  return (
    <section id="goals" className="space-y-3 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>ENGINEERING GOALS</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {goals.title || "Design Requirements"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {goals.items.map((goal, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border/25 bg-card/30 p-3 space-y-1"
          >
            <div className="flex items-center gap-1.5 text-xs font-mono text-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              <span>{goal.title}</span>
            </div>
            <p className="font-display text-xs text-foreground/60">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
