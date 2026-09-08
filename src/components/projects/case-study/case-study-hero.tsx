import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Terminal } from "lucide-react"
import { Github } from "@/components/socials"
import type { Project } from "@/lib/projects/types"

interface CaseStudyHeroProps {
  project: Project
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const caseStudy = project.caseStudy
  if (!caseStudy) {
    return null
  }

  const role = caseStudy.role || project.role
  const status = caseStudy.status || project.status
  const timeline = caseStudy.timeline || project.timeline
  const architectureLabel = caseStudy.architectureLabel || "Monorepo"

  return (
    <>
      {/* Top Header Navigation */}
      <nav
        aria-label="Breadcrumb Navigation"
        className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-foreground/60 border-b border-border/20 pb-4"
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Project Overview</span>
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/#projects"
            className="hover:text-foreground transition-colors hidden sm:inline"
          >
            Portfolio
          </Link>
        </div>

        {project.githubUrl && (
          <div className="flex items-center gap-2">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github />
              <span>Repository</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-card/60 text-[11px] font-mono uppercase tracking-wider text-foreground/80">
          <Terminal className="size-3 text-emerald-500" />
          <span>Engineering Case Study</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
          {caseStudy.title}
        </h1>

        <p className="font-display font-medium text-sm sm:text-base text-foreground/80 leading-relaxed">
          {caseStudy.description}
        </p>

        {/* Metadata Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/20 text-xs font-display">
          {role && (
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Role
              </span>
              <p className="font-medium text-foreground">{role}</p>
            </div>
          )}
          {status && (
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Status
              </span>
              <p className="font-medium text-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {status}
              </p>
            </div>
          )}
          {timeline && (
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Timeline
              </span>
              <p className="font-medium text-foreground">{timeline}</p>
            </div>
          )}
          {architectureLabel && (
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Architecture
              </span>
              <p className="font-medium text-foreground">{architectureLabel}</p>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
