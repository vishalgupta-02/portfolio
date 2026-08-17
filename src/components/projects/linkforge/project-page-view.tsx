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
} from "lucide-react"
import MainLayout from "@/components/main-layout"
import { Github } from "@/components/socials"
import {
  LINKFORGE_METADATA,
  LINKFORGE_KEY_FEATURES,
  LINKFORGE_TECH_STACK,
} from "@/lib/projects/linkforge-data"

const iconMap = {
  shield: Shield,
  zap: Zap,
  cpu: Cpu,
  lock: Lock,
  database: Layers,
  git: Github,
}

export default function LinkforgeProjectPageView() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        {/* Top Header Navigation */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-4"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border/30 bg-background/80 text-[11px] font-mono text-foreground/80">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{LINKFORGE_METADATA.status}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="space-y-5 text-center">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-card/60 text-[11px] font-mono uppercase tracking-wider text-foreground/80"
          >
            <Sparkles className="size-3 text-emerald-500" />
            <span>Featured Project</span>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
              Linkforge
            </h1>
            <p className="font-display font-medium text-sm sm:text-base text-foreground/80">
              Multi-tenant SaaS · Link-in-bio & Real-Time Analytics
            </p>
          </motion.div>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-display text-xs sm:text-sm text-foreground/70 max-w-lg mx-auto leading-relaxed"
          >
            I built the core backend and analytics infrastructure that powers
            Linkforge. From tenant isolation and event tracking to analytics
            aggregation and secure username management.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              href={LINKFORGE_METADATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-xs"
            >
              <Github />
              <span>View Live / Repo</span>
              <ArrowUpRight className="size-4" />
            </Link>

            <Link
              href="/projects/linkforge/case-study"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/30 bg-background/80 hover:bg-muted/40 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]"
            >
              <FileText className="size-4 text-emerald-500" />
              <span>Read Case Study</span>
              <ArrowUpRight className="size-3.5 text-foreground/60" />
            </Link>
          </motion.div>
        </header>

        {/* Hero Visual: Main Product Screenshot */}
        <motion.section
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          aria-label="Linkforge Product Screenshot"
          className="relative group"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"
          />
          <div className="relative rounded-xl border border-border/40 bg-card overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/40">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
              <Image
                src={LINKFORGE_METADATA.image}
                alt={LINKFORGE_METADATA.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                priority
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </motion.section>

        {/* Section: What is Linkforge? */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-sans font-semibold text-foreground">
            What is Linkforge?
          </h2>
          <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
            <p>
              Linkforge is a developer-centric link-in-bio and real-time
              analytics platform built from scratch with an emphasis on
              resilient backend fundamentals before applying abstractions.
            </p>
            <p>
              While surface-level bio tools present simple lists of links, the
              underlying architecture must support multi-tenant database
              partitioning, race-condition-free vanity slug changes, fail-fast
              configuration checks, and high-throughput async event logging.
            </p>
          </div>
        </section>

        {/* Section: Key Engineering Highlights */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-sans font-semibold text-foreground">
              Engineering Highlights
            </h2>
            <span className="text-xs font-mono text-foreground/50">
              04 Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LINKFORGE_KEY_FEATURES.map((feature) => {
              const Icon = iconMap[feature.iconType] || Layers
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border/30 bg-card/40 dark:bg-custom-black/40 p-4 space-y-2 hover:border-border/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md border border-border/30 bg-background/80 text-foreground">
                      <Icon className="size-4 text-emerald-500" />
                    </div>
                    <h3 className="text-sm font-sans font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="font-display text-[11px] font-medium text-foreground/60 italic">
                    {feature.subtitle}
                  </p>
                  <p className="font-display text-xs text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section: Technology Stack */}
        <section className="space-y-4 pt-2">
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Technology Stack
          </h2>
          <div className="space-y-4">
            {LINKFORGE_TECH_STACK.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2.5"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/25 bg-background/80 text-xs font-display text-foreground"
                    >
                      <span className="font-medium">{tech.name}</span>
                      {tech.description && (
                        <span className="text-[10px] text-foreground/50 border-l border-border/25 pl-1.5">
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

        {/* Bottom CTA: Link to Technical Case Study */}
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
              href="/projects/linkforge/case-study"
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
      </div>
    </MainLayout>
  )
}
