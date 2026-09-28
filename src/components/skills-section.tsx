"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Claude,
  Docker,
  Gemini,
  Git,
  Github,
  JavaScript,
  MongoDB,
  Motion,
  NextJS,
  NodeJS,
  PostgreSQL,
  Python,
  React,
  ShadCN,
  TailwindCSS,
  TypeScript,
  Vercel,
} from "./ui/svgs-of-techs";
import { TECH_EVIDENCE_MAP, type TechnologyEvidence } from "@/lib/content-index";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

interface CategoryGroup {
  name: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: CategoryGroup[] = [
  {
    name: "Languages & Runtimes",
    skills: [
      { name: "TypeScript", icon: TypeScript },
      { name: "JavaScript", icon: JavaScript },
      { name: "Python", icon: Python },
      { name: "Node.js", icon: NodeJS },
      { name: "SQL", icon: null },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "PostgreSQL", icon: PostgreSQL },
      { name: "Redis", icon: null },
      { name: "MongoDB", icon: MongoDB },
      { name: "Docker", icon: Docker },
      { name: "Google GenAI", icon: Gemini },
    ],
  },
  {
    name: "Frontend & UI",
    skills: [
      { name: "Next.js", icon: NextJS },
      { name: "React", icon: React },
      { name: "TailwindCSS", icon: TailwindCSS },
      { name: "Motion", icon: Motion },
      { name: "ShadCN", icon: ShadCN },
    ],
  },
  {
    name: "Infrastructure & Tooling",
    skills: [
      { name: "Git", icon: Git },
      { name: "GitHub", icon: Github },
      { name: "Vercel", icon: Vercel },
      { name: "Docker", icon: Docker },
      { name: "Claude AI", icon: Claude },
    ],
  },
];

export default function SkillsSection() {
  const [selectedTech, setSelectedTech] = useState<string>("PostgreSQL");

  const evidence: TechnologyEvidence | undefined = TECH_EVIDENCE_MAP[selectedTech];

  return (
    <section
      id="tech-stack"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8 scroll-mt-16"
      aria-label="Technical Stack & Evidence Explorer"
    >
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground font-sans text-xl font-semibold tracking-tight">
            Evidence-Based Technical Stack
          </h2>
          <p className="text-muted-foreground font-display mt-0.5 text-xs">
            No subjective skill percentages. Click any technology to inspect its verified production evidence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border border-border/40 bg-card/30 p-3.5 transition-all duration-200"
          >
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                const hasEvidence = Boolean(TECH_EVIDENCE_MAP[skill.name]);
                const isSelected = selectedTech === skill.name;

                return (
                  <button
                    type="button"
                    key={skill.name}
                    onClick={() => hasEvidence && setSelectedTech(skill.name)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                      isSelected
                        ? "border border-border/80 bg-foreground/10 text-foreground font-semibold shadow-xs"
                        : hasEvidence
                        ? "border border-border/40 bg-muted/20 text-foreground/80 hover:bg-muted/50 hover:border-border/70"
                        : "border border-border/30 bg-muted/10 text-muted-foreground cursor-default"
                    }`}
                  >
                    {Icon && <Icon className="size-3.5 shrink-0" />}
                    <span>{skill.name}</span>
                    {hasEvidence && (
                      <span className="size-1 rounded-full bg-emerald-500/80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Technology Production Evidence Panel */}
      {evidence && (
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-all duration-200 animate-in fade-in-50">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                Production Evidence: {evidence.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">({evidence.category})</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Verified in Codebase
            </span>
          </div>

          <p className="font-display text-xs text-foreground/80 leading-relaxed mb-3">
            {evidence.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Real Projects */}
            <div className="space-y-1.5 rounded-lg border border-border/40 bg-background/50 p-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Deployed in Systems:
              </p>
              <ul className="space-y-1.5">
                {evidence.projects.map((proj) => (
                  <li key={proj.name} className="flex flex-col">
                    <Link
                      href={proj.url}
                      className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
                    >
                      <span>{proj.name}</span>
                      <ArrowUpRight className="size-3 text-muted-foreground" />
                    </Link>
                    <span className="text-[11px] text-muted-foreground font-display">
                      {proj.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Postmortems & Articles */}
            <div className="space-y-1.5 rounded-lg border border-border/40 bg-background/50 p-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Related Write-Ups & Postmortems:
              </p>
              {evidence.postmortems.length > 0 || evidence.articles.length > 0 ? (
                <ul className="space-y-1.5">
                  {evidence.postmortems.map((pm) => (
                    <li key={pm.title}>
                      <Link
                        href={pm.url}
                        className="font-medium text-foreground hover:underline inline-flex items-center gap-1 leading-snug"
                      >
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">[Incident]</span>
                        <span className="text-[11px]">{pm.title}</span>
                        <ArrowUpRight className="size-3 text-muted-foreground shrink-0" />
                      </Link>
                    </li>
                  ))}
                  {evidence.articles.map((art) => (
                    <li key={art.title}>
                      <Link
                        href={art.url}
                        className="font-medium text-foreground hover:underline inline-flex items-center gap-1 leading-snug"
                      >
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">[Article]</span>
                        <span className="text-[11px]">{art.title}</span>
                        <ArrowUpRight className="size-3 text-muted-foreground shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-muted-foreground font-display italic">
                  Integrated as core container &amp; deployment infrastructure across backend services.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
