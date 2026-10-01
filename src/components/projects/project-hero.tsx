"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, FileText, Globe } from "lucide-react";
import { Github } from "@/components/socials";
import { ShareButtons } from "@/components/ui/share-buttons";
import type { Project } from "@/lib/projects/types";
import { trackEvent } from "@/lib/analytics/tracker";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const liveOrRepoUrl = project.liveUrl || project.githubUrl;
  const isGithubOnly =
    !project.liveUrl || project.liveUrl === project.githubUrl;
  const liveButtonLabel = isGithubOnly ? "View Repo" : "View Live";
  const badgeText = project.badge || project.status;

  return (
    <div className="space-y-12">
      <nav
        aria-label="Breadcrumb Navigation"
        className="text-foreground/60 border-border/20 flex items-center justify-between border-b pb-4 font-mono text-xs"
      >
        <Link
          href="/#projects"
          className="hover:text-foreground group inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </Link>

        {project.id === "infinity" ? (
          <Link
            href="/#contact"
            className="border-border/40 bg-background/80 hover:bg-muted/60 text-foreground/80 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition-colors"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Give Feedback &rarr;</span>
          </Link>
        ) : badgeText ? (
          <div className="border-border/30 bg-background/80 text-foreground/80 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]">
            <span className="bg-muted-foreground/60 size-1.5 rounded-full" />
            <span>{badgeText}</span>
          </div>
        ) : null}
      </nav>

      <header className="space-y-5 text-center">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="space-y-2"
        >
          <h1 className="text-foreground font-sans text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="font-display text-foreground/80 text-sm font-medium sm:text-base">
            {project.subtitle}
          </p>
        </motion.div>

        {project.longDescription && project.longDescription.length > 0 ? (
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-display text-foreground/70 mx-auto max-w-lg text-xs leading-relaxed sm:text-sm"
          >
            {project.longDescription[0]}
          </motion.p>
        ) : (
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-display text-foreground/70 mx-auto max-w-lg text-xs leading-relaxed sm:text-sm"
          >
            {project.description}
          </motion.p>
        )}

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {project.id === "infinity" && (
            <Link
              href="/#contact"
              className="border-border/30 bg-background/80 hover:bg-muted/40 text-foreground inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] sm:text-sm"
            >
              <span>Give Feedback</span>
              <ArrowUpRight className="text-foreground/60 size-3.5" />
            </Link>
          )}
          {liveOrRepoUrl && (
            <Link
              href={liveOrRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (isGithubOnly) {
                  trackEvent("github_click", {
                    project: project.name,
                    url: liveOrRepoUrl,
                  });
                } else {
                  trackEvent("live_demo_click", {
                    project: project.name,
                    url: liveOrRepoUrl,
                  });
                }
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium shadow-xs transition-all duration-200 active:scale-[0.98] sm:text-sm"
            >
              {isGithubOnly ? <Github /> : <Globe className="size-4" />}
              <span>{liveButtonLabel}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          )}

          {!isGithubOnly && project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("github_click", {
                  project: project.name,
                  url: project.githubUrl,
                });
              }}
              aria-label={`View source code for ${project.name}`}
              className="border-border/30 bg-background/80 hover:bg-muted/40 text-foreground inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] sm:text-sm"
            >
              <Github />
              <span>Source</span>
            </Link>
          )}

          {project.hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}/case-study`}
              className="border-border/30 bg-background/80 hover:bg-muted/40 text-foreground inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200 active:scale-[0.98] sm:text-sm"
            >
              <FileText className="size-4 text-emerald-500" />
              <span>Read Case Study</span>
              <ArrowUpRight className="text-foreground/60 size-3.5" />
            </Link>
          )}

          <div className="border-border/30 bg-background/80 inline-flex items-center rounded-lg border px-2 py-1">
            <ShareButtons
              url={`/projects/${project.slug}`}
              title={`${project.name} — ${project.subtitle || project.description}`}
              description={project.description}
              tags={project.tags || []}
              variant="compact"
            />
          </div>
        </motion.div>
      </header>

      <motion.section
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label={`${project.name} Product Screenshot`}
        className="group relative"
      >
        <div
          aria-hidden="true"
          className="from-foreground/5 via-foreground/10 to-foreground/5 absolute -inset-1.5 rounded-2xl bg-linear-to-r opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
        />
        <div className="border-border/40 bg-card relative overflow-hidden rounded-xl border shadow-xl shadow-black/5 dark:shadow-black/40">
          <div className="bg-muted/20 relative aspect-16/10 w-full overflow-hidden">
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
  );
}
