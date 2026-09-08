import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

interface ProjectCTAProps {
  project: Project
}

export default function ProjectCTA({ project }: ProjectCTAProps) {
  const liveOrRepoUrl = project.liveUrl || project.githubUrl
  const isGithubOnly = !project.liveUrl || project.liveUrl === project.githubUrl
  const liveButtonLabel = isGithubOnly ? "View Live / Repo" : "View Live"

  if (project.hasCaseStudy) {
    return (
      <section className="rounded-2xl border border-border/30 bg-card/60 dark:bg-custom-black/60 p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <span className="inline-block size-2 rounded-full bg-emerald-500" />
        <div className="space-y-1 max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-sans font-bold text-foreground">
            Want to see how it was built?
          </h2>
          <p className="font-display text-xs sm:text-sm text-foreground/70 leading-relaxed">
            Explore the detailed technical case study covering database
            transactions, auth primitives, fail-fast validation, and lessons
            learned.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/projects/${project.slug}/case-study`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
          >
            <span>Read the Technical Case Study</span>
            <ArrowUpRight className="size-4" />
          </Link>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-border/30 bg-card/60 dark:bg-custom-black/60 p-6 sm:p-8 text-center space-y-4 shadow-sm">
      <div className="space-y-1 max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-sans font-bold text-foreground">
          Explore More Projects
        </h2>
        <p className="font-display text-xs sm:text-sm text-foreground/70 leading-relaxed">
          Discover other backend architectures, full-stack applications, and
          open-source tools in my portfolio.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        {liveOrRepoUrl && (
          <Link
            href={liveOrRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
          >
            <Github />
            <span>{liveButtonLabel}</span>
            <ArrowUpRight className="size-4" />
          </Link>
        )}

        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    </section>
  )
}
