import type { BlogPost } from "@/lib/blog/types";
import { siteConfig } from "@/lib/blog/site";
import { BlogTag } from "@/components/blog/blog-tag";
import { Layers } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageSrc = post.image || post.metadata.image || siteConfig.ogImage;

  return (
    <article className="py-6 first:pt-0 last:pb-0">
      <LinkPreview
        url={`/blog/${post.slug}`}
        imageSrc={imageSrc}
        isStatic
        width={260}
        height={145}
        className="font-bold"
      >
        <h2 className="text-base leading-snug font-semibold hover:underline sm:text-lg">
          {post.metadata.title}
        </h2>

        <p className="text-muted-foreground mt-1 line-clamp-2 max-w-xl text-xs sm:truncate sm:text-sm">
          {post.metadata.description}
        </p>

        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-[11px]">
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
              <span className="text-muted-foreground inline-flex items-center gap-1">
                <Layers className="size-3" aria-hidden="true" />
                Dual View
              </span>
            </>
          )}
        </div>

        {post.metadata.tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <BlogTag key={tag} tag={tag} />
            ))}
          </div>
        )}
      </LinkPreview>
    </article>
  );
}
