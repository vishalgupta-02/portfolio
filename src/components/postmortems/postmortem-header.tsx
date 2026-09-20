import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { PostmortemSeverityBadge } from "./postmortem-severity";
import { PostmortemStatusBadge } from "./postmortem-status";
import { ShareButtons } from "@/components/ui/share-buttons";
import type { PostmortemMetadata } from "@/lib/postmortems/types";

interface PostmortemHeaderProps {
  slug: string;
  metadata: PostmortemMetadata;
  readingMinutes: number;
}

export function PostmortemHeader({
  slug,
  metadata,
  readingMinutes,
}: PostmortemHeaderProps) {
  return (
    <header className="mb-10 max-w-3xl">
      <div className="border-border mb-6 w-full border-b pb-4">
        <Link
          href="/postmortems"
          className="text-muted-foreground hover:text-foreground inline-flex items-center font-mono text-xs transition-colors"
        >
          <ArrowLeft className="mr-1.5 inline size-3.5" aria-hidden="true" />
          Back to Incident Index
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="border-border bg-muted/40 text-muted-foreground rounded border px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase">
          {metadata.category}
        </span>
        <PostmortemSeverityBadge severity={metadata.severity} />
        <PostmortemStatusBadge status={metadata.status} />
      </div>

      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {metadata.title}
      </h1>

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
        {metadata.description}
      </p>

      <div className="text-muted-foreground border-border/60 mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <time dateTime={metadata.date} className="font-mono">
            {new Date(metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>

          {metadata.updatedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[11px]">
                Updated:{" "}
                {new Date(metadata.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </>
          )}

          <span aria-hidden="true">·</span>

          <span className="inline-flex items-center gap-1 font-mono text-[11px]">
            <Clock className="size-3" aria-hidden="true" />
            {readingMinutes} min read
          </span>
        </div>

        <ShareButtons
          url={`/postmortems/${slug}`}
          title={metadata.title}
          description={metadata.description}
          tags={metadata.tags}
          variant="compact"
        />
      </div>

      {metadata.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="border-border/80 bg-muted/30 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
