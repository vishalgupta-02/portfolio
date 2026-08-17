"use client"

import { useState } from "react"
import Link from "next/link"
import { useReducedMotion } from "motion/react"
import {
  ArrowLeft,
  ArrowUpRight,
  Zap,
  Terminal,
  Database,
  Server,
  Shield,
  Boxes,
  FileCode2,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react"
import MainLayout from "@/components/main-layout"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

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

interface CaseStudyViewProps {
  project: Project
}

export default function CaseStudyView({ project }: CaseStudyViewProps) {
  const shouldReduceMotion = useReducedMotion()
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  const caseStudy = project.caseStudy
  if (!caseStudy) {
    return null
  }

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  const sections = caseStudy.sections || []
  const role = caseStudy.role || project.role
  const status = caseStudy.status || project.status
  const timeline = caseStudy.timeline || project.timeline
  const architectureLabel = caseStudy.architectureLabel || "Monorepo"
  const techStack = caseStudy.techStack || project.techStack || []

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        {/* Top Header Navigation */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-foreground/60 border-b border-border/20 pb-4"
        >
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Project Overview</span>
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/#projects"
              className="hover:text-foreground transition-colors hidden sm:inline"
            >
              Portfolio
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github />
              <span>Repository</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-card/60 text-[11px] font-mono uppercase tracking-wider text-foreground/80">
            <Terminal className="size-3 text-emerald-500" />
            <span>Engineering Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
            {caseStudy.title}
          </h1>

          <p className="font-display font-medium text-sm sm:text-base text-foreground/80 leading-relaxed">
            {caseStudy.description}
          </p>

          {/* Metadata Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/20 text-xs font-display">
            {role && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-foreground/50 uppercase">
                  Role
                </span>
                <p className="font-medium text-foreground">{role}</p>
              </div>
            )}
            {status && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-foreground/50 uppercase">
                  Status
                </span>
                <p className="font-medium text-foreground flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {status}
                </p>
              </div>
            )}
            {timeline && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-foreground/50 uppercase">
                  Timeline
                </span>
                <p className="font-medium text-foreground">{timeline}</p>
              </div>
            )}
            {architectureLabel && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-foreground/50 uppercase">
                  Architecture
                </span>
                <p className="font-medium text-foreground">{architectureLabel}</p>
              </div>
            )}
          </div>
        </header>

        {/* Sticky/Sub-header Section Index */}
        {sections.length > 0 && (
          <section
            aria-label="Table of Contents"
            className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-foreground/60">
              <span>Table of Contents</span>
              <span>{sections.length < 10 ? `0${sections.length}` : sections.length} Sections</span>
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
        )}

        {/* 01 — Overview */}
        {caseStudy.overview && (
          <section id="overview" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>01</span>
              <span>//</span>
              <span>OVERVIEW</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.overview.title || "Building the Primitives First"}
            </h2>
            <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
              {caseStudy.overview.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* 02 — The Problem */}
        {caseStudy.problem && (
          <section id="problem" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>02</span>
              <span>//</span>
              <span>THE PROBLEM & CONSTRAINTS</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.problem.title || "Core Constraints & Complexities"}
            </h2>
            <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
              {caseStudy.problem.introduction && <p>{caseStudy.problem.introduction}</p>}
              <ul className="space-y-2 pt-1">
                {caseStudy.problem.points.map((pt, idx) => (
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
            </div>
          </section>
        )}

        {/* 03 — Engineering Goals */}
        {caseStudy.goals && (
          <section id="goals" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>03</span>
              <span>//</span>
              <span>ENGINEERING GOALS</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.goals.title || "Design Requirements"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {caseStudy.goals.items.map((goal, idx) => (
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
        )}

        {/* 04 — System Architecture */}
        {caseStudy.architecture && (
          <section id="architecture" className="space-y-4 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>04</span>
              <span>//</span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.architecture.title || "Monorepo & Multi-Tier Topology"}
            </h2>
            {caseStudy.architecture.description && (
              <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {caseStudy.architecture.description}
              </p>
            )}

            {/* Architecture Diagram Box */}
            <div className="rounded-xl border border-border/40 bg-card/50 p-5 space-y-4 shadow-sm">
              {(caseStudy.architecture.badge || caseStudy.architecture.subBadge) && (
                <div className="flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Boxes className="size-3.5 text-emerald-500" />
                    <span>{caseStudy.architecture.badge}</span>
                  </span>
                  <span>{caseStudy.architecture.subBadge}</span>
                </div>
              )}

              {/* Architecture Node Flow */}
              <div className="space-y-3 font-mono text-xs">
                {caseStudy.architecture.layers.map((layer, index) => (
                  <div key={layer.title}>
                    <div className="rounded-lg border border-border/30 bg-background/80 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${
                            layer.dotColor ? dotColorMap[layer.dotColor] : "bg-emerald-500"
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

                    {index < caseStudy.architecture!.layers.length - 1 && (
                      <div className="flex justify-center text-foreground/40 text-[11px] py-1">
                        ↓ HTTP / REST / Secure Cookies
                      </div>
                    )}
                  </div>
                ))}

                {caseStudy.architecture.bottomGrid && (
                  <>
                    <div className="flex justify-center text-foreground/40 text-[11px]">
                      ↓ Data Persistence & Message Queue
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {caseStudy.architecture.bottomGrid.map((item) => (
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
        )}

        {/* 05 — Core Engineering Challenges */}
        {caseStudy.challenges && caseStudy.challenges.length > 0 && (
          <section id="challenges" className="space-y-6 pt-4 border-t border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
                <span>05</span>
                <span>//</span>
                <span>CORE ENGINEERING CHALLENGES</span>
              </div>
              <span className="text-xs font-mono text-foreground/50">
                0{caseStudy.challenges.length} Deep Dives
              </span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              Difficult Technical Problems & Solutions
            </h2>

            <div className="space-y-6">
              {caseStudy.challenges.map((ch, idx) => (
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
                            ch.codeSnippet &&
                            handleCopy(ch.codeSnippet.code, idx)
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
        )}

        {/* 06 — Implementation Details */}
        {caseStudy.implementation && (
          <section id="implementation" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>06</span>
              <span>//</span>
              <span>CODE PRIMITIVES & SECURITY</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.implementation.title || "Security & Authentication Primitives"}
            </h2>
            <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
              {caseStudy.implementation.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>
        )}

        {/* 07 — Data Flow Pipelines */}
        {caseStudy.dataFlow && (
          <section id="data-flow" className="space-y-4 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>07</span>
              <span>//</span>
              <span>DATA FLOW PIPELINES</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.dataFlow.title || "Asynchronous Ingestion Pipeline"}
            </h2>
            {caseStudy.dataFlow.description && (
              <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {caseStudy.dataFlow.description}
              </p>
            )}

            <div className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-3 text-xs font-mono">
              {caseStudy.dataFlow.steps.map((step) => (
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
        )}

        {/* 08 — Technology Stack */}
        {techStack.length > 0 && (
          <section id="tech-stack" className="space-y-4 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>08</span>
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
        )}

        {/* 09 — Results */}
        {caseStudy.results && (
          <section id="results" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>09</span>
              <span>//</span>
              <span>RESULTS & OUTCOMES</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.results.title || "Verified Outcomes"}
            </h2>
            <div className="space-y-2.5 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
              {caseStudy.results.items.map((res, idx) => (
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
        )}

        {/* 10 — Lessons Learned */}
        {caseStudy.lessonsLearned && (
          <section id="lessons" className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>10</span>
              <span>//</span>
              <span>LESSONS LEARNED</span>
            </div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {caseStudy.lessonsLearned.title || "Engineering Reflections"}
            </h2>
            <div className="space-y-3 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
              {caseStudy.lessonsLearned.items.map((lesson) => (
                <p key={lesson.number}>
                  <strong className="text-foreground font-medium">
                    {lesson.number}. {lesson.title}:
                  </strong>{" "}
                  {lesson.description}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Navigation & Actions */}
        <footer className="pt-6 border-t border-border/20 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to {project.name} Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-all"
            >
              <Github />
              <span>Source Code</span>
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/30 bg-background hover:bg-muted/40 text-xs font-medium text-foreground transition-all"
            >
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </footer>
      </div>
    </MainLayout>
  )
}
