import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BlogCard } from "../../blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";

import {
  getAllPosts,
  getPaginatedPosts,
  POSTS_PER_PAGE,
} from "@/lib/blog/blog";

interface BlogPaginationPageProps {
  params: Promise<{
    page: string;
  }>;
}

export function generateStaticParams() {
  const totalPosts = getAllPosts().length;

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return Array.from(
    {
      length: Math.max(0, totalPages - 1),
    },
    (_, index) => ({
      page: String(index + 2),
    }),
  );
}

export async function generateMetadata({
  params,
}: BlogPaginationPageProps): Promise<Metadata> {
  const { page } = await params;

  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return {};
  }

  return {
    title: `Blog — Page ${pageNumber}`,
    description: `Browse page ${pageNumber} of software engineering articles.`,
    alternates: {
      canonical: `/blog/page/${pageNumber}`,
    },
  };
}

export default async function BlogPaginationPage({
  params,
}: BlogPaginationPageProps) {
  const { page } = await params;

  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    notFound();
  }

  if (pageNumber === 1) {
    redirect("/blog");
  }

  const { posts, pagination } = getPaginatedPosts(pageNumber);

  if (pageNumber > pagination.totalPages) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">2 AM thoughts</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          When & where thoughts don&apos;t need permissions
        </p>
      </header>

      <div className="space-y-10">
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
    </main>
  );
}
