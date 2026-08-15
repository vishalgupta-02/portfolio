import type { BlogPostMetadata } from "./schemas"

export type { BlogPostMetadata } from "./schemas"

export interface ReadingTime {
  minutes: number
  words: number
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: 2 | 3
}

export interface BlogTag {
  name: string
  slug: string
  count: number
}

export interface BlogPost {
  slug: string
  metadata: BlogPostMetadata
  content: string
  readingTime: ReadingTime
  tableOfContents: TableOfContentsItem[]
}

export interface ArticleNavigationItem {
  slug: string
  title: string
  description: string
}

export interface ArticleNavigation {
  previous: ArticleNavigationItem | null
  next: ArticleNavigationItem | null
}

export interface RelatedArticle {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: ReadingTime
  tags: string[]
}

export interface BlogPagination {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface PaginatedPosts {
  posts: BlogPost[]
  pagination: BlogPagination
}

export interface SearchableBlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  readingTime: {
    minutes: number
    words: number
  }
}
