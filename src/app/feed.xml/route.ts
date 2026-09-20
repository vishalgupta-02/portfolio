import { getAllPosts } from "@/lib/blog/blog"
import { generateRSSFeed } from "@/lib/rss/feed"
import { siteConfig } from "@/lib/blog/site"

export async function GET() {
  const posts = getAllPosts()

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
