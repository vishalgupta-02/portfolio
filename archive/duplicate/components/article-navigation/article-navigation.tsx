import Link from "next/link"

import type { ArticleNavigation as ArticleNavigationType } from "@/lib/blog/types"

interface ArticleNavigationProps {
  navigation: ArticleNavigationType
}
export function ArticleNavigation({ navigation }: ArticleNavigationProps) {
  const { previous, next } = navigation

  if (!previous && !next) {
    return null
  }

  return (
    <nav
      aria-label='Article navigation'
      className='
          mt-16
          grid gap-4
          border-t pt-8
          sm:grid-cols-2
        '>
      {previous && (
        <Link
          href={`/blog/${previous.slug}`}
          className='
              group block
              rounded-xl border p-5
              transition-colors
              hover:bg-muted/50
            '>
          <span className='text-sm text-muted-foreground'>← Previous</span>

          <p className='mt-2 font-semibold group-hover:underline'>
            {previous.title}
          </p>

          {/* <p className='mt-2 text-sm text-muted-foreground'>
            {previous.description}
          </p> */}
        </Link>
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className={`
              group block
              rounded-xl border p-5
              transition-colors
              hover:bg-muted/50
              sm:text-right
              ${!previous ? "sm:col-start-2" : ""}
            `}>
          <span className='text-sm text-muted-foreground'>Next →</span>

          <p className='mt-2 font-semibold group-hover:underline'>
            {next.title}
          </p>

          {/* <p className='mt-2 text-sm text-muted-foreground'>
            {next.description}
          </p> */}
        </Link>
      )}
    </nav>
  )
}
