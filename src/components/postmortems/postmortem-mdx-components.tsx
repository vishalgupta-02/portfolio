import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import React from "react";

import { createHeadingId } from "@/lib/blog/heading";
import { CopyButton } from "@/components/blog/copy-button";
import { PostmortemCallout } from "./postmortem-callout";
import { Timeline, TimelineEvent } from "./postmortem-timeline";
import { PostmortemSeverityBadge } from "./postmortem-severity";
import { PostmortemStatusBadge } from "./postmortem-status";
import { PostmortemSummary } from "./postmortem-summary";

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    (node as { props?: { children?: React.ReactNode } }).props?.children
  ) {
    return getNodeText(
      (node as { props: { children: React.ReactNode } }).props.children,
    );
  }
  return "";
}

function H1({ children, ...props }: ComponentPropsWithoutRef<"h1">) {
  const title = getNodeText(children);
  const id = createHeadingId(title);

  return (
    <h1
      id={id}
      className="text-foreground my-6 scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl"
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const title = getNodeText(children);
  const id = createHeadingId(title);

  return (
    <h2
      id={id}
      className="border-border/60 text-foreground my-6 scroll-mt-24 border-b pb-2 text-xl font-semibold tracking-tight sm:text-2xl"
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const title = getNodeText(children);
  const id = createHeadingId(title);

  return (
    <h3
      id={id}
      className="text-foreground my-4 scroll-mt-24 text-lg font-semibold sm:text-xl"
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ children, ...props }: ComponentPropsWithoutRef<"h4">) {
  const title = getNodeText(children);
  const id = createHeadingId(title);

  return (
    <h4
      id={id}
      className="text-foreground my-3 scroll-mt-24 text-base font-medium sm:text-lg"
      {...props}
    >
      {children}
    </h4>
  );
}

function CustomLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}

function Blockquote({
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="border-border text-muted-foreground my-5 border-l-2 pl-4 text-sm italic"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function CodeBlock({
  children,
  "data-code": code = "",
  ...props
}: ComponentPropsWithoutRef<"pre"> & {
  "data-code"?: string;
}) {
  return (
    <div className="group relative my-6">
      <div className="absolute top-3 right-3 z-10">
        <CopyButton code={code} />
      </div>

      <pre
        {...props}
        className={`
            ${props.className ?? ""}
            border-border
            overflow-x-auto
            rounded-xl
            border
            p-4
            text-xs
            sm:text-sm
          `}
      >
        {children}
      </pre>
    </div>
  );
}

function Table({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="border-border my-6 w-full overflow-x-auto rounded-xl border">
      <table
        className={`w-full text-left text-xs sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead
      className={`border-border bg-muted/40 text-muted-foreground border-b font-mono text-xs tracking-wider uppercase ${className}`}
      {...props}
    />
  );
}

function TableRow({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={`border-border/60 hover:bg-muted/20 border-b transition-colors last:border-0 ${className}`}
      {...props}
    />
  );
}

function TableHead({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return <th className={`p-3 font-semibold ${className}`} {...props} />;
}

function TableCell({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return <td className={`p-3 align-top ${className}`} {...props} />;
}

function Paragraph({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"p">) {
  // If the paragraph wraps a block element (like figure, div, or PostmortemImage), render a div to prevent hydration mismatch
  const hasBlockChild = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === PostmortemImage ||
        child.type === "figure" ||
        child.type === "div"),
  );

  if (hasBlockChild) {
    return (
      <div className={`my-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <p className={`leading-7 ${className}`} {...props}>
      {children}
    </p>
  );
}

function Img({
  src,
  alt = "",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"img">) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`border-border/80 bg-muted/20 my-6 h-auto w-full rounded-xl border object-contain shadow-xs ${className}`}
      {...props}
    />
  );
}

export function PostmortemImage({
  src,
  alt = "",
  caption,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"img"> & { caption?: string }) {
  if (!src) return null;
  return (
    <figure className="border-border/80 bg-muted/20 my-8 overflow-hidden rounded-xl border shadow-xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-auto w-full object-contain ${className}`}
        {...props}
      />
      {(caption || alt) && (
        <figcaption className="border-border/50 bg-muted/40 text-muted-foreground border-t px-4 py-2.5 text-center font-mono text-xs">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  );
}

export const postmortemMdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: CustomLink,
  blockquote: Blockquote,
  pre: CodeBlock,
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  img: Img,
  PostmortemImage,
  BlogImage: PostmortemImage,
  Callout: PostmortemCallout,
  PostmortemCallout,
  Timeline,
  TimelineEvent,
  PostmortemSummary,
  PostmortemSeverityBadge,
  PostmortemStatusBadge,
};
