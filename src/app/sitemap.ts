import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog/blog"
import { siteConfig } from "@/lib/blog/site"
import { staticRoutes } from "@/lib/routes"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...blogEntries, ...staticEntries]
}
