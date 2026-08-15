import { siteConfig } from "@/lib/blog/site"

import type { RSSChannel, RSSItem } from "./types"

import { cdata, formatRSSDate } from "./xml"

function generateItem(item: RSSItem): string {
  const categories = item.categories
    .map((category) => `<category>${cdata(category)}</category>`)
    .join("")

  return `
  <item>
  
  <title>${cdata(item.title)}</title>
  
  <link>${item.url}</link>
  
  <guid>${item.url}</guid>
  
  <description>${cdata(item.description)}</description>
  
  <author>${cdata(item.author)}</author>
  
  <pubDate>${formatRSSDate(item.publishedAt)}</pubDate>
  
  ${categories}
  
  </item>`
}

export function generateRSSFeed(channel: RSSChannel): string {
  const items = channel.items.map(generateItem).join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
  
  <rss
  version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  
  <channel>
  
  <title>${cdata(channel.title)}</title>
  
  <link>${channel.link}</link>
  
  <description>${cdata(channel.description)}</description>
  
  <language>${channel.language}</language>
  
  <lastBuildDate>${channel.lastBuildDate}</lastBuildDate>
  
  <atom:link
  href="${siteConfig.url}/feed.xml"
  rel="self"
  type="application/rss+xml"/>
  
  ${items}
  
  </channel>
  
  </rss>`
}
