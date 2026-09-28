"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
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
  limit?: number;
}

type ProjectFilter = "all" | "backend" | "ai";

export default function FeaturedProjects({
  projects,
  title = "Projects",
  showViewAll = true,
  limit = 2,
}: FeaturedProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const allProjects = getAllProjects();
  const baseFeatured = projects && projects.length > 0 ? projects : getFeaturedProjects();

  let filteredProjects = baseFeatured;
  if (activeFilter === "backend") {
    filteredProjects = allProjects.filter(
      (p) => p.tags.some((t) => /backend|saas|multi-tenancy|postgresql/i.test(t))
    );
  } else if (activeFilter === "ai") {
    filteredProjects = allProjects.filter(
      (p) => p.tags.some((t) => /ai|gemini|canvas|diagram|document/i.test(t))
    );
  } else {
    // "all" preserves the 2 flagship systems default
    filteredProjects = limit ? baseFeatured.slice(0, limit) : baseFeatured;
  }

  const totalAllProjects = allProjects.length;

  return (
    <section
      id="projects"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8 scroll-mt-16"
      aria-label="Projects and Systems"
    >
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground font-sans text-xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground font-display mt-0.5 text-xs">
            Flagship systems, multi-tenant SaaS & AI workspaces
          </p>
        </div>

        {/* Project Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-muted text-foreground font-semibold border border-border/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
            }`}
          >
            Flagship (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("backend")}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeFilter === "backend"
                ? "bg-muted text-foreground font-semibold border border-border/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
            }`}
          >
            Backend & SaaS
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("ai")}
            className={`rounded-md px-2.5 py-1 transition-all cursor-pointer ${
              activeFilter === "ai"
                ? "bg-muted text-foreground font-semibold border border-border/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
            }`}
          >
            AI & Systems
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredProjects.map((project, index) => (
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
            <span>View All Projects & Architectures ({totalAllProjects})</span>
            <ArrowRight className="text-muted-foreground size-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
