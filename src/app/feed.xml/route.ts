// import { getAllPosts } from "@/lib/blog/blog"
// import { siteConfig } from "@/lib/site"

// export async function GET() {
//   const posts = getAllPosts()

//   const items = posts
//     .map((post) => {
//       const url = `${siteConfig.url}/blog/${post.slug}`

//       return `
// <item>
// <title><![CDATA[${post.metadata.title}]]></title>
// <link>${url}</link>
// <guid>${url}</guid>

// <description><![CDATA[${post.metadata.description}]]></description>

// <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>

// </item>`
//     })
//     .join("")

//   const rss = `<?xml version="1.0" encoding="UTF-8"?>

// <rss version="2.0">

// <channel>

// <title>${siteConfig.title}</title>

// <link>${siteConfig.url}</link>

// <description>${siteConfig.description}</description>

// <language>en</language>

// ${items}

// </channel>

// </rss>`

//   return new Response(rss, {
//     headers: {
//       "Content-Type": "application/rss+xml; charset=utf-8",
//     },
//   })
// }

// --------------------------

// app/feed.xml/route.ts

import { getAllPosts } from "@/lib/blog/blog"
import { generateRSSFeed } from "@/lib/rss/feed"
import { siteConfig } from "@/lib/blog/site"

export async function GET() {
  const posts = getAllPosts()

  // Derive feed update time from the newest post
  const lastBuildDate =
    posts.length > 0
      ? new Date(
          posts[0].metadata.updatedAt ?? posts[0].metadata.publishedAt,
        ).toUTCString()
      : new Date().toUTCString()

  const xml = generateRSSFeed({
    title: siteConfig.title,
    description: siteConfig.description,
    link: siteConfig.url,
    language: "en",
    lastBuildDate,
    items: posts.map((post) => ({
      title: post.metadata.title,
      description: post.metadata.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      author: siteConfig.creator.name,
      categories: post.metadata.tags,
    })),
  })

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
