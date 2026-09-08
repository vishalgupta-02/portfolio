import { Boxes, Database, Zap } from "lucide-react"
import type { CaseStudyArchitecture as CaseStudyArchitectureType } from "@/lib/projects/types"

const dotColorMap = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  rose: "bg-rose-500",
}

const iconColorMap = {
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
}

interface CaseStudyArchitectureProps {
  architecture?: CaseStudyArchitectureType
  stepNumber?: string
}

export default function CaseStudyArchitecture({
  architecture,
  stepNumber = "04",
}: CaseStudyArchitectureProps) {
  if (!architecture) {
    return null
  }

  return (
    <section
      id="architecture"
      className="space-y-4 pt-4 border-t border-border/20"
    >
      <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
        <span>{stepNumber}</span>
        <span>//</span>
        <span>SYSTEM ARCHITECTURE</span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        {architecture.title || "Monorepo & Multi-Tier Topology"}
      </h2>
      {architecture.description && (
        <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
          {architecture.description}
        </p>
      )}

      {/* Architecture Diagram Box */}
      <div className="rounded-xl border border-border/40 bg-card/50 p-5 space-y-4 shadow-sm">
        {(architecture.badge || architecture.subBadge) && (
          <div className="flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-2">
            <span className="flex items-center gap-1.5">
              <Boxes className="size-3.5 text-emerald-500" />
              <span>{architecture.badge}</span>
            </span>
            <span>{architecture.subBadge}</span>
          </div>
        )}

        {/* Architecture Node Flow */}
        <div className="space-y-3 font-mono text-xs">
          {architecture.layers?.map((layer, index) => (
            <div key={layer.title}>
              <div className="rounded-lg border border-border/30 bg-background/80 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      layer.dotColor
                        ? dotColorMap[layer.dotColor]
                        : "bg-emerald-500"
                    }`}
                  />
                  <span className="font-bold text-foreground">{layer.title}</span>
                  {layer.tech && (
                    <span className="text-foreground/50 text-[11px]">
                      {layer.tech}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-foreground/60 font-display">
                  {layer.description}
                </span>
              </div>

              {index < architecture.layers.length - 1 && (
                <div className="flex justify-center text-foreground/40 text-[11px] py-1">
                  ↓ HTTP / REST / Secure Cookies
                </div>
              )}
            </div>
          ))}

          {architecture.bottomGrid && architecture.bottomGrid.length > 0 && (
            <>
              <div className="flex justify-center text-foreground/40 text-[11px]">
                ↓ Data Persistence & Message Queue
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {architecture.bottomGrid.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border/30 bg-background/80 p-3 space-y-1"
                  >
                    <div className="flex items-center gap-1.5">
                      {item.iconType === "zap" ? (
                        <Zap
                          className={`size-3 ${
                            item.iconColor
                              ? iconColorMap[item.iconColor]
                              : "text-amber-500"
                          }`}
                        />
                      ) : (
                        <Database
                          className={`size-3 ${
                            item.iconColor
                              ? iconColorMap[item.iconColor]
                              : "text-emerald-500"
                          }`}
                        />
                      )}
                      <span className="font-bold text-foreground">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground/60 font-display">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
