import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldAlert, Cpu, Terminal, FileText } from "lucide-react";

interface EngineeringItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  relatedProject: string;
  url: string;
  ctaText: string;
  severity?: "high" | "medium" | "low";
}

const FEATURED_INVESTIGATIONS: EngineeringItem[] = [
  {
    id: "node-db-latency",
    type: "Production Incident Report",
    title: "Node.js Server Warnings & Database Performance",
    description:
      "Investigating MaxListenersExceededWarning on ServerResponse, deprecated pg SSL modes, and multi-tier database query latency in LinkForge development.",
    date: "April 2026",
    readingTime: "8 min read",
    relatedProject: "LinkForge · PostgreSQL",
    url: "/postmortems/nodejs-server-warnings-and-database-performance-investigation",
    ctaText: "Read Postmortem",
    severity: "medium",
  },
  {
    id: "oauth-mismatch",
    type: "Security & Incident Postmortem",
    title: "OAuth State Mismatch & Session Reliability",
    description:
      "Diagnosis and remediation of cross-origin OAuth verification rejections, cookie scoping boundaries, and dual-origin handshakes across Next.js and Express.",
    date: "March 2026",
    readingTime: "6 min read",
    relatedProject: "LinkForge · Express Auth",
    url: "/postmortems/authentication-oauth-state-mismatch",
    ctaText: "Read Postmortem",
    severity: "high",
  },
  {
    id: "concurrency-buy-twice",
    type: "Concurrency & Architecture",
    title: "What Happens When You Click Buy Twice?",
    description:
      "A deep dive into race condition windows, idempotency keys, database isolation levels, and transactional rollbacks under high concurrent traffic.",
    date: "August 2026",
    readingTime: "12 min read",
    relatedProject: "Distributed Systems · Redis",
    url: "/blog/what-happens-when-you-click-buy-twice",
    ctaText: "Read Deep Dive",
  },
];

export default function EngineeringSection() {
  return (
    <section
      id="engineering"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8 scroll-mt-16"
      aria-label="Engineering and Investigations"
    >
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground font-sans text-xl font-semibold tracking-tight">
            Engineering Behind the Projects
          </h2>
          <p className="text-muted-foreground font-display mt-0.5 text-xs">
            I don&apos;t just ship the happy path. I investigate what happens when systems fail.
          </p>
        </div>

        <Link
          href="/postmortems"
          className="font-mono text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          <span>All Postmortems</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {FEATURED_INVESTIGATIONS.map((item) => (
          <article
            key={item.id}
            className="group rounded-xl border border-border/40 bg-card/30 p-4 transition-all duration-200 hover:border-border/80 hover:bg-card/60 hover:-translate-y-0.5 hover:shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                  {item.type}
                </span>
                {item.severity && (
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.2 rounded border ${
                      item.severity === "high"
                        ? "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10"
                        : "border-border/60 text-muted-foreground bg-muted/30"
                    }`}
                  >
                    {item.severity.toUpperCase()}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {item.date} · {item.readingTime}
              </span>
            </div>

            <Link href={item.url} className="group/title block">
              <h3 className="font-sans text-base font-semibold tracking-tight text-foreground group-hover/title:underline inline-flex items-center gap-1">
                <span>{item.title}</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
              </h3>
            </Link>

            <p className="font-display text-xs text-foreground/80 mt-1.5 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] text-muted-foreground">
                Domain: <span className="text-foreground/90 font-medium">{item.relatedProject}</span>
              </span>
              <Link
                href={item.url}
                className="font-mono text-[11px] text-muted-foreground hover:text-foreground font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>{item.ctaText}</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
