import { BlogCard } from "./blog-card"
import {
  getAllTags,
  getPaginatedPosts,
  getSearchablePosts,
} from "@/lib/blog/blog"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { BlogSearch } from "@/components/blog/blog-search"
import { MoveToTop } from "@/components/blog/move-to-top"

import type { Metadata } from "next"
import { siteConfig } from "@/lib/blog/site"
import { Suspense } from "react"
import MainLayout from "@/components/main-layout"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles about software engineering, Next.js, TypeScript, MongoDB, Redis, backend architecture, and system design.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog",
    description: "Articles about software engineering.",
    url: "/blog",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Articles about software engineering.",
    images: [siteConfig.ogImage],
  },
}

export default async function BlogPage() {
  const { posts, pagination } = getPaginatedPosts(1)

  const tags = getAllTags()

  const searchablePosts = getSearchablePosts()

  return (
    <MainLayout>
      <main className='mx-auto max-w-2xl py-4 px-4 pb-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>2 AM thoughts</h1>

          <p className='mt-2 text-sm text-muted-foreground'>
            When & where thoughts don&apos;t need permissions
          </p>
        </header>

        <Suspense
          fallback={
            <div className='space-y-8'>
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          }>
          <BlogSearch posts={searchablePosts} tags={tags}>
            <>
              <div className='space-y-8'>
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              <BlogPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}
              />
            </>
          </BlogSearch>
        </Suspense>

        <MoveToTop />
      </main>

      <ProgressiveBlur height='4rem' position='bottom' />
    </MainLayout>
  )
}
