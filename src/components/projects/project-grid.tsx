"use client"

import ProjectCard from "./project-card"
import type { Project } from "@/lib/projects/types"

interface ProjectGridProps {
  projects: Project[]
  columns?: 1 | 2
}

export default function ProjectGrid({
  projects,
  columns = 1,
}: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id || project.slug}
          project={project}
          priorityImage={index === 0}
        />
      ))}
    </div>
  )
}
