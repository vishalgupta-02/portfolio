import { BlogCard } from "@/components/blog/blog-card"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogSearch } from "@/components/blog/blog-search"
import { MoveToTop } from "@/components/blog/move-to-top"
import MainLayout from "@/components/main-layout"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import {
  getAllPosts,
  getAllTags,
  getPaginatedPosts,
  getSearchablePosts,
} from "@/lib/blog/blog"
import { siteConfig } from "@/lib/blog/site"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Blog — Engineering Notes & Deep Dives",
  description:
    "Technical articles and deep dives about software engineering, Next.js, TypeScript, database internals, distributed systems, and real-time backend architecture.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Engineering Notes & Deep Dives",
    description:
      "Technical articles about software engineering, system design, and production architectures.",
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Blog — Vishal Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Engineering Notes & Deep Dives",
    description:
      "Technical articles about software engineering, system design, and production architectures.",
    images: [siteConfig.ogImage],
  },
}

export default async function BlogPage() {
  const allPosts = getAllPosts()
  const { posts, pagination } = getPaginatedPosts(1)
  const tags = getAllTags()
  const searchablePosts = getSearchablePosts()

  const totalArticles = allPosts.length
  const dualViewCount = allPosts.filter((p) => p.hasDeveloperView).length
  const totalTopics = tags.length

  return (
    <MainLayout>
      <main className='mx-auto max-w-2xl py-6 px-4 pb-16'>
        <BlogHeader
          totalArticles={totalArticles}
          dualViewCount={dualViewCount}
          totalTopics={totalTopics}
        />

        <Suspense
          fallback={
            <div className='flex flex-col gap-4'>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          }
        >
          <BlogSearch posts={searchablePosts} tags={tags}>
            <div className='flex flex-col gap-4'>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}

              <div className='pt-4'>
                <BlogPagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  hasPreviousPage={pagination.hasPreviousPage}
                  hasNextPage={pagination.hasNextPage}
                />
              </div>
            </div>
          </BlogSearch>
        </Suspense>

        <MoveToTop />
      </main>

      <ProgressiveBlur height='4rem' position='bottom' />
    </MainLayout>
  )
}
