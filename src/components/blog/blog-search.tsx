"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import type { BlogTag, SearchableBlogPost } from "@/lib/blog/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BlogSearchCard } from "./blog-search-card";
import { BlogTagsFilter } from "./blog-tags-filter";

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
      <div className="space-y-5">
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
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
        </div>

        {/* Organized & Interactive Tags Filter */}
        <BlogTagsFilter
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={(slug) => setSelectedTag(slug)}
          onClearAll={() => {
            setQuery("");
            setSelectedTag(null);
          }}
          hasFilters={hasFilters}
        />

        {/* Results will go here */}
        {hasFilters ? (
          <div className="w-full space-y-8">
            <div
              aria-live="polite"
              className="text-sm text-muted-foreground"
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
              <div className="rounded-lg border border-dashed border-border py-12 text-center">
                <p className="font-medium text-foreground">No articles found</p>

                <p className="mt-2 text-xs text-muted-foreground">
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
