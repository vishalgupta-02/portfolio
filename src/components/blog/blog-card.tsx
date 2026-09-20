import { LinkPreview } from "@/components/ui/link-preview";
import type {
  BlogPost,
  RelatedArticle,
  SearchableBlogPost,
} from "@/lib/blog/types";
import { siteConfig } from "@/lib/blog/site";
import { ArrowUpRight, Calendar, Clock, Layers } from "lucide-react";
import Link from "next/link";

interface NormalizedBlogItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  hasDeveloperView: boolean;
  imageSrc: string;
}

function normalizePostItem(
  post: BlogPost | SearchableBlogPost | RelatedArticle,
): NormalizedBlogItem {
  if ("metadata" in post) {
    return {
      slug: post.slug,
      title: post.metadata.title,
      description: post.metadata.description,
      publishedAt: post.metadata.publishedAt,
      readingMinutes: post.readingTime.minutes,
      tags: post.metadata.tags || [],
      hasDeveloperView: Boolean(post.hasDeveloperView),
      imageSrc: post.image || post.metadata.image || siteConfig.ogImage,
    };
  }

  const anyPost = post as Record<string, any>;
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    readingMinutes: post.readingTime.minutes,
    tags: post.tags || [],
    hasDeveloperView: Boolean(anyPost.hasDeveloperView),
    imageSrc: anyPost.image || siteConfig.ogImage,
  };
}

export interface BlogCardProps {
  post: BlogPost | SearchableBlogPost | RelatedArticle;
  className?: string;
}

export function BlogCard({ post, className = "" }: BlogCardProps) {
  const item = normalizePostItem(post);
  const primaryTag = item.tags[0] || "Engineering";
  const secondaryTags = item.tags.slice(1, 4);

  return (
    <article
      className={`group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/60 relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-md sm:p-6 ${className}`}
    >
      <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-b pb-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border-border/60 bg-muted/40 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase">
            {primaryTag}
          </span>

          {item.hasDeveloperView && (
            <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] text-blue-600 dark:text-blue-400">
              <Layers className="size-3" aria-hidden="true" />
              Dual-View
            </span>
          )}
        </div>

        <div className="text-muted-foreground flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1">
            <Calendar
              className="text-muted-foreground/70 size-3"
              aria-hidden="true"
            />
            <time dateTime={item.publishedAt}>
              {new Date(item.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </span>

          <span aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1">
            <Clock
              className="text-muted-foreground/70 size-3"
              aria-hidden="true"
            />
            {item.readingMinutes} min read
          </span>
        </div>
      </div>

      <div className="mt-3.5">
        <h2 className="text-foreground font-sans text-lg font-bold tracking-tight sm:text-xl">
          <LinkPreview
            url={`/blog/${item.slug}`}
            imageSrc={item.imageSrc}
            isStatic
            width={260}
            height={145}
            className="hover:text-primary inline-block transition-colors hover:underline"
          >
            {item.title}
          </LinkPreview>
        </h2>

        <p className="font-display text-muted-foreground mt-2 line-clamp-2 text-xs leading-relaxed sm:text-sm">
          {item.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {secondaryTags.map((tag) => (
            <span
              key={tag}
              className="border-border/50 bg-muted/20 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 4 && (
            <span className="text-muted-foreground self-center font-mono text-[10px]">
              +{item.tags.length - 4} more
            </span>
          )}
        </div>

        <Link
          href={`/blog/${item.slug}`}
          className="text-foreground hover:text-primary inline-flex items-center gap-1 font-mono text-xs font-medium transition-transform hover:translate-x-0.5"
        >
          <span>Read Article</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
