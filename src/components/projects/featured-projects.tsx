"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./project-card";
import { getAllProjects, getFeaturedProjects, type Project } from "@/lib/projects";

export interface FeaturedProjectsProps {
  projects?: Project[];
  title?: string;
  showViewAll?: boolean;
}

export default function FeaturedProjects({
  projects,
  title = "Projects",
  showViewAll = true,
}: FeaturedProjectsProps) {
  const projectsList =
    projects && projects.length > 0 ? projects : getFeaturedProjects();
  const totalAllProjects = getAllProjects().length;

  if (!projectsList || projectsList.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="w-full max-w-2xl mx-auto py-8 px-4 border-b border-border/40"
      aria-label="Featured Projects"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-sans">
            {title}
          </h2>
          <p className="text-xs text-muted-foreground font-display mt-0.5">
            Systems, SaaS platforms & backend infrastructure
          </p>
        </div>
        <span className="text-xs font-mono text-muted-foreground/80">
          {projectsList.length} of {totalAllProjects} featured
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {projectsList.map((project, index) => (
          <ProjectCard
            key={project.id || project.slug}
            project={project}
            priorityImage={index === 0}
          />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-6 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/50 px-4 py-2 text-xs font-medium text-foreground transition-all active:scale-[0.98]"
          >
            <span>View All Projects ({totalAllProjects})</span>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </Link>
        </div>
      )}
    </section>
  );
}
