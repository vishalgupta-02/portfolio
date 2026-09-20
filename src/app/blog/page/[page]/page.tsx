import { BlogCard } from "@/components/blog/blog-card"
import { BlogHeader } from "@/components/blog/blog-header"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { MoveToTop } from "@/components/blog/move-to-top"
import MainLayout from "@/components/main-layout"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import {
  getAllPosts,
  getAllTags,
  getPaginatedPosts,
  POSTS_PER_PAGE,
} from "@/lib/blog/blog"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

interface BlogPaginationPageProps {
  params: Promise<{
    page: string
  }>
}

export function generateStaticParams() {
  const totalPosts = getAllPosts().length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return Array.from(
    {
      length: Math.max(0, totalPages - 1),
    },
    (_, index) => ({
      page: String(index + 2),
    }),
  )
}

export async function generateMetadata({
  params,
}: BlogPaginationPageProps): Promise<Metadata> {
  const { page } = await params
  const pageNumber = Number(page)

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return {}
  }

  return {
    title: `Blog — Page ${pageNumber} | Engineering Notes`,
    description: `Browse page ${pageNumber} of software engineering articles and deep dives.`,
    alternates: {
      canonical: `/blog/page/${pageNumber}`,
    },
  }
}

export default async function BlogPaginationPage({
  params,
}: BlogPaginationPageProps) {
  const { page } = await params
  const pageNumber = Number(page)

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    notFound()
  }

  if (pageNumber === 1) {
    redirect("/blog")
  }

  const allPosts = getAllPosts()
  const { posts, pagination } = getPaginatedPosts(pageNumber)
  const tags = getAllTags()

  if (pageNumber > pagination.totalPages) {
    notFound()
  }

  const totalArticles = allPosts.length
  const dualViewCount = allPosts.filter((p) => p.hasDeveloperView).length
  const totalTopics = tags.length

  return (
    <MainLayout>
      <main className='mx-auto max-w-2xl px-4 py-6 pb-16'>
        <BlogHeader
          totalArticles={totalArticles}
          dualViewCount={dualViewCount}
          totalTopics={totalTopics}
          pageTitle={`Engineering Notes · Page ${pageNumber}`}
        />

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

        <MoveToTop />
      </main>

      <ProgressiveBlur height='4rem' position='bottom' />
    </MainLayout>
  )
}
