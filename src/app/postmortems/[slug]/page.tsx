import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeShiki from "@shikijs/rehype"
import remarkGfm from "remark-gfm"

import {
  getAllPostmortems,
  getPostmortemBySlug,
  getPostmortemNavigation,
  getRelatedPostmortems,
} from "@/lib/postmortems/loader"
import { postmortemMdxComponents } from "@/components/postmortems/postmortem-mdx-components"
import { copyCodeTransformer } from "@/lib/blog/shiki"
import { generatePostmortemMetadata } from "@/lib/postmortems/metadata"
import { generatePostmortemJsonLd } from "@/lib/postmortems/json-ld"
import { JsonLd } from "@/components/seo/json-ld"
import { PostmortemHeader } from "@/components/postmortems/postmortem-header"
import { PostmortemSummary } from "@/components/postmortems/postmortem-summary"
import { PostmortemNavigationNav } from "@/components/postmortems/postmortem-navigation"
import { RelatedPostmortems } from "@/components/postmortems/related-postmortems"
import { extractTableOfContents } from "@/lib/blog/table-of-contents"
import { FloatingReadingProgress } from "@/components/blog/floating-reading-progress"

interface PostmortemDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  const postmortems = getAllPostmortems()
  return postmortems.map((pm) => ({
    slug: pm.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostmortemDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const postmortem = getPostmortemBySlug(slug)

  if (!postmortem) {
    return {}
  }

  return generatePostmortemMetadata(slug, postmortem)
}

import type { ComponentProps } from "react"

const mdxOptions: ComponentProps<typeof MDXRemote>["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          transformers: [copyCodeTransformer],
        },
      ],
    ],
  },
}


export default async function PostmortemDetailPage({
  params,
}: PostmortemDetailPageProps) {
  const { slug } = await params
  const postmortem = getPostmortemBySlug(slug)

  if (!postmortem || !(postmortem.metadata.published ?? true)) {
    notFound()
  }

  const navigation = getPostmortemNavigation(slug)
  const navigationSlugs = [
    navigation.previous?.slug,
    navigation.next?.slug,
  ].filter((s): s is string => Boolean(s))

  const related = getRelatedPostmortems(slug, 2, navigationSlugs)
  const jsonLd = generatePostmortemJsonLd(slug, postmortem)
  const toc = extractTableOfContents(postmortem.content)

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="mx-auto max-w-2xl px-4 pt-6 pb-12">
        <article className="min-w-0">
          <PostmortemHeader
            slug={slug}
            metadata={postmortem.metadata}
            readingMinutes={postmortem.readingTime.minutes}
          />

          <PostmortemSummary metadata={postmortem.metadata} />

          {/* MDX Body Content */}
          <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none text-foreground/90">
            <MDXRemote
              source={postmortem.content}
              components={postmortemMdxComponents}
              options={mdxOptions}
            />
          </div>

          <PostmortemNavigationNav navigation={navigation} />

          <RelatedPostmortems postmortems={related} />

          <FloatingReadingProgress
            title={postmortem.metadata.title}
            tableOfContents={toc}
          />
        </article>
      </main>
    </>
  )
}
