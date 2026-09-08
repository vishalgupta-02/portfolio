"use client"

import FeaturedProjects, {
  type FeaturedProjectsProps,
} from "./projects/featured-projects"

export { default as FeaturedProjects } from "./projects/featured-projects"
export { default as ProjectCard } from "./projects/project-card"
export { default as ProjectGrid } from "./projects/project-grid"
export { type Project } from "@/lib/projects"

export default function ProjectSection(props: FeaturedProjectsProps) {
  return <FeaturedProjects {...props} />
}
