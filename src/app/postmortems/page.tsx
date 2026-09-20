import type { Metadata } from "next"
import MainLayout from "@/components/main-layout"
import { getAllPostmortems } from "@/lib/postmortems/loader"
import { PostmortemFilter } from "@/components/postmortems/postmortem-filter"
import { siteConfig } from "@/lib/blog/site"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { ShieldCheck, Flame, Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Engineering Postmortems",
  description:
    "Real-world production incident retrospectives, root cause analyses, system failure investigations, and architectural lessons learned.",
  alternates: {
    canonical: "/postmortems",
  },
  openGraph: {
    title: "Engineering Postmortems | Production Incident Reports",
    description:
      "Real-world production incident retrospectives, root cause analyses, and architectural lessons.",
    url: "/postmortems",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Engineering Postmortems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Postmortems",
    description:
      "Real-world production incident retrospectives, root cause analyses, and architectural lessons.",
    images: [siteConfig.ogImage],
  },
}

export default function PostmortemsPage() {
  const postmortems = getAllPostmortems()

  // Calculate high-level summary metrics
  const totalIncidents = postmortems.length
  const resolvedCount = postmortems.filter(
    (p) => p.metadata.status === "resolved",
  ).length
  const uniqueCategories = new Set(
    postmortems.map((p) => p.metadata.category),
  ).size

  return (
    <MainLayout>
      <main className="mx-auto max-w-2xl px-4 py-6 pb-12">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500 inline-block" />
            Reliability & Incident Archive
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Engineering Postmortems
          </h1>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Detailed retrospectives of real production incidents, architectural
            failures, root cause diagnoses, and the engineering controls
            instituted to prevent recurrence.
          </p>

          {/* Incident Stats Bar */}
          <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border bg-card/60 p-3 sm:p-4 text-center">
            <div className="border-r border-border/60 pr-2">
              <span className="flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
                <Flame className="size-3.5 text-rose-500" aria-hidden="true" />
                Documented
              </span>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">
                {totalIncidents}
              </p>
            </div>

            <div className="border-r border-border/60 px-2">
              <span className="flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
                <ShieldCheck
                  className="size-3.5 text-emerald-500"
                  aria-hidden="true"
                />
                Resolved
              </span>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">
                {resolvedCount}
              </p>
            </div>

            <div className="pl-2">
              <span className="flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
                <Layers
                  className="size-3.5 text-blue-500"
                  aria-hidden="true"
                />
                Domains
              </span>
              <p className="mt-1 font-mono text-lg font-bold text-foreground">
                {uniqueCategories}
              </p>
            </div>
          </div>
        </header>

        <PostmortemFilter postmortems={postmortems} />
      </main>

      <ProgressiveBlur height="4rem" position="bottom" />
    </MainLayout>
  )
}
