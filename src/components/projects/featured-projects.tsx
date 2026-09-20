"use client";

import ProjectCard from "./project-card";
import { getFeaturedProjects, type Project } from "@/lib/projects";

export interface FeaturedProjectsProps {
  projects?: Project[];
  title?: string;
}

export default function FeaturedProjects({
  projects,
  title = "Projects",
}: FeaturedProjectsProps) {
  const projectsList =
    projects && projects.length > 0 ? projects : getFeaturedProjects();

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
          {projectsList.length} {projectsList.length === 1 ? "project" : "projects"}
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
    </section>
  );
}
