import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { blogPostMetadataSchema } from "./schemas";
import type {
  ArticleNavigation,
  ArticleNavigationItem,
  BlogPost,
  BlogPostMetadata,
  BlogTag,
  RelatedArticle,
  PaginatedPosts,
} from "./types";
import { createTagSlug } from "./tag";

import { calculateReadingTime } from "./reading-time";
import { extractTableOfContents } from "./table-of-contents";
import type { SearchableBlogPost } from "./types";
import { cache } from "react";
import { BlogContentError } from "./errors";

export const POSTS_PER_PAGE = 10;

const BLOG_DIRECTORY = path.join(process.cwd(), "src", "content", "blog");

function parsePostMetadata(data: unknown, slug: string): BlogPostMetadata {
  const result = blogPostMetadataSchema.safeParse(data);

  if (!result.success) {
    // console.error(`Invalid blog metadata: ${slug}.mdx`, result.error.flatten())

    // throw new Error(`Invalid metadata in blog post: ${slug}.mdx`)
    throw new BlogContentError(
      `Invalid metadata in blog post: ${slug}.mdx`,
      `${slug}.mdx`,
    );
  }

  // IMPORTANT:
  return result.data;
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(source);

  const metadata = parsePostMetadata(data, slug);

  return {
    slug,
    metadata,
    content,
    readingTime: calculateReadingTime(content),
    tableOfContents: extractTableOfContents(content),
  };
});

export function getAllTags(): BlogTag[] {
  const posts = getAllPosts();

  const tags = new Map<string, BlogTag>();

  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      const slug = createTagSlug(tag);

      const existingTag = tags.get(slug);

      if (existingTag) {
        existingTag.count += 1;
        continue;
      }

      tags.set(slug, {
        name: tag,
        slug,
        count: 1,
      });
    }
  }

  return Array.from(tags.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const getAllPosts = cache((): BlogPost[] => {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.metadata.published)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );
});

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.metadata.tags.some((tag) => createTagSlug(tag) === tagSlug),
  );
}

function toNavigationItem(post: BlogPost): ArticleNavigationItem {
  return {
    slug: post.slug,
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export function getArticleNavigation(slug: string): ArticleNavigation {
  const posts = getAllPosts();

  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  const olderPost = posts[currentIndex + 1] ?? null;

  const newerPost = posts[currentIndex - 1] ?? null;

  return {
    previous: olderPost ? toNavigationItem(olderPost) : null,
    next: newerPost ? toNavigationItem(newerPost) : null,
  };
}

// interface RelatedArticleCandidate {
//   article: RelatedArticle
//   score: number
// }

export function getRelatedArticles(
  slug: string,
  limit = 2,
  excludeSlugs: string[] = [],
): RelatedArticle[] {
  const posts = getAllPosts();

  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  const excluded = new Set([slug, ...excludeSlugs]);

  const currentTags = new Set(currentPost.metadata.tags.map(createTagSlug));

  return posts
    .filter((post) => !excluded.has(post.slug))
    .map((post) => {
      const score = post.metadata.tags.filter((tag) =>
        currentTags.has(createTagSlug(tag)),
      ).length;

      return {
        score,

        article: {
          slug: post.slug,
          title: post.metadata.title,
          description: post.metadata.description,
          publishedAt: post.metadata.publishedAt,
          readingTime: post.readingTime,
          tags: post.metadata.tags,
        },
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.article.publishedAt).getTime() -
          new Date(a.article.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((candidate) => candidate.article);
}

export function getPaginatedPosts(
  page: number,
  postsPerPage = POSTS_PER_PAGE,
): PaginatedPosts {
  const posts = getAllPosts();

  const totalPosts = posts.length;

  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const startIndex = (page - 1) * postsPerPage;

  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return {
    posts: paginatedPosts,

    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  };
}

export function getSearchablePosts(): SearchableBlogPost[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    description: post.metadata.description,
    publishedAt: post.metadata.publishedAt,
    tags: post.metadata.tags,
    readingTime: post.readingTime,
  }));
}
