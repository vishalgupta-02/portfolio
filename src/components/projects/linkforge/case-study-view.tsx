"use client"

import CaseStudyView from "../case-study-view"
import { linkforgeProject } from "@/lib/projects/data/linkforge"

export default function LinkforgeCaseStudyView() {
  return <CaseStudyView project={linkforgeProject} />
}
