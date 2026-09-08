"use client"

import { useState } from "react"
import { Check, Copy, FileCode2 } from "lucide-react"
import type { CaseStudyChallenge } from "@/lib/projects/types"

interface CaseStudyChallengesProps {
  challenges?: CaseStudyChallenge[]
  stepNumber?: string
}

export default function CaseStudyChallenges({
  challenges,
  stepNumber = "05",
}: CaseStudyChallengesProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  if (!challenges || challenges.length === 0) {
    return null
  }

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  return (
    <section id="challenges" className="space-y-6 pt-4 border-t border-border/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
          <span>{stepNumber}</span>
          <span>//</span>
          <span>CORE ENGINEERING CHALLENGES</span>
        </div>
        <span className="text-xs font-mono text-foreground/50">
          0{challenges.length} Deep Dives
        </span>
      </div>
      <h2 className="text-xl font-sans font-semibold text-foreground">
        Difficult Technical Problems & Solutions
      </h2>

      <div className="space-y-6">
        {challenges.map((ch, idx) => (
          <article
            key={ch.number}
            className="rounded-xl border border-border/30 bg-card/40 dark:bg-custom-black/40 p-5 space-y-4 hover:border-border/60 transition-colors"
          >
            {/* Challenge Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-500 font-semibold">
                  CHALLENGE {ch.number}
                </span>
                <h3 className="text-base sm:text-lg font-sans font-semibold text-foreground">
                  {ch.title}
                </h3>
              </div>
            </div>

            {/* Problem & Risk */}
            <div className="space-y-2 text-xs sm:text-sm font-display text-foreground/75 leading-relaxed">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                  The Challenge & Risk
                </span>
                <p>{ch.problemStatement}</p>
                {ch.risk && (
                  <p className="text-rose-500/90 dark:text-rose-400/90 text-xs mt-1">
                    <strong>Risk:</strong> {ch.risk}
                  </p>
                )}
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                  The Approach
                </span>
                <p>{ch.approach}</p>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                  The Result
                </span>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ {ch.result}
                </p>
              </div>
            </div>

            {/* Code Snippet if present */}
            {ch.codeSnippet && (
              <div className="rounded-lg border border-border/30 bg-background overflow-hidden space-y-1 text-xs">
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted/20 border-b border-border/20 font-mono text-[11px] text-foreground/60">
                  <div className="flex items-center gap-1.5">
                    <FileCode2 className="size-3 text-emerald-500" />
                    <span>{ch.codeSnippet.filename}</span>
                  </div>
                  <button
                    onClick={() =>
                      ch.codeSnippet && handleCopy(ch.codeSnippet.code, idx)
                    }
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Copy code snippet"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span className="text-[10px] text-emerald-500">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 overflow-x-auto text-[11px] font-mono leading-relaxed text-foreground/90 bg-muted/10">
                  <code>{ch.codeSnippet.code}</code>
                </pre>
                <p className="px-3 pb-2 text-[11px] font-display text-foreground/50 italic">
                  {ch.codeSnippet.explanation}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
