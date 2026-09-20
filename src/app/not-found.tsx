"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20 text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <section className="w-full max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>

          <span>404 · Page not found</span>
        </div>

        <div className="relative">
          <h1
            aria-label="404"
            className="
              select-none
              text-[clamp(8rem,28vw,18rem)]
              font-black
              leading-[0.72]
              tracking-[-0.09em]
              text-foreground
            "
          >
            404
          </h1>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            This page doesn&apos;t exist.
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            The page you&apos;re looking for may have been moved, deleted, or
            the URL might be incorrect.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="rounded-md border border-border bg-muted/40 px-3 py-2">
            REQUEST
          </span>

          <span className="text-muted-foreground/40">→</span>

          <span className="rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2 text-red-500">
            404
          </span>

          <span className="text-muted-foreground/40">→</span>

          <span className="rounded-md border border-border bg-muted/40 px-3 py-2">
            NOT FOUND
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="
              group
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-foreground
              px-6
              text-sm
              font-semibold
              text-background
              transition-all
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Go back home
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background/60
              px-6
              text-sm
              font-medium
              transition-colors
              hover:bg-muted
            "
          >
            <span>←</span>
            Go back
          </button>
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs text-muted-foreground/50">
            ROUTE_NOT_FOUND
          </p>

          <p className="mt-2 text-xs text-muted-foreground/40">
            Nothing to see here. Try another route.
          </p>
        </div>
      </section>

    </main>
  );
}
