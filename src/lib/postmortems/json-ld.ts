import { siteConfig } from "@/lib/blog/site"
import type { Postmortem } from "./types"

export function generatePostmortemJsonLd(slug: string, postmortem: Postmortem) {
  const url = `${siteConfig.url}/postmortems/${slug}`
  const image = `${siteConfig.url}${siteConfig.ogImage}`

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: postmortem.metadata.title,
    description: postmortem.metadata.description,
    image,
    url,
    mainEntityOfPage: url,
    wordCount: postmortem.readingTime.words,
    datePublished: postmortem.metadata.date,
    dateModified: postmortem.metadata.updatedAt ?? postmortem.metadata.date,
    keywords: [
      "engineering postmortem",
      postmortem.metadata.category,
      postmortem.metadata.severity,
      ...postmortem.metadata.tags,
    ],
    about: {
      "@type": "Event",
      name: postmortem.metadata.title,
      description: postmortem.metadata.impact,
      startDate: postmortem.metadata.date,
    },
    author: {
      "@type": "Person",
      name: postmortem.metadata.author || siteConfig.creator.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
  }
}
