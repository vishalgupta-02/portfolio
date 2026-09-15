import type { ComponentPropsWithoutRef } from "react"
import Link from "next/link"

import { Callout } from "./callout"
import { createHeadingId } from "@/lib/blog/heading"
import { CopyButton } from "./copy-button"
import { BlogImage } from "./blog-image"

type HeadingProps = ComponentPropsWithoutRef<"h2">

type AnchorProps = ComponentPropsWithoutRef<"a">

type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">

// function createSlug(children: React.ReactNode): string {
//   if (typeof children !== "string") {
//     return ""
//   }

//   return children
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
// }

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
      (node as { props: { children: React.ReactNode } }).props.children
    )
  }
  return ""
}

function H1({ children, ...props }: ComponentPropsWithoutRef<"h1">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h1 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight my-6" {...props}>
      {children}
    </h1>
  )
}

function H2({ children, ...props }: HeadingProps) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h2 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-semibold tracking-tight my-5" {...props}>
      {children}
    </h2>
  )
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h3 id={id} className="scroll-mt-24 text-lg sm:text-xl font-semibold my-4" {...props}>
      {children}
    </h3>
  )
}

function H4({ children, ...props }: ComponentPropsWithoutRef<"h4">) {
  const title = getNodeText(children)
  const id = createHeadingId(title)

  return (
    <h4 id={id} className="scroll-mt-24 text-base sm:text-lg font-medium my-3" {...props}>
      {children}
    </h4>
  )
}

function CustomLink({ href = "", children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#")

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  )
}

function Blockquote({ children, ...props }: BlockquoteProps) {
  return (
    <blockquote className='border-l-4 pl-4 italic' {...props}>
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
    <div className='group relative my-6'>
      <div className='absolute right-3 top-3 z-10'>
        <CopyButton code={code} />
      </div>

      <pre
        {...props}
        className={`
            ${props.className ?? ""}
            overflow-x-auto
            rounded-xl
          `}>
        {children}
      </pre>
    </div>
  )
}

// function MdxImage(props: ComponentPropsWithoutRef<"img">) {
//   if (typeof props.src !== "string") {
//     return null
//   }

//   return (
//     <BlogImage
//       src={props.src}
//       alt={props.alt ?? ""}
//       width={1400}
//       height={800}
//     />
//   )
// }

function Table({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className={`w-full ${className}`} {...props} />
    </div>
  )
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: CustomLink,
  blockquote: Blockquote,
  Callout,
  BlogImage,
  pre: CodeBlock,
  table: Table,
  // img: MdxImage,
}
