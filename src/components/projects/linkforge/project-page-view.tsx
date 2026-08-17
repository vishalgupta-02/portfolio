"use client"

import ProjectPageView from "../project-page-view"
import { linkforgeProject } from "@/lib/projects/data/linkforge"

export default function LinkforgeProjectPageView() {
  return <ProjectPageView project={linkforgeProject} />
}
