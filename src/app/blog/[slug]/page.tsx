import { ArticleContent } from "@/components/blog/article-content";
import { BlogShareCard } from "@/components/blog/blog-share-card";
import { DualViewReadingTime } from "@/components/blog/dual-view-reading-time";
import { FloatingReadingProgress } from "@/components/blog/floating-reading-progress";
import { mdxComponents } from "@/components/blog/mdx-component";
import { RelatedArticles } from "@/components/blog/related-articles";
import { ViewModeSelector } from "@/components/blog/view-mode-selector";
import MainLayout from "@/components/main-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ShareButtons } from "@/components/ui/share-buttons";
import {
  getAllPosts,
  getArticleNavigation,
  getPostBySlug,
  getRelatedArticles,
} from "@/lib/blog/blog";
import { generateBlogJsonLd } from "@/lib/blog/json-ld";
import { generateBlogMetadata } from "@/lib/blog/metadata";
import { copyCodeTransformer } from "@/lib/blog/shiki";
import rehypeShiki from "@shikijs/rehype";
import { ArrowLeft, Calendar, Clock, Layers } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import remarkGfm from "remark-gfm";

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
  const primaryTag = post.metadata.tags[0] || "Architecture";

  return (
    <MainLayout>
      <JsonLd data={jsonLd} />

      <main className="mx-auto max-w-2xl px-4 pt-6 pb-16">
        {/* Back Navigation */}
        <div className="border-border/50 mb-6 w-full border-b pb-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground inline-flex items-center font-mono text-xs transition-colors"
          >
            <ArrowLeft className="mr-1.5 inline size-3.5" aria-hidden="true" />
            Back to all articles
          </Link>
        </div>

        <article className="min-w-0">
          {/* Header */}
          <header className="mb-10 max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="border-border/60 bg-muted/40 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase">
                {primaryTag}
              </span>

              {hasDualView && (
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                  <Layers className="size-3" aria-hidden="true" />
                  Dual-View Available
                </span>
              )}
            </div>

            <h1 className="text-foreground font-sans text-2xl leading-tight font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {post.metadata.title}
            </h1>

            <p className="text-muted-foreground font-display mt-3 text-sm leading-relaxed sm:text-base">
              {post.metadata.description}
            </p>

            {/* Metadata and Share Bar */}
            <div className="text-muted-foreground border-border/50 mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1">
                  <Calendar
                    className="text-muted-foreground/70 size-3"
                    aria-hidden="true"
                  />
                  <time dateTime={post.metadata.publishedAt}>
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </time>
                </span>

                <span aria-hidden="true">·</span>

                <span className="inline-flex items-center gap-1">
                  <Clock
                    className="text-muted-foreground/70 size-3"
                    aria-hidden="true"
                  />
                  {hasDualView ? (
                    <Suspense
                      fallback={
                        <span>{post.readingTime.minutes} min read</span>
                      }
                    >
                      <DualViewReadingTime
                        userReadingTime={post.readingTime}
                        developerReadingTime={post.developerReadingTime}
                      />
                    </Suspense>
                  ) : (
                    <span>{post.readingTime.minutes} min read</span>
                  )}
                </span>
              </div>

              <ShareButtons
                url={`/blog/${slug}`}
                title={post.metadata.title}
                description={post.metadata.description}
                tags={post.metadata.tags}
                variant="compact"
              />
            </div>

            {/* Tags Pills */}
            {post.metadata.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-border/50 bg-muted/20 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {post.metadata.image && (
              <div className="border-border/40 relative mt-8 aspect-video overflow-hidden rounded-2xl border">
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

          {/* Article Body */}
          <Suspense
            fallback={
              <div className="prose prose-neutral dark:prose-invert prose-pre:bg-transparent prose-pre:p-0 text-foreground/90 max-w-3xl">
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

          {/* Share Card & Related Articles */}
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

      <ProgressiveBlur height="4rem" position="bottom" />
    </MainLayout>
  );
}
