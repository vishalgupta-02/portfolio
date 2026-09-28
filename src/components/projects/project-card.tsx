"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Globe, ChevronDown, Cpu, Layers } from "lucide-react";
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
  const [showArchitecture, setShowArchitecture] = useState(false);
  const projectPageUrl = `/projects/${project.slug}`;
  const caseStudyUrl = project.hasCaseStudy
    ? `/projects/${project.slug}/case-study`
    : undefined;

  const badgeText =
    project.badge ||
    (project.status?.includes("Progress") ? "In Progress" : project.status);

  return (
    <article className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 relative rounded-xl border p-4 transition-all duration-300 hover:shadow-xs sm:p-5">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-xs font-semibold">
              {project.number}
            </span>
            <span className="text-muted-foreground/30 text-xs">/</span>
            <Link
              href={projectPageUrl}
              className="group/title text-foreground inline-flex items-center gap-1 font-sans text-xl font-bold tracking-tight hover:underline"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="text-muted-foreground size-4 opacity-0 transition-all duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:opacity-100" />
            </Link>
          </div>
          <p className="font-display text-muted-foreground mt-1 text-xs sm:text-sm">
            {project.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-start">
          {caseStudyUrl && (
            <Link
              href={caseStudyUrl}
              className="border-border/50 bg-background/80 hover:bg-muted/50 text-foreground inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all active:scale-[0.98]"
            >
              <BookOpen className="text-muted-foreground size-3" />
              <span>Case Study</span>
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.name}`}
              className="border-border/50 bg-background/80 hover:bg-muted/50 text-foreground inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all active:scale-[0.98]"
            >
              <Globe className="text-muted-foreground size-3" />
              <span>Live</span>
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.name}`}
              className="border-border/50 bg-background/80 hover:bg-muted/50 text-muted-foreground hover:text-foreground inline-flex size-7 items-center justify-center rounded-lg border transition-all active:scale-[0.98]"
            >
              <Github className="size-3.5" />
            </Link>
          )}
        </div>
      </div>

      <Link
        href={projectPageUrl}
        prefetch={false}
        aria-label={`View ${project.name} overview`}
        className="border-border/50 bg-muted/20 group/img relative mb-3.5 block aspect-video w-full cursor-pointer overflow-hidden rounded-lg border"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          priority={priorityImage}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
      </Link>

      <p className="font-display text-foreground/80 mb-3.5 text-xs leading-relaxed sm:text-sm">
        {project.description}
      </p>

      {/* Expandable Architecture & Engineering Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-3.5">
          <button
            type="button"
            onClick={() => setShowArchitecture((prev) => !prev)}
            aria-expanded={showArchitecture}
            className="group/btn inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Layers className="size-3 text-muted-foreground" />
            <span>{showArchitecture ? "Hide Architecture Highlights" : "Inspect Architecture & Decisions"}</span>
            <ChevronDown
              className={`size-3 transition-transform duration-200 ${
                showArchitecture ? "rotate-180 text-foreground" : ""
              }`}
            />
          </button>

          {showArchitecture && (
            <div className="mt-2.5 space-y-2 rounded-lg border border-border/40 bg-muted/20 p-3 text-xs animate-in fade-in-50 duration-200">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Engineered Highlights & Constraints
              </div>
              <div className="grid grid-cols-1 gap-2">
                {project.highlights.map((hl) => (
                  <div key={hl.title} className="space-y-0.5 border-l border-border/60 pl-2.5">
                    <p className="font-sans font-semibold text-foreground text-[11px]">
                      {hl.title}
                    </p>
                    <p className="font-display text-muted-foreground text-[11px] leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                ))}
              </div>
              {caseStudyUrl && (
                <div className="pt-1.5 text-right">
                  <Link
                    href={caseStudyUrl}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-foreground hover:underline"
                  >
                    <span>Read Full Engineering Case Study</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="border-border/30 flex flex-col justify-between gap-3 border-t pt-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="border-border/40 bg-muted/20 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-start sm:self-auto">
          {project.id === "infinity" ? (
            <Link
              href="/#contact?feedback=infinity"
              className="group/fb border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-colors"
              title="Click to send feedback directly to Vishal"
            >
              <span className="size-1.5 rounded-full bg-emerald-500 group-hover/fb:animate-pulse" />
              <span>Feedback &rarr;</span>
            </Link>
          ) : badgeText ? (
            <span className="border-border/40 bg-muted/20 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px]">
              <span className="bg-muted-foreground/40 size-1.5 rounded-full" />
              <span>{badgeText}</span>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
