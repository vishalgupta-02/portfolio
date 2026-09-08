import type { CaseStudyDataFlow as CaseStudyDataFlowType } from "@/lib/projects/types"

interface CaseStudyDataFlowProps {
  dataFlow?: CaseStudyDataFlowType
  stepNumber?: string
}

export default function CaseStudyDataFlow({
  dataFlow,
  stepNumber = "07",
}: CaseStudyDataFlowProps) {
  if (!dataFlow || !dataFlow.steps || dataFlow.steps.length === 0) {
    return null
  }

  return (
    <section id="data-flow" className="space-y-4 pt-4 border-t border-border/20">
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>DATA FLOW PIPELINES</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {dataFlow.title || "Asynchronous Ingestion Pipeline"}
      </h2>
      {dataFlow.description && (
        <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
          {dataFlow.description}
        </p>
      )}

      <div className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-3 text-xs font-mono">
        {dataFlow.steps.map((step) => (
          <div key={step.step} className="flex items-center gap-3">
            <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
              {step.step}
            </span>
            <div>
              <span className="font-bold text-foreground">{step.title}</span>
              <p className="font-display text-foreground/60 text-[11px]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
