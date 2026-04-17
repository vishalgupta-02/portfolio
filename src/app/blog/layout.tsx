import type { Metadata } from "next"
import { DATA } from "@/data/resume"

export const metadata: Metadata = {
  title: "2AM | Tech Blog",
  description:
    "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
  keywords: [
    "tech blog",
    "software engineering",
    "Linux",
    "web development",
    "programming",
    "tutorial",
    "developer blog",
    "coding",
  ],
  openGraph: {
    title: "2AM | Tech Blog",
    description:
      "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
    type: "website",
    url: `${DATA.url}/blog`,
    images: [
      {
        url: `${DATA.url}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "2AM Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2AM | Tech Blog",
    description:
      "Where thoughts don't need permission. A blog about software engineering, Linux, and web development.",
    images: [`${DATA.url}/og-blog.jpg`],
  },
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
