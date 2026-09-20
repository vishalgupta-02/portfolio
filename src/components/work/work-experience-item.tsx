"use client"

import {
  Git,
  Github,
  JavaScript,
  NextJS,
  NodeJS,
  Python,
  TypeScript,
} from "@/components/ui/svgs-of-techs"
import type { WorkExperience } from "@/lib/experience"
import { Calendar, CheckCircle2, MapPin, Sparkles } from "lucide-react"
import type React from "react"

const TECH_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  JavaScript,
  TypeScript,
  Python,
  NextJS,
  NodeJS,
  Git,
  Github,
}

interface WorkExperienceItemProps {
  experience: WorkExperience
  index: number
}

export default function WorkExperienceItem({
  experience,
}: WorkExperienceItemProps) {
  const isFullTime = experience.type === "Full-time"

  return (
    <article className='group relative rounded-2xl border border-border/40 bg-card/30 p-5 sm:p-6 transition-all duration-300 hover:border-border/80 hover:bg-card/60 hover:shadow-md'>
      {/* Top Header Row */}
      <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
        <div>
          <div className='flex flex-wrap items-center gap-2'>
            <h2 className='font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground sm:text-xl'>
              {experience.company}
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-mono font-medium border ${
                isFullTime
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
              }`}
            >
              {experience.type}
            </span>
          </div>

          <p className='font-display text-sm font-semibold text-foreground/85 mt-1'>
            {experience.role}
          </p>
        </div>

        {/* Date & Location Badges */}
        <div className='flex flex-col items-start gap-1.5 sm:items-end font-mono text-xs text-muted-foreground'>
          <span className='inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/40 px-2.5 py-0.5'>
            <Calendar className='size-3 text-muted-foreground/80' aria-hidden='true' />
            {experience.period}
          </span>
          <span className='inline-flex items-center gap-1.5 text-[11px] font-display text-muted-foreground'>
            <MapPin className='size-3 text-muted-foreground/70' aria-hidden='true' />
            {experience.location} ({experience.locationType})
          </span>
        </div>
      </div>

      {/* Role Summary */}
      <p className='mt-3.5 font-display text-xs sm:text-sm leading-relaxed text-muted-foreground'>
        {experience.summary}
      </p>

      {/* Impact Metric Pills */}
      {experience.impactMetrics.length > 0 && (
        <div className='mt-4 flex flex-wrap items-center gap-1.5'>
          {experience.impactMetrics.map((metric) => (
            <span
              key={metric}
              className='inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[11px] font-medium text-foreground/80'
            >
              <Sparkles className='size-2.5 text-amber-500 shrink-0' aria-hidden='true' />
              {metric}
            </span>
          ))}
        </div>
      )}

      {/* Subtle Divider */}
      <div className='my-4 h-px w-full bg-border/40' />

      {/* Key Engineering Impact */}
      <div className='space-y-2'>
        <h3 className='font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
          Engineering Contributions & Achievements
        </h3>
        <ul className='space-y-2 text-xs sm:text-sm font-display text-muted-foreground/90'>
          {experience.highlights.map((highlight, i) => (
            <li key={i} className='flex items-start gap-2.5 leading-relaxed'>
              <CheckCircle2
                className='size-4 text-emerald-500/80 shrink-0 mt-0.5'
                aria-hidden='true'
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies & Tools */}
      <div className='mt-5 pt-4 border-t border-border/30'>
        <h3 className='font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5'>
          Technologies & Tools
        </h3>
        <div className='flex flex-wrap gap-1.5'>
          {experience.technologies.map((tech) => {
            const Icon = tech.iconKey ? TECH_ICON_MAP[tech.iconKey] : null
            return (
              <span
                key={tech.name}
                className='inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground hover:border-foreground/30 hover:bg-muted/60 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 transition-all duration-150 cursor-default select-none'
              >
                {Icon ? (
                  <Icon className='size-3.5 shrink-0' />
                ) : (
                  <span className='size-1.5 rounded-full bg-primary/40 shrink-0' />
                )}
                <span>{tech.name}</span>
              </span>
            )
          })}
        </div>
      </div>
    </article>
  )
}
