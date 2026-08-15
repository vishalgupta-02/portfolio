import type { Metadata } from "next"

import { siteConfig } from "@/lib/blog/site"

import type { BlogPost } from "./types"

export function generateBlogMetadata(slug: string, post: BlogPost): Metadata {
  const canonical = `/blog/${slug}`

  const image = post.metadata.image ?? siteConfig.ogImage

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: [...siteConfig.keywords, ...post.metadata.tags],
    authors: [
      {
        name: siteConfig.author,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    alternates: {
      canonical,
    },
    category: "Software Engineering",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.metadata.title,
      description: post.metadata.description,
      siteName: siteConfig.name,
      locale: "en_US",
      publishedTime: post.metadata.publishedAt,
      modifiedTime: post.metadata.updatedAt ?? post.metadata.publishedAt,
      authors: [siteConfig.creator.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: [image],
      creator: "@yourusername",
    },
  }
}
