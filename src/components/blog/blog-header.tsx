import { BlogStatsHeader } from "./blog-stats-header"

interface BlogHeaderProps {
  totalArticles: number
  dualViewCount: number
  totalTopics: number
  pageTitle?: string
  subtitle?: string
}

export function BlogHeader({
  totalArticles,
  dualViewCount,
  totalTopics,
  pageTitle = "Engineering Notes & Deep Dives",
  subtitle = "In-depth explorations of full-stack engineering, systems architecture, distributed backend patterns, and practical lessons from production systems.",
}: BlogHeaderProps) {
  return (
    <header className='mb-8'>
      <div className='text-muted-foreground mb-2 flex items-center gap-2 font-mono text-xs tracking-wider uppercase'>
        <span className='inline-block size-2 rounded-full bg-emerald-500 animate-pulse' />
        Technical Writing & System Guides
      </div>

      <h1 className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl font-sans'>
        {pageTitle}
      </h1>

      <p className='text-muted-foreground mt-2 text-sm leading-relaxed font-display'>
        {subtitle}
      </p>

      <BlogStatsHeader
        totalArticles={totalArticles}
        dualViewCount={dualViewCount}
        totalTopics={totalTopics}
      />
    </header>
  )
}
