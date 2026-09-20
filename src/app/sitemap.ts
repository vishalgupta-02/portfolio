import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog/blog"
import { getAllPostmortems } from "@/lib/postmortems/loader"
import { siteConfig } from "@/lib/blog/site"
import { staticRoutes } from "@/lib/routes"
import { getAllProjects, getCaseStudyProjects } from "@/lib/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const postmortems = getAllPostmortems()
  const projects = getAllProjects()
  const caseStudyProjects = getCaseStudyProjects()

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const postmortemEntries = postmortems.map((pm) => ({
    url: `${siteConfig.url}/postmortems/${pm.slug}`,
    lastModified: pm.metadata.updatedAt ?? pm.metadata.date,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  const projectEntries = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const caseStudyEntries = caseStudyProjects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}/case-study`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [
    ...staticEntries,
    ...projectEntries,
    ...caseStudyEntries,
    ...blogEntries,
    ...postmortemEntries,
  ]
}

