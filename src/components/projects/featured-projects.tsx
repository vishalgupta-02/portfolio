"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./project-card";
import {
  getAllProjects,
  getFeaturedProjects,
  type Project,
} from "@/lib/projects";

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
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8"
      aria-label="Featured Projects"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-sans text-xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground font-display mt-0.5 text-xs">
            Systems, SaaS platforms & backend infrastructure
          </p>
        </div>
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
            className="border-border/60 bg-muted/20 hover:bg-muted/50 text-foreground inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-all active:scale-[0.98]"
          >
            <span>View All Projects ({totalAllProjects})</span>
            <ArrowRight className="text-muted-foreground size-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
