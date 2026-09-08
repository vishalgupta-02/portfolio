import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getAdjacentProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects/types"

interface ProjectNavigationProps {
  currentProject: Project
}

export default function ProjectNavigation({
  currentProject,
}: ProjectNavigationProps) {
  const { prev, next } = getAdjacentProjects(currentProject.slug)

  if (!prev && !next) {
    return null
  }

  return (
    <nav
      aria-label="Project pagination"
      className="pt-6 border-t border-border/20 flex items-center justify-between gap-4 text-xs font-mono text-foreground/70"
    >
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span className="truncate max-w-[140px] sm:max-w-none">
            Prev: {prev.name}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group text-right"
        >
          <span className="truncate max-w-[140px] sm:max-w-none">
            Next: {next.name}
          </span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
