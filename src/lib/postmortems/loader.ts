import "server-only"

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { cache } from "react"

import { postmortemMetadataSchema } from "./schemas"
import type {
  Postmortem,
  PostmortemMetadata,
  PostmortemNavigation,
  PostmortemNavigationItem,
  RelatedPostmortem,
} from "./types"
import { calculateReadingTime } from "@/lib/blog/reading-time"
import { PostmortemContentError } from "./errors"

const POSTMORTEMS_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
  "postmortems",
)

function ensureDirectoryExists(): boolean {
  if (!fs.existsSync(POSTMORTEMS_DIRECTORY)) {
    fs.mkdirSync(POSTMORTEMS_DIRECTORY, { recursive: true })
    return false
  }
  return true
}

function parsePostmortemMetadata(
  data: unknown,
  slug: string,
): PostmortemMetadata {
  const result = postmortemMetadataSchema.safeParse(data)

  if (!result.success) {
    const errorDetails = JSON.stringify(result.error.flatten().fieldErrors)
    console.error(`Invalid postmortem metadata in ${slug}.mdx:`, errorDetails)

    throw new PostmortemContentError(
      `Invalid metadata in postmortem: ${slug}.mdx (${errorDetails})`,
      `${slug}.mdx`,
    )
  }

  return {
    ...result.data,
    slug: result.data.slug || slug,
  }
}

export function getPostmortemSlugs(): string[] {
  if (!ensureDirectoryExists()) {
    return []
  }

  return fs
    .readdirSync(POSTMORTEMS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export const getPostmortemBySlug = cache(
  (slug: string): Postmortem | null => {
    ensureDirectoryExists()
    const filePath = path.join(POSTMORTEMS_DIRECTORY, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const source = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(source)
    const metadata = parsePostmortemMetadata(data, slug)
    const reading = calculateReadingTime(content)

    return {
      slug,
      metadata,
      content,
      readingTime: {
        text: `${reading.minutes} min read`,
        minutes: reading.minutes,
        time: reading.minutes * 60 * 1000,
        words: reading.words,
      },
    }
  },
)

export const getAllPostmortems = cache((): Postmortem[] => {
  return getPostmortemSlugs()
    .map((slug) => getPostmortemBySlug(slug))
    .filter((post): post is Postmortem => post !== null)
    .filter((post) => post.metadata.published ?? true)
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
    )
})

function toNavigationItem(post: Postmortem): PostmortemNavigationItem {
  return {
    slug: post.slug,
    title: post.metadata.title,
    description: post.metadata.description,
    severity: post.metadata.severity,
    status: post.metadata.status,
    date: post.metadata.date,
  }
}

export function getPostmortemNavigation(slug: string): PostmortemNavigation {
  const posts = getAllPostmortems()
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    }
  }

  // Older post is previous chronologically
  const olderPost = posts[currentIndex + 1] ?? null
  // Newer post is next chronologically
  const newerPost = posts[currentIndex - 1] ?? null

  return {
    previous: olderPost ? toNavigationItem(olderPost) : null,
    next: newerPost ? toNavigationItem(newerPost) : null,
  }
}

export function getRelatedPostmortems(
  slug: string,
  limit = 2,
  excludeSlugs: string[] = [],
): RelatedPostmortem[] {
  const allPosts = getAllPostmortems()
  const currentPost = allPosts.find((p) => p.slug === slug)

  if (!currentPost) {
    return []
  }

  const excluded = new Set([slug, ...excludeSlugs])
  const currentTags = new Set(
    currentPost.metadata.tags.map((t) => t.toLowerCase().trim()),
  )
  const currentCategory = currentPost.metadata.category

  return allPosts
    .filter((p) => !excluded.has(p.slug))
    .map((post) => {
      let score = 0
      if (post.metadata.category === currentCategory) {
        score += 3
      }
      for (const tag of post.metadata.tags) {
        if (currentTags.has(tag.toLowerCase().trim())) {
          score += 1
        }
      }

      return {
        score,
        post: {
          slug: post.slug,
          title: post.metadata.title,
          description: post.metadata.description,
          date: post.metadata.date,
          category: post.metadata.category,
          severity: post.metadata.severity,
          status: post.metadata.status,
          tags: post.metadata.tags,
        },
      }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .slice(0, limit)
    .map((item) => item.post)
}
