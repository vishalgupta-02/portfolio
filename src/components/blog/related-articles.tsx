import Link from "next/link"
import { ArrowUpRight, BookOpen, Clock } from "lucide-react"
import type { RelatedArticle } from "@/lib/blog/types"

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <aside
      aria-labelledby='related-articles-heading'
      className='my-10 border-t border-border/50 pt-8'
    >
      <div className='flex items-center gap-2 mb-4'>
        <BookOpen className='size-4 text-emerald-500' aria-hidden='true' />
        <h2
          id='related-articles-heading'
          className='font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground'
        >
          Related Architectural Guides
        </h2>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {articles.map((article) => {
          const primaryTag = article.tags[0] || "Architecture"

          return (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className='group flex flex-col justify-between rounded-xl border border-border/40 bg-card/30 p-4 transition-all duration-200 hover:border-border/80 hover:bg-card/60 hover:shadow-xs'
            >
              <div>
                <div className='flex items-center justify-between gap-2 mb-2'>
                  <span className='rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
                    {primaryTag}
                  </span>

                  <span className='inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground'>
                    <Clock className='size-2.5' aria-hidden='true' />
                    {article.readingTime.minutes} min
                  </span>
                </div>

                <h3 className='text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1'>
                  {article.title}
                </h3>

                <p className='mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed font-display'>
                  {article.description}
                </p>
              </div>

              <div className='mt-4 flex items-center justify-between border-t border-border/30 pt-2 text-xs'>
                <time
                  dateTime={article.publishedAt}
                  className='font-mono text-[10px] text-muted-foreground'
                >
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>

                <span className='inline-flex items-center gap-0.5 font-mono text-[11px] font-medium text-foreground transition-transform group-hover:translate-x-0.5'>
                  Read
                  <ArrowUpRight className='size-3 text-muted-foreground group-hover:text-primary' aria-hidden='true' />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
