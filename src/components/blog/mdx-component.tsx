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

function H2({ children, ...props }: HeadingProps) {
  const title = typeof children === "string" ? children : ""

  const id = createHeadingId(title)

  return (
    <h2 id={id} className='scroll-mt-24' {...props}>
      {children}
    </h2>
  )
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const title = typeof children === "string" ? children : ""

  const id = createHeadingId(title)

  return (
    <h3 id={id} className='scroll-mt-24' {...props}>
      {children}
    </h3>
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
  h2: H2,
  h3: H3,
  a: CustomLink,
  blockquote: Blockquote,
  Callout,
  BlogImage,
  pre: CodeBlock,
  table: Table,
  // img: MdxImage,
}
