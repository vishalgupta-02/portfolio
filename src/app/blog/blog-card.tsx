import Link from "next/link";

import type { BlogPost } from "@/lib/blog/types";

import { BlogTag } from "@/components/blog/blog-tag";
import { Layers } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-base sm:text-lg font-semibold hover:underline leading-snug">
          {post.metadata.title}
        </h2>
      </Link>

      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-xl line-clamp-2 sm:truncate">
        {post.metadata.description}
      </p>

      <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
        <time dateTime={post.metadata.publishedAt}>
          {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>

        <span aria-hidden="true">·</span>

        <span>{post.readingTime.minutes} min read</span>

        {post.hasDeveloperView && (
          <>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Layers className="size-3" aria-hidden="true" />
              Dual View
            </span>
          </>
        )}
      </div>

      {post.metadata.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <BlogTag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

