"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

interface ProjectCardProps {
  project: Project
  priorityImage?: boolean
}

export default function ProjectCard({
  project,
  priorityImage = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const projectPageUrl = `/projects/${project.slug}`
  const caseStudyUrl = project.hasCaseStudy
    ? `/projects/${project.slug}/case-study`
    : undefined
  const liveOrRepoUrl = project.liveUrl || project.githubUrl
  const primaryCtaUrl =
    project.hasCaseStudy || project.highlights?.length
      ? projectPageUrl
      : liveOrRepoUrl
  const isInternalCta = primaryCtaUrl.startsWith("/")

  return (
    <div className="flex flex-col items-center text-center space-y-5">
      {/* Visual Stage: Floating Project Screenshot */}
      <div className="relative w-full max-w-lg mx-auto my-1 group">
        {/* Ambient glow behind card */}
        <div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-2xl bg-linear-to-r from-foreground/5 via-foreground/10 to-foreground/5 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
        />

        {/* Main Screenshot Wrapper */}
        <div className="relative rounded-xl border border-border/40 bg-background overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/40">
          <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/20">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              priority={priorityImage}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Floating Chip 1 (Top Left) */}
        {project.floatingChips && project.floatingChips[0] && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { y: 0 }}
            animate={shouldReduceMotion ? undefined : { y: [-3, 3, -3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden sm:inline-flex absolute -top-3 -left-2 z-10 items-center gap-1 px-2.5 py-1 rounded-full border border-border/40 bg-background/90 dark:bg-custom-black/90 text-[11px] font-display text-foreground/90 shadow-md backdrop-blur-md"
          >
            <Sparkles className="size-3 text-emerald-500" />
            <span>{project.floatingChips[0].text}</span>
          </motion.div>
        )}

        {/* Floating Chip 2 (Bottom Right) */}
        {project.floatingChips && project.floatingChips[1] && (
          <motion.div
            initial={shouldReduceMotion ? undefined : { y: 0 }}
            animate={shouldReduceMotion ? undefined : { y: [3, -3, 3] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden sm:inline-flex absolute -bottom-3 -right-2 z-10 items-center gap-1 px-2.5 py-1 rounded-full border border-border/40 bg-background/90 dark:bg-custom-black/90 text-[11px] font-display text-foreground/90 shadow-md backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>{project.floatingChips[1].text}</span>
          </motion.div>
        )}
      </div>

      {/* Project Content */}
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="font-display font-medium text-xs sm:text-sm text-foreground/80">
          {project.subtitle}
        </p>
        <p className="font-display text-xs sm:text-sm text-foreground/60 leading-relaxed pt-1">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border/25 bg-background/50 dark:bg-custom-black/50 px-2.5 py-0.5 rounded-full text-[11px] font-display text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <Link
          href={primaryCtaUrl}
          target={isInternalCta ? undefined : "_blank"}
          rel={isInternalCta ? undefined : "noopener noreferrer"}
          className="group/cta inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 hover:shadow-xs active:scale-[0.98]"
        >
          <span>{project.ctaText || "View Project"}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>

        {caseStudyUrl && (
          <Link
            href={caseStudyUrl}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
          >
            <span>Case Study</span>
            <ArrowUpRight className="size-3 text-emerald-500" />
          </Link>
        )}

        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.name}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 bg-background/60 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
          >
            <Github />
            <span className="hidden sm:inline">Source</span>
          </Link>
        )}
      </div>
    </div>
  )
}
