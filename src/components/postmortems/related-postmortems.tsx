import React from "react"
import Link from "next/link"
import { ArrowUpRight, ShieldAlert } from "lucide-react"
import type { RelatedPostmortem } from "@/lib/postmortems/types"
import { PostmortemSeverityBadge } from "./postmortem-severity"

interface RelatedPostmortemsProps {
  postmortems: RelatedPostmortem[]
}

export function RelatedPostmortems({ postmortems }: RelatedPostmortemsProps) {
  if (!postmortems || postmortems.length === 0) {
    return null
  }

  return (
    <aside
      aria-label="Related Incident Postmortems"
      className="my-10 border-t border-border pt-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="size-4 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-mono text-xs uppercase font-semibold tracking-wider text-muted-foreground">
          Related Incident Reports
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {postmortems.map((item) => (
          <Link
            key={item.slug}
            href={`/postmortems/${item.slug}`}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-foreground/30 hover:bg-muted/20"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.category}
                </span>
                <PostmortemSeverityBadge
                  severity={item.severity}
                  showIcon={false}
                  className="text-[10px] py-0 px-1.5"
                />
              </div>

              <h3 className="text-sm font-semibold text-foreground group-hover:underline line-clamp-1">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-2 text-xs">
              <time
                dateTime={item.date}
                className="font-mono text-[10px] text-muted-foreground"
              >
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-0.5 font-mono text-[11px] font-medium text-foreground">
                Read
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
