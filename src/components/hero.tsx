import Image from "next/image";
import Link from "next/link";
import CurrentlyPlaying from "./song-exp";
import { Socials } from "./socials";
import RandomInterestingButton from "./random-interesting-button";

export default function Hero() {
  return (
    <section className="border-border/40 flex w-full flex-col gap-7 border-b px-4 py-8">
      <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="group border-border/50 bg-muted/20 ring-border/30 hover:ring-border relative size-20 shrink-0 overflow-hidden rounded-xl border shadow-xs ring-1 transition-all duration-300 hover:shadow-md sm:size-22">
            <Image
              src="/static/vishal-gupta.webp"
              alt="Vishal Gupta"
              width={250}
              height={250}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-foreground font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                Vishal Gupta
              </h1>
            </div>
            <p className="text-muted-foreground font-mono text-xs font-normal sm:text-sm">
              Backend & Systems Engineer
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span
                title="Open to high-impact distributed systems and backend engineering opportunities"
                className="inline-flex cursor-default items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-0.5 font-mono text-[10px] text-emerald-600 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 dark:text-emerald-400/90"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Available for Roles
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <p className="font-display text-foreground/90 text-base leading-snug font-medium sm:text-lg">
          I build backend systems that stay reliable when things get
          complicated.
        </p>
        <p className="font-display text-muted-foreground text-xs leading-relaxed sm:text-sm">
          Backend & systems engineer focused on distributed systems, databases,
          concurrency, performance, and observability.
        </p>

        {/* Interactive Technical Concepts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Link
            href="/#projects"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="View distributed systems projects"
          >
            <span>Distributed Systems</span>
          </Link>
          <Link
            href="/#tech-stack"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Inspect relational database architectures"
          >
            <span>Databases</span>
          </Link>
          <Link
            href="/blog/what-happens-when-you-click-buy-twice"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Read deep dive on concurrency and idempotency"
          >
            <span>Concurrency</span>
            <span className="text-muted-foreground/60">↗</span>
          </Link>
          <Link
            href="/postmortems/nodejs-server-warnings-and-database-performance-investigation"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Read Node.js & Database latency investigation"
          >
            <span>Performance</span>
            <span className="text-muted-foreground/60">↗</span>
          </Link>
          <Link
            href="/#engineering"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Jump to engineering postmortems"
          >
            <span>Observability</span>
          </Link>
          <Link
            href="/postmortems"
            className="border-border/50 bg-muted/20 hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="View production incident retrospectives"
          >
            <span>Failure Analysis</span>
            <span className="text-muted-foreground/60">↗</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <RandomInterestingButton />
          <Socials />
        </div>

        <div>
          <CurrentlyPlaying />
        </div>
      </div>
    </section>
  );
}
