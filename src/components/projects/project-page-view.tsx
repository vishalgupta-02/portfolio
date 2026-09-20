"use client"

import MainLayout from "@/components/main-layout"
import ProjectHero from "./project-hero"
import ProjectOverview from "./project-overview"
import ProjectHighlights from "./project-highlights"
import ProjectTechStack from "./project-tech-stack"
import ProjectCTA from "./project-cta"
import ProjectNavigation from "./project-navigation"
import type { Project } from "@/lib/projects/types"

interface ProjectPageViewProps {
  project: Project
}

export default function ProjectPageView({ project }: ProjectPageViewProps) {
  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        <ProjectHero project={project} />

        <ProjectOverview project={project} />

        {project.highlights && project.highlights.length > 0 && (
          <ProjectHighlights highlights={project.highlights} />
        )}

        {project.techStack && project.techStack.length > 0 && (
          <ProjectTechStack techStack={project.techStack} />
        )}

        <ProjectCTA project={project} />

        <ProjectNavigation currentProject={project} />
      </div>
    </MainLayout>
  )
}
