// import Link from "next/link";

// import type { RelatedArticle } from "@/lib/blog/types";

// import { BlogTag } from "./blog-tag";

// interface RelatedArticlesProps {
//   articles: RelatedArticle[];
// }

// export function RelatedArticles({ articles }: RelatedArticlesProps) {
//   if (articles.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       aria-labelledby="related-articles-heading"
//       className="mt-16 border-t pt-8"
//     >
//       <h2
//         id="related-articles-heading"
//         className="text-2xl font-semibold tracking-tight"
//       >
//         Related articles
//       </h2>

//       <div className="mt-6 grid gap-4 sm:grid-cols-2">
//         {articles.map((article) => (
//           <article key={article.slug} className="rounded-xl border p-5">
//             <Link href={`/blog/${article.slug}`} className="group">
//               <h3 className="font-semibold group-hover:underline">
//                 {article.title}
//               </h3>

//               <p className="mt-2 text-sm text-muted-foreground">
//                 {article.description}
//               </p>
//             </Link>

//             <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
//               <time dateTime={article.publishedAt}>
//                 {new Date(article.publishedAt).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </time>

//               <span aria-hidden="true">·</span>

//               <span>{article.readingTime.minutes} min read</span>
//             </div>

//             {article.tags.length > 0 && (
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {article.tags.map((tag) => (
//                   <BlogTag key={tag} tag={tag} />
//                 ))}
//               </div>
//             )}
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// ------------------------------ Experiment area --------------------------------

import Link from "next/link"

import type { RelatedArticle } from "@/lib/blog/types"

import { BlogTag } from "./blog-tag"
import { ArrowRight } from "lucide-react"

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby='related-articles-heading'
      className='mt-8 border-t pt-8'>
      <h2
        id='related-articles-heading'
        className='text-2xl font-semibold tracking-tight'>
        Related articles
      </h2>

      <div className='w-full mt-4 flex gap-4 flex-col'>
        {articles.map((article) => (
          <article
            key={article.slug}
            className='flex justify-between items-center gap-3 group'>
            <div className='space-y-1.5 min-w-0 flex-1'>
              <Link href={`/blog/${article.slug}`}>
                <h3 className='font-semibold group-hover:underline text-sm sm:text-base truncate sm:overflow-visible'>
                  {article.title}
                </h3>

                <p className='mt-0.5 text-xs sm:text-sm text-muted-foreground truncate max-w-lg'>
                  {article.description}
                </p>
              </Link>

              <div className='mt-1 flex items-center gap-2 text-xs text-muted-foreground'>
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>

                <span aria-hidden='true'>·</span>

                <span>{article.readingTime.minutes} min read</span>
              </div>
            </div>
            <ArrowRight className='opacity-0 group-hover:opacity-100 size-4 sm:size-5 shrink-0 transition-opacity' />
          </article>
        ))}
      </div>
    </section>
  )
}
