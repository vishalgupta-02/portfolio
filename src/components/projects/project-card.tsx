"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, BookOpen } from "lucide-react";
import { Github } from "@/components/socials";
import type { Project } from "@/lib/projects/types";

interface ProjectCardProps {
  project: Project;
  priorityImage?: boolean;
}

export default function ProjectCard({
  project,
  priorityImage = false,
}: ProjectCardProps) {
  const projectPageUrl = `/projects/${project.slug}`;
  const caseStudyUrl = project.hasCaseStudy
    ? `/projects/${project.slug}/case-study`
    : undefined;

  return (
    <article className="group relative rounded-xl border border-border/40 bg-card/30 p-4 sm:p-5 transition-all duration-300 hover:border-border/80 hover:bg-card/60 hover:shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground font-semibold">
              {project.number}
            </span>
            <span className="text-muted-foreground/30 text-xs">/</span>
            <Link
              href={projectPageUrl}
              className="group/title inline-flex items-center gap-1 font-sans text-xl font-bold tracking-tight text-foreground hover:underline"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="size-4 opacity-0 transition-all duration-200 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 text-muted-foreground" />
            </Link>
          </div>
          <p className="mt-1 font-display text-xs sm:text-sm text-muted-foreground">
            {project.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start shrink-0">
          {project.hasCaseStudy && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
              <span className="size-1 rounded-full bg-emerald-500" />
              Case Study
            </span>
          )}
          {project.status && (
            <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              {project.status.includes("Progress") ? "In Progress" : project.status}
            </span>
          )}
        </div>
      </div>

      <Link
        href={projectPageUrl}
        prefetch={false}
        aria-label={`View ${project.name} overview`}
        className="block relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted/20 mb-3.5 cursor-pointer group/img"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          priority={priorityImage}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </Link>

      <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4">
        {project.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {caseStudyUrl ? (
            <Link
              href={caseStudyUrl}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors active:scale-[0.98]"
            >
              <BookOpen className="size-3.5" />
              <span>Case Study</span>
            </Link>
          ) : (
            <Link
              href={projectPageUrl}
              prefetch={false}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background hover:bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors active:scale-[0.98]"
            >
              <span>Overview</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.name}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background hover:bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors active:scale-[0.98]"
            >
              <span>Live Demo</span>
              <ExternalLink className="size-3.5 text-muted-foreground" />
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.name}`}
              className="inline-flex items-center justify-center size-8 rounded-lg border border-border/60 bg-background hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors active:scale-[0.98]"
            >
              <Github />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

