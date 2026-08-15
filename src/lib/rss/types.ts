export interface RSSItem {
  title: string
  description: string
  url: string
  publishedAt: string
  author: string
  categories: string[]
}

export interface RSSChannel {
  title: string
  description: string
  link: string
  language: string
  lastBuildDate: string
  items: RSSItem[]
}
