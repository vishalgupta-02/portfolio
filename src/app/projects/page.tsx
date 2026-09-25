import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Layers, Terminal } from "lucide-react"
import MainLayout from "@/components/main-layout"
import ProjectCard from "@/components/projects/project-card"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { getAllProjects, getCaseStudyProjects } from "@/lib/projects"
import { siteConfig } from "@/lib/blog/site"

export const metadata: Metadata = {
  title: "Projects | Systems, SaaS & Engineering Architectures",
  description:
    "Explore full-stack software systems, real-time CRDT collaboration engines, AI-native workspaces, and in-depth engineering case studies.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Systems, SaaS & Engineering Architectures",
    description:
      "Explore full-stack software systems, real-time CRDT collaboration engines, AI-native workspaces, and in-depth engineering case studies by Vishal Gupta.",
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Projects — Vishal Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Systems, SaaS & Engineering Architectures",
    description:
      "Explore full-stack software systems, real-time CRDT collaboration engines, AI-native workspaces, and in-depth engineering case studies.",
    images: [siteConfig.ogImage],
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const caseStudyProjects = getCaseStudyProjects()

  return (
    <MainLayout>
      <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
        {/* Header Section */}
        <header className="mb-8">
          <div className="text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            Engineering Portfolio & Case Studies
          </div>

          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl font-sans">
            Projects & Systems
          </h1>

          <p className="text-muted-foreground mt-2 text-sm leading-relaxed font-display">
            Production platforms, distributed data architectures, real-time CRDT
            collaboration engines, and AI tooling engineered with an emphasis on
            backend fundamentals and resilient system design.
          </p>

          <div className="border-border bg-card/60 mt-6 grid grid-cols-3 gap-3 rounded-xl border p-3 text-center sm:p-4">
            <div className="border-border/60 border-r pr-2">
              <span className="text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs">
                <Layers className="size-3.5 text-blue-500" aria-hidden="true" />
                Projects
              </span>
              <p className="text-foreground mt-1 font-mono text-lg font-bold">
                0{projects.length}
              </p>
            </div>

            <div className="border-border/60 border-r px-2">
              <span className="text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs">
                <BookOpen
                  className="size-3.5 text-emerald-500"
                  aria-hidden="true"
                />
                Case Studies
              </span>
              <p className="text-foreground mt-1 font-mono text-lg font-bold">
                0{caseStudyProjects.length}
              </p>
            </div>

            <div className="pl-2">
              <span className="text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs">
                <Terminal className="size-3.5 text-amber-500" aria-hidden="true" />
                Active Work
              </span>
              <p className="text-foreground mt-1 font-mono text-lg font-bold">
                Live & Lab
              </p>
            </div>
          </div>
        </header>

        {/* Full Project Listing */}
        <section aria-label="All projects list" className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
              priorityImage={index === 0}
            />
          ))}
        </section>

        {/* Case Study Callout Banner */}
        <section className="mt-12 rounded-2xl border border-border/40 bg-card/20 p-5 text-center sm:p-6 transition-all duration-200 hover:border-border/70 hover:bg-card/40">
          <h2 className="text-base font-semibold text-foreground font-sans">
            Interested in technical deep dives?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-display max-w-md mx-auto">
            Explore long-form architectural breakdowns, failure mode analyses, and
            system incident retrospectives.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/postmortems"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 active:scale-95 transition-all"
            >
              <span>Production Postmortems</span>
              <ArrowUpRight className="size-3 text-muted-foreground" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 active:scale-95 transition-all"
            >
              <span>Read Tech Blog</span>
              <ArrowUpRight className="size-3 text-muted-foreground" />
            </Link>
          </div>
        </section>
      </main>

      <ProgressiveBlur height="4rem" position="bottom" />
    </MainLayout>
  )
}
