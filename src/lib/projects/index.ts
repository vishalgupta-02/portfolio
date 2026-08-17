import { linkforgeProject } from "./data/linkforge"
import { clarivProject } from "./data/clariv"
import { careerlyProject } from "./data/careerly"
import type { Project } from "./types"

export * from "./types"
export { linkforgeProject } from "./data/linkforge"
export { clarivProject } from "./data/clariv"
export { careerlyProject } from "./data/careerly"

export const PROJECTS: Project[] = [
  linkforgeProject,
  clarivProject,
  careerlyProject,
]

export function getAllProjects(): Project[] {
  return PROJECTS
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase().trim()
  return PROJECTS.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  )
}

export function getCaseStudyProjects(): Project[] {
  return PROJECTS.filter((p) => Boolean(p.hasCaseStudy && p.caseStudy))
}
