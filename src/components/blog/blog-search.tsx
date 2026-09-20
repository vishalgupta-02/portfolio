"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import type { BlogTag, SearchableBlogPost } from "@/lib/blog/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";
import { BlogCard } from "./blog-card";
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
        <div className="relative">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>

          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />

          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles by title, keyword, or concept..."
            className="w-full rounded-xl border border-border/50 bg-card/40 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-border/90 focus:ring-1 focus:ring-ring/50 focus:bg-card/70"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-md transition-colors"
              aria-label="Clear search query"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

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

        {hasFilters ? (
          <div className="w-full space-y-6">
            <div
              aria-live="polite"
              className="text-xs font-mono text-muted-foreground"
            >
              Found {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"} matching your criteria
            </div>

            {filteredPosts.length > 0 ? (
              <div className="w-full flex flex-col gap-4">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border/60 bg-card/20 py-12 px-4 text-center">
                <p className="font-medium text-foreground">No matching articles</p>

                <p className="mt-1.5 text-xs text-muted-foreground max-w-sm mx-auto">
                  No articles matched &ldquo;{query || selectedTag}&rdquo;. Try clearing filters or using broader keywords.
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
