import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

interface CaseStudyFooterProps {
  project: Project
}

export default function CaseStudyFooter({ project }: CaseStudyFooterProps) {
  return (
    <footer className="pt-6 border-t border-border/20 flex flex-wrap items-center justify-between gap-4">
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
      >
        <ArrowLeft className="size-3.5" />
        <span>Back to {project.name} Overview</span>
      </Link>

      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-all"
          >
            <Github />
            <span>Source Code</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        )}

        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/30 bg-background hover:bg-muted/40 text-xs font-medium text-foreground transition-all"
        >
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </footer>
  )
}
