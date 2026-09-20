import React from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { PostmortemNavigation } from "@/lib/postmortems/types"
import { PostmortemSeverityBadge } from "./postmortem-severity"

interface PostmortemNavigationProps {
  navigation: PostmortemNavigation
}

export function PostmortemNavigationNav({
  navigation,
}: PostmortemNavigationProps) {
  const { previous, next } = navigation

  if (!previous && !next) {
    return null
  }

  return (
    <nav
      aria-label="Chronological Incident Navigation"
      className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-border pt-8"
    >
      {previous ? (
        <Link
          href={`/postmortems/${previous.slug}`}
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-foreground/30 hover:bg-muted/30"
        >
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground mb-2">
            <ArrowLeft
              className="size-3.5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Previous Incident</span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground group-hover:underline line-clamp-1">
              {previous.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {previous.description}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <PostmortemSeverityBadge
              severity={previous.severity}
              showIcon={false}
              className="text-[10px] py-0 px-1.5"
            />
            <time
              dateTime={previous.date}
              className="font-mono text-[10px] text-muted-foreground"
            >
              {new Date(previous.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/postmortems/${next.slug}`}
          className="group flex flex-col justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-foreground/30 hover:bg-muted/30 text-right sm:text-right"
        >
          <div className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-muted-foreground mb-2">
            <span>Next Incident</span>
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground group-hover:underline line-clamp-1">
              {next.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {next.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <time
              dateTime={next.date}
              className="font-mono text-[10px] text-muted-foreground"
            >
              {new Date(next.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <PostmortemSeverityBadge
              severity={next.severity}
              showIcon={false}
              className="text-[10px] py-0 px-1.5"
            />
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
    </nav>
  )
}
