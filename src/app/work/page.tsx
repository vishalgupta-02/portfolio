import MainLayout from "@/components/main-layout"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import WorkExperienceItem from "@/components/work/work-experience-item"
import WorkStatsHeader from "@/components/work/work-stats-header"
import { siteConfig } from "@/lib/blog/site"
import { WORK_EXPERIENCES } from "@/lib/experience"
import { ArrowUpRight, Mail } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Work Experience | Vishal Gupta",
  description:
    "Engineering track record and production roles spanning full-stack web platforms, real-time voice AI pipelines, and distributed data systems.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work Experience | Vishal Gupta",
    description:
      "Engineering roles, platform contributions, and production systems built for real-world client workloads and real-time AI architectures.",
    url: `${siteConfig.url}/work`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Work Experience — Vishal Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience | Vishal Gupta",
    description:
      "Engineering roles, platform contributions, and production systems built for real-world client workloads and real-time AI architectures.",
    images: [siteConfig.ogImage],
  },
}

export default function WorkPage() {
  return (
    <MainLayout>
      <main className='mx-auto max-w-2xl px-4 py-6 pb-16'>
        {/* Header Section */}
        <header className='mb-8'>
          <div className='text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs tracking-wider uppercase'>
            <span className='inline-block size-2 rounded-full bg-emerald-500 animate-pulse' />
            Career & Production History
          </div>

          <h1 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl font-sans'>
            Work Experience
          </h1>

          <p className='text-muted-foreground mt-2 text-sm leading-relaxed font-display'>
            Engineering roles, production platform contributions, and scalable
            systems delivered across enterprise client engagements and high-throughput
            real-time AI architectures.
          </p>

          <WorkStatsHeader
            totalRoles={WORK_EXPERIENCES.length}
            clientDeliveries={3}
            domainsCount={3}
          />
        </header>

        {/* Experience List */}
        <section
          aria-label='Employment history'
          className='flex flex-col gap-6'
        >
          {WORK_EXPERIENCES.map((experience, index) => (
            <WorkExperienceItem
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </section>

        {/* Collaborative Callout Banner */}
        <section className='mt-10 rounded-2xl border border-border/40 bg-card/20 p-5 text-center sm:p-6 transition-all duration-200 hover:border-border/70 hover:bg-card/40'>
          <h2 className='text-base font-semibold text-foreground font-sans'>
            Have an engineering challenge or opportunity?
          </h2>
          <p className='text-xs sm:text-sm text-muted-foreground mt-1.5 font-display max-w-md mx-auto'>
            I specialize in full-stack architecture, high-performance backends,
            and real-time systems. Let&apos;s build something impactful.
          </p>
          <div className='mt-4 flex flex-wrap items-center justify-center gap-3'>
            <a
              href='mailto:abhimanyug987@gmail.com'
              className='inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-1.5 text-xs font-medium hover:opacity-90 active:scale-95 transition-all shadow-xs'
            >
              <Mail className='size-3.5' />
              <span>Get in Touch</span>
            </a>
            <Link
              href='/postmortems'
              className='inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 active:scale-95 transition-all'
            >
              <span>Read Postmortems</span>
              <ArrowUpRight className='size-3 text-muted-foreground' />
            </Link>
          </div>
        </section>
      </main>

      <ProgressiveBlur height='4rem' position='bottom' />
    </MainLayout>
  )
}
