"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import type { BlogTag, SearchableBlogPost } from "@/lib/blog/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BlogSearchCard } from "./blog-search-card";

interface BlogSearchProps {
  posts: SearchableBlogPost[];
  tags: BlogTag[];
  children: ReactNode;
}

export function BlogSearch({ posts, tags, children }: BlogSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const [selectedTag, setSelectedTag] = useState<string | null>(() =>
    searchParams.get("tag"),
  );
  const hasFilters = query.trim().length > 0 || selectedTag !== null;

  const selectedTagData = useMemo(
    () => tags.find((tag) => tag.slug === selectedTag),
    [tags, selectedTag],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag =
        selectedTagData === undefined ||
        post.tags.some(
          (tag) => tag.toLowerCase() === selectedTagData.name.toLowerCase(),
        );

      if (!matchesTag) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [posts, query, selectedTagData]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();

      const trimmedQuery = query.trim();

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      }

      if (selectedTag) {
        params.set("tag", selectedTag);
      }

      const nextSearch = params.toString();
      const currentSearch = window.location.search.slice(1);

      // Prevent unnecessary Next.js navigation / RSC request
      if (nextSearch === currentSearch) {
        return;
      }

      const url = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      router.replace(url, {
        scroll: false,
      });
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query, selectedTag, pathname, router]);

  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";

    const urlTag = searchParams.get("tag");

    setQuery((currentQuery) =>
      currentQuery === urlQuery ? currentQuery : urlQuery,
    );

    setSelectedTag((currentTag) =>
      currentTag === urlTag ? currentTag : urlTag,
    );
  }, [searchParams]);

  const validSelectedTag =
    selectedTag === null || tags.some((tag) => tag.slug === selectedTag);

  useEffect(() => {
    if (selectedTag !== null && !validSelectedTag) {
      setSelectedTag(null);
    }
  }, [selectedTag, validSelectedTag]);

  return (
    <>
      <div className="space-y-6">
        <div>
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>

          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border bg-background px-3 py-2 text-xs outline-none transition-colors dark:placeholder:text-custom-white placeholder:text-custom-black focus:border-foreground/40"
          />
        </div>

        {/* Tags will go here */}
        <div className="flex justify-between gap-3 items-center">
          <div className="flex flex-wrap gap-2 w-[90%]">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={
                selectedTag === null
                  ? "rounded-full bg-foreground px-3 py-1 text-xs text-custom-white dark:text-custom-black cursor-pointer"
                  : "rounded-full border px-3 py-1 text-xs text-custom-black dark:text-custom-white transition-colors hover:text-foreground cursor-pointer"
              }
            >
              All
            </button>

            {tags.map((tag) => {
              const isSelected = selectedTag === tag.slug;

              return (
                <button
                  key={tag.slug}
                  type="button"
                  onClick={() => setSelectedTag(isSelected ? null : tag.slug)}
                  className={
                    isSelected
                      ? "rounded-full bg-foreground px-3 py-1 text-xs text-custom-white dark:text-custom-black cursor-pointer"
                      : "rounded-full border px-3 py-1 text-xs text-custom-black dark:text-custom-white transition-colors hover:text-foreground cursor-pointer"
                  }
                >
                  {tag.name}
                  <span className="ml-2 text-xs opacity-70">({tag.count})</span>
                </button>
              );
            })}
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedTag(null);
              }}
              className="flex-1 text-xs text-custom-gray underline-offset-4 transition-colors hover:text-foreground hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results will go here */}
        {hasFilters ? (
          <div className="w-full space-y-8">
            <div
              aria-live="polite"
              className="text-sm text-custom-black dark:text-custom-white"
            >
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"} found
            </div>

            {filteredPosts.length > 0 ? (
              <div className="w-full space-y-10">
                {filteredPosts.map((post) => (
                  <BlogSearchCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <p className="font-medium">No articles found</p>

                <p className="mt-2 text-xs text-foreground">
                  Try a different search term or tag.
                </p>
              </div>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}
