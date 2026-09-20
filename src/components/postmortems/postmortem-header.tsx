import React from "react"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { PostmortemSeverityBadge } from "./postmortem-severity"
import { PostmortemStatusBadge } from "./postmortem-status"
import { ShareButtons } from "@/components/ui/share-buttons"
import type { PostmortemMetadata } from "@/lib/postmortems/types"

interface PostmortemHeaderProps {
  slug: string
  metadata: PostmortemMetadata
  readingMinutes: number
}

export function PostmortemHeader({
  slug,
  metadata,
  readingMinutes,
}: PostmortemHeaderProps) {
  return (
    <header className="mb-10 max-w-3xl">
      <div className="mb-6 w-full border-b border-border pb-4">
        <Link
          href="/postmortems"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-mono transition-colors"
        >
          <ArrowLeft className="mr-1.5 inline size-3.5" aria-hidden="true" />
          Back to Incident Index
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="rounded border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {metadata.category}
        </span>
        <PostmortemSeverityBadge severity={metadata.severity} />
        <PostmortemStatusBadge status={metadata.status} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {metadata.title}
      </h1>

      <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
        {metadata.description}
      </p>

      <div className="text-muted-foreground mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs">
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
              className="rounded-md border border-border/80 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
