"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowLeft,
  ArrowUpRight,
  Shield,
  Zap,
  Cpu,
  Lock,
  Layers,
  FileCode2,
  CheckCircle2,
  Terminal,
  Server,
  Database,
  ArrowRight,
  Boxes,
  Copy,
  Check,
} from "lucide-react"
import MainLayout from "@/components/main-layout"
import { Github } from "@/components/socials"
import { cn } from "@/lib/utils"
import {
  LINKFORGE_METADATA,
  LINKFORGE_CASE_STUDY_SECTIONS,
  LINKFORGE_CHALLENGES,
  LINKFORGE_TECH_STACK,
} from "@/lib/projects/linkforge-data"

export default function LinkforgeCaseStudyView() {
  const shouldReduceMotion = useReducedMotion()
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  return (
    <MainLayout>
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-12">
        {/* Top Header Navigation */}
        <nav
          aria-label="Breadcrumb Navigation"
          className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-foreground/60 border-b border-border/20 pb-4"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/projects/linkforge"
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

          <div className="flex items-center gap-2">
            <Link
              href={LINKFORGE_METADATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github />
              <span>Repository</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-card/60 text-[11px] font-mono uppercase tracking-wider text-foreground/80">
            <Terminal className="size-3 text-emerald-500" />
            <span>Engineering Case Study</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-foreground">
            Linkforge: Multi-Tenant Link-in-Bio & Analytics Engine
          </h1>

          <p className="font-display font-medium text-sm sm:text-base text-foreground/80 leading-relaxed">
            An in-depth breakdown of designing tenant-isolated data
            architectures, fail-fast configuration schemas, atomic slug
            mutations, and asynchronous clickstream analytics pipelines.
          </p>

          {/* Metadata Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/20 text-xs font-display">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Role
              </span>
              <p className="font-medium text-foreground">{LINKFORGE_METADATA.role}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Status
              </span>
              <p className="font-medium text-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {LINKFORGE_METADATA.status}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Timeline
              </span>
              <p className="font-medium text-foreground">
                {LINKFORGE_METADATA.timeline}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-foreground/50 uppercase">
                Monorepo
              </span>
              <p className="font-medium text-foreground">pnpm workspaces</p>
            </div>
          </div>
        </header>

        {/* Sticky/Sub-header Section Index */}
        <section
          aria-label="Table of Contents"
          className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-foreground/60">
            <span>Table of Contents</span>
            <span>10 Sections</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 pt-1">
            {LINKFORGE_CASE_STUDY_SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="text-xs font-display text-foreground/70 hover:text-foreground hover:underline transition-colors flex items-center gap-1.5 py-0.5"
              >
                <span className="font-mono text-[10px] text-foreground/40">
                  {sec.label}
                </span>
                <span className="truncate">{sec.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 01 — Overview */}
        <section id="overview" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>01</span>
            <span>//</span>
            <span>OVERVIEW</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Building the Primitives First
          </h2>
          <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
            <p>
              When building modern SaaS products, developers frequently reach for
              batteries-included auth frameworks, hosted databases, and black-box
              cloud analytics before understanding the fundamental primitives.
            </p>
            <p>
              Linkforge was built with a deliberate rule:{" "}
              <strong className="text-foreground font-medium">
                understand the primitives before allowing abstractions to hide
                them.
              </strong>{" "}
              Before integrating higher-level orchestration, the application was
              architected with raw JWT validation, manual session cookies, raw
              PostgreSQL schemas, and custom Express middleware.
            </p>
          </div>
        </section>

        {/* 02 — The Problem */}
        <section id="problem" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>02</span>
            <span>//</span>
            <span>THE PROBLEM & CONSTRAINTS</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            What Makes Link-in-Bio Technically Non-Trivial?
          </h2>
          <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
            <p>
              On the surface, a link-in-bio app seems like a basic CRUD list of
              URLs. However, supporting multi-tenant isolation with real-time
              telemetry presents complex backend engineering requirements:
            </p>
            <ul className="space-y-2 pt-1">
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-500 text-xs">▸</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Multi-Tenant Boundary Enforcement:
                  </strong>{" "}
                  Preventing accidental data leakage between user accounts without
                  bloating every query with boilerplate.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-500 text-xs">▸</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Concurrent Slug Collisions:
                  </strong>{" "}
                  Preventing race conditions when users modify their vanity URL
                  handles at the exact same moment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-500 text-xs">▸</span>
                <span>
                  <strong className="text-foreground font-medium">
                    High-Volume Telemetry Logging:
                  </strong>{" "}
                  Capturing clickstream events, geolocation, and referrer headers
                  without slowing down visitor HTTP 302 redirects.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-emerald-500 text-xs">▸</span>
                <span>
                  <strong className="text-foreground font-medium">
                    Fail-Fast Startup Integrity:
                  </strong>{" "}
                  Guaranteeing the API cannot boot in an invalid state due to
                  missing environment configurations.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 03 — Engineering Goals */}
        <section id="goals" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>03</span>
            <span>//</span>
            <span>ENGINEERING GOALS</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Design Requirements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="rounded-lg border border-border/25 bg-card/30 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Zero Tenant Leakage</span>
              </div>
              <p className="font-display text-xs text-foreground/60">
                100% of read/write queries must be scoped to verified tenant
                identifiers.
              </p>
            </div>

            <div className="rounded-lg border border-border/25 bg-card/30 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Sub-Millisecond Redirects</span>
              </div>
              <p className="font-display text-xs text-foreground/60">
                Critical path link forwarding decoupled from analytics event
                persistence.
              </p>
            </div>

            <div className="rounded-lg border border-border/25 bg-card/30 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Fail-Fast Configuration</span>
              </div>
              <p className="font-display text-xs text-foreground/60">
                Zod validation at boot time prevents runtime config crashes in
                production.
              </p>
            </div>

            <div className="rounded-lg border border-border/25 bg-card/30 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Atomic Slug Safety</span>
              </div>
              <p className="font-display text-xs text-foreground/60">
                Interactive database transactions eliminate vanity handle race
                conditions.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — System Architecture */}
        <section id="architecture" className="space-y-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>04</span>
            <span>//</span>
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Monorepo & Multi-Tier Topology
          </h2>
          <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
            Linkforge is organized as a pnpm workspace monorepo isolating client
            presentation from API and worker services:
          </p>

          {/* Architecture Diagram Box */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-foreground/60 border-b border-border/20 pb-2">
              <span className="flex items-center gap-1.5">
                <Boxes className="size-3.5 text-emerald-500" />
                <span>linkforge-monorepo topology</span>
              </span>
              <span>pnpm-workspace</span>
            </div>

            {/* Architecture Node Flow */}
            <div className="space-y-3 font-mono text-xs">
              {/* Row 1: Client Layer */}
              <div className="rounded-lg border border-border/30 bg-background/80 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-foreground">apps/web</span>
                  <span className="text-foreground/50 text-[11px]">
                    (Next.js App Router)
                  </span>
                </div>
                <span className="text-[11px] text-foreground/60 font-display">
                  Public Bio Pages · Authenticated Analytics Dashboard
                </span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-foreground/40 text-[11px]">
                ↓ HTTP / REST / Secure Cookies
              </div>

              {/* Row 2: API Gateway Layer */}
              <div className="rounded-lg border border-border/30 bg-background/80 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-500" />
                  <span className="font-bold text-foreground">apps/api</span>
                  <span className="text-foreground/50 text-[11px]">
                    (Express & Node.js)
                  </span>
                </div>
                <span className="text-[11px] text-foreground/60 font-display">
                  Tenant Middleware · Zod Schema · Auth Pipeline
                </span>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-foreground/40 text-[11px]">
                ↓ Prisma ORM & Redis Buffer
              </div>

              {/* Row 3: Data & Ingestion Layer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-lg border border-border/30 bg-background/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Database className="size-3 text-emerald-500" />
                    <span className="font-bold text-foreground">PostgreSQL</span>
                  </div>
                  <p className="text-[11px] text-foreground/60 font-display">
                    Users · Links · Tenant Workspaces · Daily Aggregates
                  </p>
                </div>

                <div className="rounded-lg border border-border/30 bg-background/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Zap className="size-3 text-amber-500" />
                    <span className="font-bold text-foreground">Redis & Workers</span>
                  </div>
                  <p className="text-[11px] text-foreground/60 font-display">
                    Async Event Queue · Rate Limiter · Fast Session Revocation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Core Engineering Challenges */}
        <section id="challenges" className="space-y-6 pt-4 border-t border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
              <span>05</span>
              <span>//</span>
              <span>CORE ENGINEERING CHALLENGES</span>
            </div>
            <span className="text-xs font-mono text-foreground/50">04 Deep Dives</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Difficult Technical Problems & Solutions
          </h2>

          <div className="space-y-6">
            {LINKFORGE_CHALLENGES.map((ch, idx) => (
              <article
                key={ch.number}
                className="rounded-xl border border-border/30 bg-card/40 dark:bg-custom-black/40 p-5 space-y-4 hover:border-border/60 transition-colors"
              >
                {/* Challenge Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-500 font-semibold">
                      CHALLENGE {ch.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-sans font-semibold text-foreground">
                      {ch.title}
                    </h3>
                  </div>
                </div>

                {/* Problem & Risk */}
                <div className="space-y-2 text-xs sm:text-sm font-display text-foreground/75 leading-relaxed">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                      The Challenge & Risk
                    </span>
                    <p>{ch.problemStatement}</p>
                    <p className="text-rose-500/90 dark:text-rose-400/90 text-xs mt-1">
                      <strong>Risk:</strong> {ch.risk}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                      The Approach
                    </span>
                    <p>{ch.approach}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/50 block mb-0.5">
                      The Result
                    </span>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {ch.result}
                    </p>
                  </div>
                </div>

                {/* Code Snippet if present */}
                {ch.codeSnippet && (
                  <div className="rounded-lg border border-border/30 bg-background overflow-hidden space-y-1 text-xs">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-muted/20 border-b border-border/20 font-mono text-[11px] text-foreground/60">
                      <div className="flex items-center gap-1.5">
                        <FileCode2 className="size-3 text-emerald-500" />
                        <span>{ch.codeSnippet.filename}</span>
                      </div>
                      <button
                        onClick={() =>
                          ch.codeSnippet &&
                          handleCopy(ch.codeSnippet.code, idx)
                        }
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Copy code snippet"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="size-3 text-emerald-500" />
                            <span className="text-[10px] text-emerald-500">
                              Copied
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 overflow-x-auto text-[11px] font-mono leading-relaxed text-foreground/90 bg-muted/10">
                      <code>{ch.codeSnippet.code}</code>
                    </pre>
                    <p className="px-3 pb-2 text-[11px] font-display text-foreground/50 italic">
                      {ch.codeSnippet.explanation}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 06 — Implementation Details */}
        <section id="implementation" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>06</span>
            <span>//</span>
            <span>CODE PRIMITIVES & SECURITY</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Security & Authentication Primitives
          </h2>
          <div className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed space-y-3">
            <p>
              Authentication state is persisted exclusively via HttpOnly, Secure,
              SameSite cookies with signed JWT payloads containing user and tenant
              identifiers.
            </p>
            <p>
              This prevents cross-site scripting (XSS) attacks from accessing session
              tokens in `localStorage`, while CSRF protection is enforced on all
              mutating REST endpoints via custom header validation.
            </p>
          </div>
        </section>

        {/* 07 — Data Flow Pipelines */}
        <section id="data-flow" className="space-y-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>07</span>
            <span>//</span>
            <span>DATA FLOW PIPELINES</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Asynchronous Click Ingestion Pipeline
          </h2>
          <p className="font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
            The redirect and telemetry lifecycle is split across fast and slow paths:
          </p>

          <div className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <span className="font-bold text-foreground">
                  Visitor clicks vanity link
                </span>
                <p className="font-display text-foreground/60 text-[11px]">
                  Request hits `/r/:slug` endpoint on Express API.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <span className="font-bold text-foreground">
                  Instant HTTP 302/307 Redirect dispatched
                </span>
                <p className="font-display text-foreground/60 text-[11px]">
                  Destination URL retrieved from cache/database; visitor redirected
                  immediately (&lt;5ms).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <span className="font-bold text-foreground">
                  Telemetry pushed to background worker
                </span>
                <p className="font-display text-foreground/60 text-[11px]">
                  Referrer, user agent, IP hash, and timestamp dispatched to Redis
                  queue without blocking client.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                4
              </span>
              <div>
                <span className="font-bold text-foreground">
                  Aggregation & Dashboard Updates
                </span>
                <p className="font-display text-foreground/60 text-[11px]">
                  Worker processes batches into hourly/daily summary tables in
                  PostgreSQL for instant dashboard queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — Technology Stack */}
        <section id="tech-stack" className="space-y-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>08</span>
            <span>//</span>
            <span>TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Architecture Stack
          </h2>

          <div className="space-y-3">
            {LINKFORGE_TECH_STACK.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-2 rounded-lg border border-border/20 bg-background/60 text-xs"
                    >
                      <span className="font-medium text-foreground block">
                        {tech.name}
                      </span>
                      {tech.description && (
                        <span className="text-[11px] font-display text-foreground/60">
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

        {/* 09 — Results */}
        <section id="results" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>09</span>
            <span>//</span>
            <span>RESULTS & OUTCOMES</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Verified Outcomes
          </h2>
          <div className="space-y-2.5 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
            <div className="p-3 rounded-lg border border-border/25 bg-card/30 space-y-1">
              <span className="font-mono text-xs font-semibold text-emerald-500">
                ✓ Reliable Multi-Tenant Partitioning
              </span>
              <p>
                Strict query scoping and session-bound tenant IDs eliminate the
                possibility of cross-account data leakage.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/25 bg-card/30 space-y-1">
              <span className="font-mono text-xs font-semibold text-emerald-500">
                ✓ Deterministic Slug Rename Safety
              </span>
              <p>
                Interactive transactions and unique constraint reservations handle
                concurrent vanity URL changes without conflict.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/25 bg-card/30 space-y-1">
              <span className="font-mono text-xs font-semibold text-emerald-500">
                ✓ 100% Fail-Fast Startup Validation
              </span>
              <p>
                Schema-enforced boot diagnostics guarantee zero silent mid-request
                crashes from unconfigured environment variables.
              </p>
            </div>
          </div>
        </section>

        {/* 10 — Lessons Learned */}
        <section id="lessons" className="space-y-3 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/50">
            <span>10</span>
            <span>//</span>
            <span>LESSONS LEARNED</span>
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground">
            Engineering Reflections
          </h2>
          <div className="space-y-3 font-display text-xs sm:text-sm text-foreground/75 leading-relaxed">
            <p>
              <strong className="text-foreground font-medium">
                1. Earn your abstractions:
              </strong>{" "}
              Implementing manual JWT cookies, bcrypt hashing, and raw SQL queries
              before introducing Better Auth and Prisma gave me deep clarity into
              session lifetimes, cookie flags, and database index costs.
            </p>
            <p>
              <strong className="text-foreground font-medium">
                2. Configuration errors should be startup errors:
              </strong>{" "}
              Validating the environment schema before launching HTTP listeners
              saves hours of production debugging and makes CI/CD deployments
              foolproof.
            </p>
            <p>
              <strong className="text-foreground font-medium">
                3. Protect the critical path:
              </strong>{" "}
              Separating high-frequency redirects from telemetry persistence is
              vital for maintaining snappy user experiences at scale.
            </p>
          </div>
        </section>

        {/* Bottom Navigation & Actions */}
        <footer className="pt-6 border-t border-border/20 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects/linkforge"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Linkforge Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={LINKFORGE_METADATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-all"
            >
              <Github />
              <span>Source Code</span>
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/30 bg-background hover:bg-muted/40 text-xs font-medium text-foreground transition-all"
            >
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </footer>
      </div>
    </MainLayout>
  )
}
