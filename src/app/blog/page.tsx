import BlurFade from "@/components/magicui/blur-fade"
import { allPosts } from "content-collections"
import Link from "next/link"
import type { Metadata } from "next"
import { paginate, normalizePage } from "@/lib/pagination"
import { ChevronRight } from "lucide-react"
import { DATA } from "@/data/resume"

export const metadata: Metadata = {
  title: "2AM | Tech Blog",
  description:
    "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
  keywords: [
    "tech blog",
    "software engineering",
    "Linux",
    "web development",
    "programming",
    "tutorial",
    "developer blog",
    "coding",
  ],
  openGraph: {
    title: "2AM | Tech Blog",
    description:
      "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
    type: "website",
    url: `${DATA.url}/blog`,
    images: [
      {
        url: `${DATA.url}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "2AM Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2AM | Tech Blog",
    description:
      "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
    images: [`${DATA.url}/og-blog.jpg`],
  },
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
}

const PAGE_SIZE = 5
const BLUR_FADE_DELAY = 0.04

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams

  const posts = allPosts
  const sortedPosts = [...posts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE)
  const currentPage = normalizePage(pageParam, totalPages)
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  })

  return (
    <section id='blog'>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className='text-2xl font-semibold tracking-tight mb-2'>
          2AM{" "}
          <span className='ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm'>
            {sortedPosts.length} posts
          </span>
        </h1>
        <p className='text-sm text-muted-foreground mb-8'>
          Where thoughts don&apos;t need permission.
        </p>
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className='flex flex-col gap-5'>
              {paginatedPosts.map((post, id) => {
                const slug = post._meta.path.replace(/\.mdx$/, "")
                const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                    <Link
                      className='flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                      href={`/blog/${slug}`}>
                      <span className='text-xs font-mono tabular-nums font-medium mt-1.25'>
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className='flex flex-col gap-y-2 flex-1'>
                        <p className='tracking-tight text-lg font-medium'>
                          <span className='group-hover:text-foreground transition-colors'>
                            {post.title}
                            <ChevronRight
                              className='ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {post.publishedAt}
                        </p>
                      </div>
                    </Link>
                  </BlurFade>
                )
              })}
            </div>
          </BlurFade>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className='flex gap-3 flex-row items-center justify-between mt-8'>
                <div className='text-sm text-muted-foreground'>
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <div className='flex gap-2 sm:justify-end'>
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className='h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                      Previous
                    </Link>
                  ) : (
                    <span className='h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed'>
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className='h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                      Next
                    </Link>
                  ) : (
                    <span className='h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed'>
                      Next
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className='flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl'>
            <p className='text-muted-foreground text-center'>
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  )
}

// ("use client")

// import BlurFade from "@/components/magicui/blur-fade"
// import { allPosts } from "content-collections"
// import Link from "next/link"
// import { ChevronRight } from "lucide-react"
// import { DATA } from "@/data/resume"
// import { useState, useMemo } from "react"

// // ================================
// // 🎨 ADD MORE CATEGORIES HERE ⬇️
// // ================================
// const CATEGORY_COLORS: Record<
//   string,
//   { bg: string; text: string; border: string }
// > = {
//   AI: {
//     bg: "bg-slate-500/5",
//     text: "text-slate-700 dark:text-slate-300",
//     border: "border-slate-200 dark:border-slate-700",
//   },
//   Linux: {
//     bg: "bg-slate-500/5",
//     text: "text-slate-700 dark:text-slate-300",
//     border: "border-slate-200 dark:border-slate-700",
//   },
//   // ADD NEW CATEGORIES BELOW:
//   // "Web Development": {
//   //   bg: "bg-slate-500/5",
//   //   text: "text-slate-700 dark:text-slate-300",
//   //   border: "border-slate-200 dark:border-slate-700",
//   // },
// }
// // ================================

// function getCategoryColor(category: string) {
//   return (
//     CATEGORY_COLORS[category] || {
//       bg: "bg-gray-500/10",
//       text: "text-gray-700 dark:text-gray-400",
//       border: "border-gray-200 dark:border-gray-800",
//     }
//   )
// }

// // Helper function to group posts by category
// function groupPostsByCategory(posts: typeof allPosts) {
//   return posts.reduce(
//     (acc, post) => {
//       const category = post.category || "Uncategorized"
//       if (!acc[category]) {
//         acc[category] = []
//       }
//       acc[category].push(post)
//       return acc
//     },
//     {} as Record<string, typeof allPosts>,
//   )
// }

// const BLUR_FADE_DELAY = 0.04

// export default function BlogPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   const posts = allPosts
//   const sortedPosts = useMemo(
//     () =>
//       [...posts].sort((a, b) => {
//         if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
//           return -1
//         }
//         return 1
//       }),
//     [],
//   )

//   // Group posts by category and sort categories alphabetically
//   const postsByCategory = useMemo(
//     () => groupPostsByCategory(sortedPosts),
//     [sortedPosts],
//   )
//   const sortedCategories = useMemo(
//     () => Object.keys(postsByCategory).sort(),
//     [postsByCategory],
//   )

//   // Filter posts based on selected category
//   const filteredPosts = useMemo(() => {
//     if (!selectedCategory) {
//       return sortedPosts
//     }
//     return sortedPosts.filter((post) => post.category === selectedCategory)
//   }, [selectedCategory, sortedPosts])

//   const filteredPostsByCategory = useMemo(() => {
//     if (!selectedCategory) {
//       return postsByCategory
//     }
//     return {
//       [selectedCategory]: postsByCategory[selectedCategory],
//     }
//   }, [selectedCategory, postsByCategory])

//   const displayCategories = selectedCategory
//     ? [selectedCategory]
//     : sortedCategories

//   return (
//     <section id='blog'>
//       <BlurFade delay={BLUR_FADE_DELAY}>
//         <h1 className='text-2xl font-semibold tracking-tight mb-2'>
//           2AM{" "}
//           <span className='ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm'>
//             {filteredPosts.length} posts
//           </span>
//         </h1>
//         <p className='text-sm text-muted-foreground mb-8'>
//           Where thoughts don&apos;t need permission.
//         </p>
//       </BlurFade>

//       {/* Category Filter Buttons */}
//       <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
//         <div className='flex flex-wrap gap-2 mb-8'>
//           <button
//             onClick={() => setSelectedCategory(null)}
//             className={`px-4 py-2 rounded-lg border transition-all ${
//               selectedCategory === null
//                 ? "bg-foreground text-background border-foreground"
//                 : "border-border hover:border-foreground/50 hover:bg-accent/50"
//             }`}>
//             All Posts
//           </button>
//           {sortedCategories.map((category) => {
//             const colors = getCategoryColor(category)
//             const isSelected = selectedCategory === category
//             return (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-4 py-2 rounded-lg border transition-all font-medium ${
//                   isSelected
//                     ? `${colors.bg} ${colors.text} ${colors.border} border-2`
//                     : `${colors.border} hover:${colors.bg}`
//                 }`}>
//                 {category} ({postsByCategory[category].length})
//               </button>
//             )
//           })}
//         </div>
//       </BlurFade>

//       {filteredPosts.length > 0 ? (
//         <div className='flex flex-col gap-10'>
//           {displayCategories.map((category, categoryIndex) => {
//             const categoryPosts = filteredPostsByCategory[category]
//             const colors = getCategoryColor(category)
//             return (
//               <div key={category}>
//                 {/* Category Header with Styled Badge */}
//                 {!selectedCategory && (
//                   <BlurFade delay={BLUR_FADE_DELAY * 1.5 + categoryIndex * 0.1}>
//                     <div className='flex items-center gap-3 mb-4'>
//                       <h2 className='text-lg font-semibold tracking-tight text-foreground'>
//                         {category}
//                       </h2>
//                       <span
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
//                         {categoryPosts.length}
//                       </span>
//                     </div>
//                   </BlurFade>
//                 )}

//                 {/* Posts in Category */}
//                 <BlurFade delay={BLUR_FADE_DELAY * 2 + categoryIndex * 0.1}>
//                   <div className='flex flex-col gap-5'>
//                     {categoryPosts.map((post, postIndex) => {
//                       const slug = post._meta.path.replace(/\.mdx$/, "")
//                       const colors = getCategoryColor(post.category)
//                       const uniqueKey = `${category}-${slug}`
//                       return (
//                         <BlurFade
//                           delay={
//                             BLUR_FADE_DELAY * 2.5 +
//                             categoryIndex * 0.1 +
//                             postIndex * 0.05
//                           }
//                           key={uniqueKey}>
//                           <Link
//                             className='flex items-start gap-x-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-3 rounded-lg hover:bg-accent/50 transition-colors'
//                             href={`/blog/${slug}`}>
//                             <div
//                               className={`px-2 py-1 rounded text-xs font-semibold mt-1 whitespace-nowrap border ${colors.bg} ${colors.text} ${colors.border}`}>
//                               {post.category}
//                             </div>
//                             <div className='flex flex-col gap-y-2 flex-1'>
//                               <p className='tracking-tight text-lg font-medium'>
//                                 <span className='group-hover:text-foreground transition-colors'>
//                                   {post.title}
//                                   <ChevronRight
//                                     className='ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'
//                                     aria-hidden
//                                   />
//                                 </span>
//                               </p>
//                               <p className='text-xs text-muted-foreground'>
//                                 {post.publishedAt}
//                               </p>
//                             </div>
//                           </Link>
//                         </BlurFade>
//                       )
//                     })}
//                   </div>
//                 </BlurFade>
//               </div>
//             )
//           })}
//         </div>
//       ) : (
//         <BlurFade delay={BLUR_FADE_DELAY * 2}>
//           <div className='flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl'>
//             <p className='text-muted-foreground text-center'>
//               {selectedCategory
//                 ? `No posts in "${selectedCategory}" category yet.`
//                 : "No blog posts yet. Check back soon!"}
//             </p>
//           </div>
//         </BlurFade>
//       )}
//     </section>
//   )
// }
