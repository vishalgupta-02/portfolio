import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import React from "react"

import { createHeadingId } from "@/lib/blog/heading"
import { CopyButton } from "@/components/blog/copy-button"
import { PostmortemCallout } from "./postmortem-callout"
import { Timeline, TimelineEvent } from "./postmortem-timeline"
import { PostmortemSeverityBadge } from "./postmortem-severity"
import { PostmortemStatusBadge } from "./postmortem-status"
import { PostmortemSummary } from "./postmortem-summary"

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (!node) return ""
  if (Array.isArray(node)) return node.map(getNodeText).join("")
  if (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    (node as { props?: { children?: React.ReactNode } }).props?.children
  ) {
    return getNodeText(
      (node as { props: { children: React.ReactNode } }).props.children,
    )
  }
  return ""
}

function H1({ children, ...props }: ComponentPropsWithoutRef<"h1">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h1
      id={id}
      className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight my-6 text-foreground"
      {...props}
    >
      {children}
    </h1>
  )
}

function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl sm:text-2xl font-semibold tracking-tight my-6 border-b border-border/60 pb-2 text-foreground"
      {...props}
    >
      {children}
    </h2>
  )
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h3
      id={id}
      className="scroll-mt-24 text-lg sm:text-xl font-semibold my-4 text-foreground"
      {...props}
    >
      {children}
    </h3>
  )
}

function H4({ children, ...props }: ComponentPropsWithoutRef<"h4">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h4
      id={id}
      className="scroll-mt-24 text-base sm:text-lg font-medium my-3 text-foreground"
      {...props}
    >
      {children}
    </h4>
  )
}

function CustomLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#")

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        {...props}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
      {...props}
    >
      {children}
    </a>
  )
}

function Blockquote({
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="border-l-2 border-border pl-4 my-5 italic text-muted-foreground text-sm"
      {...props}
    >
      {children}
    </blockquote>
  )
}

function CodeBlock({
  children,
  "data-code": code = "",
  ...props
}: ComponentPropsWithoutRef<"pre"> & {
  "data-code"?: string
}) {
  return (
    <div className="group relative my-6">
      <div className="absolute right-3 top-3 z-10">
        <CopyButton code={code} />
      </div>

      <pre
        {...props}
        className={`
            ${props.className ?? ""}
            overflow-x-auto
            rounded-xl
            border
            border-border
            text-xs
            sm:text-sm
            p-4
          `}
      >
        {children}
      </pre>
    </div>
  )
}

function Table({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
      <table
        className={`w-full text-left text-xs sm:text-sm ${className}`}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className={`border-b border-border bg-muted/40 font-mono text-xs uppercase tracking-wider text-muted-foreground ${className}`}
      {...props}
    />
  )
}

function TableRow({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={`border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors ${className}`}
      {...props}
    />
  )
}

function TableHead({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return <th className={`p-3 font-semibold ${className}`} {...props} />
}

function TableCell({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return <td className={`p-3 align-top ${className}`} {...props} />
}

export const postmortemMdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: CustomLink,
  blockquote: Blockquote,
  pre: CodeBlock,
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  Callout: PostmortemCallout,
  PostmortemCallout,
  Timeline,
  TimelineEvent,
  PostmortemSummary,
  PostmortemSeverityBadge,
  PostmortemStatusBadge,
}
