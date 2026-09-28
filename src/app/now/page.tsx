import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import MainLayout from "@/components/main-layout";
import { siteConfig } from "@/lib/blog/site";

export const metadata: Metadata = {
  title: "Now — What I'm Focused On | Vishal Gupta",
  description:
    "Current engineering focus, active systems being built, architectural investigations, and books being read by Vishal Gupta.",
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "Now — What I'm Focused On | Vishal Gupta",
    description: "Current engineering focus, active systems, investigations, and learning.",
    url: `${siteConfig.url}/now`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
};

export default function NowPage() {
  return (
    <MainLayout>
      <main className="mx-auto max-w-2xl px-4 py-8 pb-16">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between border-b border-border/30 pb-4 font-mono text-xs">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="size-3" />
            <span>Updated September 2026</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/20 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>Current Status &amp; Trajectory</span>
          </div>

          <h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I&apos;m Doing Now
          </h1>
          <p className="font-display text-sm leading-relaxed text-muted-foreground">
            A public log of active projects, technical deep dives, system design research, and current availability. Inspired by Derek Sivers&apos; /now page movement.
          </p>
        </header>

        <div className="space-y-8">
          {/* Building */}
          <section className="space-y-3 rounded-xl border border-border/40 bg-card/30 p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Building &amp; Hardening
              </span>
            </div>
            <ul className="space-y-3 font-display text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <li className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link href="/projects/linkforge" className="font-sans font-semibold text-foreground hover:underline inline-flex items-center gap-1">
                    <span>Linkforge</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </Link>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border/50 bg-muted/20 px-1.5 py-0.2 rounded">
                    Testing Phase
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Completing end-to-end load tests on multi-tenant partition boundaries, hardening transactional username migrations, and profiling clickstream event queue throughput.
                </p>
              </li>

              <li className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link href="/projects/infinity" className="font-sans font-semibold text-foreground hover:underline inline-flex items-center gap-1">
                    <span>Infinity</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </Link>
                  <span className="font-mono text-[10px] text-muted-foreground border border-border/50 bg-muted/20 px-1.5 py-0.2 rounded">
                    In Development
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Optimizing 10-second debounced state normalization routines between Excalidraw canvas instances and Neon Serverless PostgreSQL using Drizzle ORM.
                </p>
              </li>
            </ul>
          </section>

          {/* Investigating */}
          <section className="space-y-3 rounded-xl border border-border/40 bg-card/30 p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Investigating &amp; Debugging
              </span>
            </div>
            <ul className="space-y-2 font-display text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <li>
                <strong className="text-foreground">Event loop diagnostics:</strong> Deep-diving into Node.js ServerResponse listener lifecycles and tracking down intermittent memory warnings under load.
              </li>
              <li>
                <strong className="text-foreground">Database latency under contention:</strong> Profiling query execution plans and connection pool behavior on serverless PostgreSQL endpoints.
              </li>
            </ul>
          </section>

          {/* Exploring & Learning */}
          <section className="space-y-3 rounded-xl border border-border/40 bg-card/30 p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                Exploring &amp; Reading
              </span>
            </div>
            <div className="space-y-2 font-display text-xs sm:text-sm text-foreground/90 leading-relaxed">
              <p>
                Reading papers on consensus mechanisms, transaction isolation anomalies (dirty reads, non-repeatable reads, serialization conflicts), and real-time collaborative state engines.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-muted-foreground">
                <span className="rounded border border-border/50 bg-muted/20 px-2 py-0.5">Distributed Transactions</span>
                <span className="rounded border border-border/50 bg-muted/20 px-2 py-0.5">Idempotency &amp; Retries</span>
                <span className="rounded border border-border/50 bg-muted/20 px-2 py-0.5">Neon Serverless Storage</span>
              </div>
            </div>
          </section>

          {/* Current Availability */}
          <section className="space-y-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Current Availability
              </span>
            </div>
            <p className="font-display text-xs sm:text-sm leading-relaxed text-foreground/90">
              Open for full-time backend and systems engineering roles, distributed architecture design, and technical consulting.
            </p>
            <div className="pt-1">
              <Link
                href="/#contact?intent=hiring"
                className="inline-flex items-center gap-1 font-mono text-xs text-foreground font-semibold hover:underline"
              >
                <span>Initiate direct conversation</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
