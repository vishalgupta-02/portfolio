import type { Metadata } from "next"
import { ReactNode } from "react"
import { allPosts } from "content-collections"
import { DATA } from "@/data/resume"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug)

  if (!post) {
    return {
      title: "Blog Post | 2AM",
    }
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post

  return {
    title: `${title} | 2AM Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      authors: [DATA.name],
      images: [
        {
          url: `${DATA.url}/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vishalgupta_02",
      images: [`${DATA.url}/blog/${slug}/opengraph-image`],
    },
  }
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return (
    <article className='flex flex-col gap-8 py-4 md:py-8'>
      <div className='max-w-3xl mx-auto w-full px-0'>{children}</div>
    </article>
  )
}
