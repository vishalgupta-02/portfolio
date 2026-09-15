"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-background text-foreground relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />

        {/* Decorative blobs */}
        <div className="bg-primary/5 absolute top-[15%] left-[10%] h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute right-[10%] bottom-[10%] h-40 w-40 rounded-full blur-3xl" />
      </div>

      <section className="relative mx-auto w-full max-w-3xl text-center">
        {/* Error indicator */}
        <div className="border-border/60 bg-background/70 text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-sm backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>

          <span>Something went wrong</span>
        </div>

        {/* Main visual */}
        <div className="relative">
          <h1 className="text-foreground text-[clamp(7rem,24vw,16rem)] leading-[0.75] font-black tracking-[-0.08em] select-none">
            500
          </h1>

          {/* Decorative separator */}
          <div className="mx-auto mt-10 flex max-w-xs items-center gap-3">
            <div className="bg-border h-px flex-1" />
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            <div className="bg-border h-px flex-1" />
          </div>
        </div>

        {/* Message */}
        <div className="mx-auto mt-10 max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Something broke on our side.
          </h2>

          <p className="text-muted-foreground mt-4 text-base leading-7 sm:text-lg">
            An unexpected error occurred while processing your request. Try
            again, or head back to a safe place.
          </p>
        </div>

        {/* System status */}
        <div className="border-border/60 bg-muted/20 mx-auto mt-10 max-w-md rounded-xl border p-4 text-left backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground font-mono text-xs">
              SYSTEM STATUS
            </span>

            <span className="inline-flex items-center gap-2 font-mono text-xs text-red-500">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              DEGRADED
            </span>
          </div>

          <div className="bg-border/60 mt-3 h-px" />

          <div className="mt-3 flex items-center justify-between font-mono text-xs">
            <span className="text-muted-foreground">REQUEST</span>

            <span className="text-foreground">FAILED</span>
          </div>

          {error?.digest && (
            <div className="mt-2 flex items-center justify-between gap-4 font-mono text-xs">
              <span className="text-muted-foreground">ERROR ID</span>

              <span className="text-muted-foreground max-w-[180px] truncate">
                {error.digest}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="group bg-foreground text-background inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Try again
            <span className="transition-transform duration-200 group-hover:rotate-180">
              ↻
            </span>
          </button>

          <Link
            href="/"
            className="border-border bg-background/50 hover:bg-muted inline-flex h-11 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors"
          >
            Go home
          </Link>
        </div>

        {/* Developer easter egg */}
        <p className="text-muted-foreground/50 mt-12 font-mono text-xs">
          ERR_INTERNAL_SERVER_ERROR // please try again
        </p>
      </section>
    </main>
  );
}
