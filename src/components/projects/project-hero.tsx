"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const shouldReduceMotion = useReducedMotion()

  const liveOrRepoUrl = project.liveUrl || project.githubUrl
  const isGithubOnly = !project.liveUrl || project.liveUrl === project.githubUrl
  const liveButtonLabel = isGithubOnly ? "View Live / Repo" : "View Live"

  return (
    <div className="space-y-12">
      {/* Top Header Navigation */}
      <nav
        aria-label="Breadcrumb Navigation"
        className="flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-4"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </Link>

        {project.status && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border/30 bg-background/80 text-[11px] font-mono text-foreground/80">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{project.status}</span>
          </div>
        )}
      </nav>

      {/* Header Info */}
      <header className="space-y-5 text-center">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="space-y-2"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
            {project.name}
          </h1>
          <p className="font-display font-medium text-sm sm:text-base text-foreground/80">
            {project.subtitle}
          </p>
        </motion.div>

        {project.longDescription && project.longDescription.length > 0 ? (
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-display text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed"
          >
            {project.longDescription[0]}
          </motion.p>
        ) : (
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-display text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed"
          >
            {project.description}
          </motion.p>
        )}

        {/* Primary Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {liveOrRepoUrl && (
            <Link
              href={liveOrRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-xs"
            >
              <Github />
              <span>{liveButtonLabel}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          )}

          {project.hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}/case-study`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
            >
              <FileText className="size-4 text-emerald-500" />
              <span>Read Case Study</span>
              <ArrowUpRight className="size-3.5 text-foreground/60" />
            </Link>
          )}
        </motion.div>
      </header>

      {/* Hero Visual: Main Product Screenshot */}
      <motion.section
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label={`${project.name} Product Screenshot`}
        className="relative group"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-2xl bg-linear-to-r from-foreground/5 via-foreground/10 to-foreground/5 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
        />
        <div className="relative rounded-xl border border-border/40 bg-card overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/40">
          <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/20">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              priority
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>
      </motion.section>
    </div>
  )
}
