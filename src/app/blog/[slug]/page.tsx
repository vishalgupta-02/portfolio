import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";

import {
  getAllPosts,
  getArticleNavigation,
  getPostBySlug,
  getRelatedArticles,
} from "@/lib/blog/blog";
import { mdxComponents } from "@/components/blog/mdx-component";
import { copyCodeTransformer } from "@/lib/blog/shiki";
import { BlogTag } from "@/components/blog/blog-tag";
import { RelatedArticles } from "@/components/blog/related-articles";
import { generateBlogMetadata } from "@/lib/blog/metadata";
import { generateBlogJsonLd } from "@/lib/blog/json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ViewModeSelector } from "@/components/blog/view-mode-selector";
import { ArticleContent } from "@/components/blog/article-content";
import { DualViewReadingTime } from "@/components/blog/dual-view-reading-time";
import { ShareButtons } from "@/components/ui/share-buttons";
import { BlogShareCard } from "@/components/blog/blog-share-card";
import { FloatingReadingProgress } from "@/components/blog/floating-reading-progress";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateBlogMetadata(slug, post);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxOptions: {
  mdxOptions: { remarkPlugins: any[]; rehypePlugins: any[] };
} = {
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
};

const CONTENT_PANEL_ID = "article-content-panel";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post || !post.metadata.published) {
    notFound();
  }

  const navigation = getArticleNavigation(slug);
  const navigationSlugs = [
    navigation.previous?.slug,
    navigation.next?.slug,
  ].filter((slug): slug is string => Boolean(slug));

  const relatedArticles = getRelatedArticles(slug, 2, navigationSlugs);
  const jsonLd = generateBlogJsonLd(slug, post);
  const hasDualView = post.metadata.dualView;

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="mx-auto max-w-2xl px-4 pt-6 pb-2">
        <div className="mb-4 w-full border-b pb-4">
          <Link
            href="/blog"
            className="text-primary flex items-center text-sm hover:underline"
          >
            <ArrowLeft className="mr-1 inline size-4" />
            Back to blog
          </Link>
        </div>

        <article className="min-w-0">
          <header className="mb-12 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight">
              {post.metadata.title}
            </h1>

            <p className="text-muted-foreground mt-4 max-w-xl text-sm">
              {post.metadata.description}
            </p>

            <div className="text-muted-foreground mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <time dateTime={post.metadata.publishedAt}>
                  {new Date(post.metadata.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>

                <span aria-hidden="true">·</span>

                {hasDualView ? (
                  <Suspense
                    fallback={<span>{post.readingTime.minutes} min read</span>}
                  >
                    <DualViewReadingTime
                      userReadingTime={post.readingTime}
                      developerReadingTime={post.developerReadingTime}
                    />
                  </Suspense>
                ) : (
                  <span>{post.readingTime.minutes} min read</span>
                )}
              </div>

              <ShareButtons
                url={`/blog/${slug}`}
                title={post.metadata.title}
                description={post.metadata.description}
                tags={post.metadata.tags}
                variant="compact"
              />
            </div>
            {post.metadata.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <BlogTag key={tag} tag={tag} />
                ))}
              </div>
            )}
            {post.metadata.image && (
              <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {hasDualView && (
              <Suspense fallback={null}>
                <ViewModeSelector contentPanelId={CONTENT_PANEL_ID} />
              </Suspense>
            )}
          </header>

          <Suspense
            fallback={
              <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-3xl">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              </div>
            }
          >
            <ArticleContent
              panelId={CONTENT_PANEL_ID}
              userContent={
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              }
              developerContent={
                post.developerContent ? (
                  <MDXRemote
                    source={post.developerContent}
                    components={mdxComponents}
                    options={mdxOptions}
                  />
                ) : null
              }
            />
          </Suspense>

          <div className="max-w-3xl">
            <BlogShareCard
              title={post.metadata.title}
              description={post.metadata.description}
              slug={slug}
              tags={post.metadata.tags}
            />

            <RelatedArticles articles={relatedArticles} />
          </div>

          <FloatingReadingProgress
            title={post.metadata.title}
            tableOfContents={post.tableOfContents}
          />
        </article>
      </main>
    </>
  );
}
