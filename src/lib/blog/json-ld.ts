import { siteConfig } from "@/lib/blog/site"

import type { BlogPost } from "./types"

export function generateBlogJsonLd(slug: string, post: BlogPost) {
  const url = `${siteConfig.url}/blog/${slug}`

  const image = post.metadata.image ?? `${siteConfig.url}${siteConfig.ogImage}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image,
    url,
    mainEntityOfPage: url,
    wordCount: post.readingTime.words,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
    keywords: post.metadata.tags,
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
  }
}
