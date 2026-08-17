import { linkforgeProject } from "./data/linkforge"

export * from "./types"

export const LINKFORGE_METADATA = {
  title: linkforgeProject.title,
  description: linkforgeProject.description,
  caseStudyTitle: linkforgeProject.caseStudy?.title ?? linkforgeProject.title,
  caseStudyDescription:
    linkforgeProject.caseStudy?.description ?? linkforgeProject.description,
  status: linkforgeProject.status,
  role: linkforgeProject.role,
  timeline: linkforgeProject.timeline,
  liveUrl: linkforgeProject.liveUrl,
  githubUrl: linkforgeProject.githubUrl,
  image: linkforgeProject.image,
  imageAlt: linkforgeProject.imageAlt,
}

export const LINKFORGE_KEY_FEATURES = linkforgeProject.highlights ?? []
export const LINKFORGE_TECH_STACK = linkforgeProject.techStack ?? []
export const LINKFORGE_CASE_STUDY_SECTIONS =
  linkforgeProject.caseStudy?.sections ?? []
export const LINKFORGE_CHALLENGES = linkforgeProject.caseStudy?.challenges ?? []
