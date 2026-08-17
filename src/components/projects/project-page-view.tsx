"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowLeft,
  ArrowUpRight,
  Shield,
  Zap,
  Cpu,
  Lock,
  Sparkles,
  Layers,
  FileText,
  Server,
  Database,
  type LucideIcon,
} from "lucide-react"
import MainLayout from "@/components/main-layout"
import { Github } from "@/components/socials"
import type { Project, IconType } from "@/lib/projects/types"

const iconMap: Record<
  IconType | string,
  LucideIcon | React.ComponentType<{ className?: string }>
> = {
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  lock: Lock,
  database: Database,
  layers: Layers,
  server: Server,
  sparkles: Sparkles,
  fileText: FileText,
  git: Github,
}

interface ProjectPageViewProps {
  project: Project
}

export default function ProjectPageView({ project }: ProjectPageViewProps) {
  const shouldReduceMotion = useReducedMotion()

  const liveOrRepoUrl = project.liveUrl || project.githubUrl
  const isGithubOnly = !project.liveUrl || project.liveUrl === project.githubUrl
  const liveButtonLabel = isGithubOnly ? "View Live / Repo" : "View Live"

  return (
    <MainLayout>
      <div className='w-full max-w-2xl mx-auto px-4 py-6 space-y-12'>
        {/* Top Header Navigation */}
        <nav
          aria-label='Breadcrumb Navigation'
          className='flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-4'>
          <Link
            href='/#projects'
            className='inline-flex items-center gap-1.5 hover:text-foreground transition-colors group'>
            <ArrowLeft className='size-3.5 transition-transform group-hover:-translate-x-0.5' />
            <span>Back to Projects</span>
          </Link>

          <div className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border/30 bg-background/80 text-[11px] font-mono text-foreground/80'>
            <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
            <span>{project.status}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className='space-y-5 text-center'>
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className='space-y-2'>
            <h1 className='text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground'>
              {project.name}
            </h1>
            <p className='font-display font-medium text-sm sm:text-base text-foreground/80'>
              {project.subtitle}
            </p>
          </motion.div>

          {project.longDescription && project.longDescription.length > 0 ? (
            <motion.p
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className='font-display text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed'>
              {project.longDescription[0]}
            </motion.p>
          ) : (
            <motion.p
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className='font-display text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed'>
              {project.description}
            </motion.p>
          )}

          {/* Primary Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className='flex flex-wrap items-center justify-center gap-3 pt-2'>
            {liveOrRepoUrl && (
              <Link
                href={liveOrRepoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-xs'>
                <Github />
                <span>{liveButtonLabel}</span>
                <ArrowUpRight className='size-4' />
              </Link>
            )}

            {project.hasCaseStudy && (
              <Link
                href={`/projects/${project.slug}/case-study`}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]'>
                <FileText className='size-4 text-emerald-500' />
                <span>Read Case Study</span>
                <ArrowUpRight className='size-3.5 text-foreground/60' />
              </Link>
            )}
          </motion.div>
        </header>

        {/* Hero Visual: Main Product Screenshot */}
        <motion.section
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label={`${project.name} Product Screenshot`}
          className='relative group'>
          <div
            aria-hidden='true'
            className='absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 opacity-50 blur-xl transition duration-500 group-hover:opacity-75'
          />
          <div className='relative rounded-xl border border-border/40 bg-card overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/40'>
            <div className='relative aspect-[16/10] w-full overflow-hidden bg-muted/20'>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes='(max-width: 768px) 100vw, 700px'
                priority
                className='object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]'
              />
            </div>
          </div>
        </motion.section>

        {/* Section: What is Project? */}
        <section className='space-y-3 pt-2'>
          <h2 className='text-xl font-sans font-semibold text-foreground'>
            What is {project.name}?
          </h2>
          <div className='font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3'>
            {project.longDescription && project.longDescription.length > 1 ? (
              project.longDescription
                .slice(1)
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>{project.description}</p>
            )}
          </div>
        </section>

        {/* Section: Key Engineering Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className='space-y-4 pt-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-sans font-semibold text-foreground'>
                Engineering Highlights
              </h2>
              <span className='text-xs font-mono text-foreground/50'>
                0{project.highlights.length} Core Pillars
              </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {project.highlights.map((feature) => {
                const IconComponent = iconMap[feature.iconType] || Layers
                return (
                  <div
                    key={feature.title}
                    className='rounded-xl border border-border/30 bg-card/40 dark:bg-custom-black/40 p-4 space-y-2 hover:border-border/60 transition-colors'>
                    <div className='flex items-center gap-2'>
                      <div className='p-1.5 rounded-md border border-border/30 bg-background/80 text-foreground'>
                        <IconComponent className='size-4 text-emerald-500' />
                      </div>
                      <h3 className='text-sm font-sans font-semibold text-foreground'>
                        {feature.title}
                      </h3>
                    </div>
                    {feature.subtitle && (
                      <p className='font-display text-[11px] font-medium text-foreground/60 italic'>
                        {feature.subtitle}
                      </p>
                    )}
                    <p className='font-display text-xs text-foreground/70 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Section: Technology Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <section className='space-y-4 pt-2'>
            <h2 className='text-xl font-sans font-semibold text-foreground'>
              Technology Stack
            </h2>
            <div className='space-y-4'>
              {project.techStack.map((group) => (
                <div
                  key={group.category}
                  className='rounded-xl border border-border/30 bg-card/30 p-4 space-y-2.5'>
                  <h3 className='text-xs font-mono uppercase tracking-wider text-foreground/60'>
                    {group.category}
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {group.items.map((tech) => (
                      <div
                        key={tech.name}
                        className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/25 bg-background/80 text-xs font-display text-foreground'>
                        <span className='font-medium'>{tech.name}</span>
                        {tech.description && (
                          <span className='text-[10px] text-foreground/50 border-l border-border/25 pl-1.5'>
                            {tech.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA: Link to Technical Case Study or Portfolio */}
        {project.hasCaseStudy ? (
          <section className='rounded-2xl border border-border/30 bg-card/60 dark:bg-custom-black/60 p-6 sm:p-8 text-center space-y-4 shadow-sm'>
            <span className='inline-block size-2 rounded-full bg-emerald-500' />
            <div className='space-y-1 max-w-md mx-auto'>
              <h2 className='text-xl sm:text-2xl font-sans font-bold text-foreground'>
                Want to see how it was built?
              </h2>
              <p className='font-display text-xs sm:text-sm text-foreground/70 leading-relaxed'>
                Explore the detailed technical case study covering database
                transactions, auth primitives, fail-fast validation, and lessons
                learned.
              </p>
            </div>

            <div className='pt-2 flex flex-wrap items-center justify-center gap-3'>
              <Link
                href={`/projects/${project.slug}/case-study`}
                className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]'>
                <span>Read the Technical Case Study</span>
                <ArrowUpRight className='size-4' />
              </Link>

              <Link
                href='/#projects'
                className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200'>
                <ArrowLeft className='size-3.5' />
                <span>Back to Portfolio</span>
              </Link>
            </div>
          </section>
        ) : (
          <section className='rounded-2xl border border-border/30 bg-card/60 dark:bg-custom-black/60 p-6 sm:p-8 text-center space-y-4 shadow-sm'>
            <div className='space-y-1 max-w-md mx-auto'>
              <h2 className='text-xl sm:text-2xl font-sans font-bold text-foreground'>
                Explore More Projects
              </h2>
              <p className='font-display text-xs sm:text-sm text-foreground/70 leading-relaxed'>
                Discover other backend architectures, full-stack applications,
                and open-source tools in my portfolio.
              </p>
            </div>

            <div className='pt-2 flex flex-wrap items-center justify-center gap-3'>
              {liveOrRepoUrl && (
                <Link
                  href={liveOrRepoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]'>
                  <Github />
                  <span>{liveButtonLabel}</span>
                  <ArrowUpRight className='size-4' />
                </Link>
              )}

              <Link
                href='/#projects'
                className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200'>
                <ArrowLeft className='size-3.5' />
                <span>Back to Portfolio</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}
