import type { Metadata } from "next"
import { siteConfig } from "@/lib/blog/site"
import type { Postmortem } from "./types"

export function generatePostmortemMetadata(
  slug: string,
  postmortem: Postmortem,
): Metadata {
  const canonical = `/postmortems/${slug}`
  const image = siteConfig.ogImage

  return {
    title: `${postmortem.metadata.title} | Engineering Postmortems`,
    description: postmortem.metadata.description,
    keywords: [
      ...siteConfig.keywords,
      "engineering postmortem",
      "incident report",
      "system design",
      "production incident",
      postmortem.metadata.category,
      postmortem.metadata.severity,
      ...postmortem.metadata.tags,
    ],
    authors: [
      {
        name: postmortem.metadata.author || siteConfig.author,
        url: siteConfig.url,
      },
    ],
    creator: postmortem.metadata.author || siteConfig.author,
    publisher: siteConfig.author,
    alternates: {
      canonical,
    },
    category: "Engineering Incident Postmortem",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: postmortem.metadata.title,
      description: postmortem.metadata.description,
      siteName: siteConfig.name,
      locale: "en_US",
      publishedTime: postmortem.metadata.date,
      modifiedTime: postmortem.metadata.updatedAt ?? postmortem.metadata.date,
      authors: [postmortem.metadata.author || siteConfig.creator.name],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: postmortem.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postmortem.metadata.title,
      description: postmortem.metadata.description,
      images: [image],
      creator: "@VishalG41764750",
    },
  }
}
