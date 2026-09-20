import React from "react"
import Link from "next/link"
import type { Postmortem } from "@/lib/postmortems/types"
import { PostmortemSeverityBadge } from "./postmortem-severity"
import { PostmortemStatusBadge } from "./postmortem-status"
import { ArrowUpRight, Clock } from "lucide-react"

interface PostmortemCardProps {
  postmortem: Postmortem
}

export function PostmortemCard({ postmortem }: PostmortemCardProps) {
  const { slug, metadata, readingTime } = postmortem

  return (
    <article className="group relative rounded-xl border border-border bg-card p-5 sm:p-6 transition-all duration-200 hover:border-foreground/30 hover:shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {metadata.category}
          </span>
          <PostmortemSeverityBadge severity={metadata.severity} />
          <PostmortemStatusBadge status={metadata.status} />
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <time dateTime={metadata.date}>
            {new Date(metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {readingTime.minutes} min
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:underline">
          <Link href={`/postmortems/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {metadata.title}
          </Link>
        </h2>

        <p className="mt-2 line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {metadata.description}
        </p>
      </div>

      {metadata.impact && (
        <div className="mt-3 rounded-md bg-muted/30 p-2.5 text-xs text-muted-foreground">
          <span className="font-mono text-[10px] uppercase font-semibold tracking-wider text-foreground">
            Impact:{" "}
          </span>
          <span className="line-clamp-1">{metadata.impact}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
        <div className="flex flex-wrap gap-1.5">
          {metadata.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/60 bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
          {metadata.tags.length > 4 && (
            <span className="font-mono text-[10px] text-muted-foreground self-center">
              +{metadata.tags.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 font-mono text-xs font-medium text-foreground transition-transform group-hover:translate-x-0.5">
          Read Report
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}
