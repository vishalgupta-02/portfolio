// import MainLayout from "@/components/main-layout";
// import Link from "next/link";

// export default function BlogNotFound() {
//   return (
//     <MainLayout>
//       <main className="mx-auto max-w-3xl px-6 py-24">
//         <h1 className="text-3xl font-bold tracking-tight">Article not found</h1>

//         <p className="mt-4 text-muted-foreground">
//           The article you&apos;re looking for doesn&apos;t exist or may have
//           been moved.
//         </p>

//         <Link
//           href="/blog"
//           className="mt-8 inline-block font-medium underline underline-offset-4"
//         >
//           Back to blog
//         </Link>
//       </main>
//     </MainLayout>
//   );
// }

// ! ---------------------------------------------------------

import MainLayout from "@/components/main-layout";
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <MainLayout>
      <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-16">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <section className="relative mx-auto w-full max-w-3xl text-center">
          {/* Status */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>

            <span>404 · Route not found</span>
          </div>

          {/* 404 */}
          <div className="relative select-none">
            <h1
              aria-label="404"
              className="text-[clamp(8rem,25vw,18rem)] font-black leading-[0.75] tracking-[-0.08em] text-foreground"
            >
              404
            </h1>

            {/* Decorative line */}
            <div className="mx-auto mt-8 flex max-w-xs items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* Content */}
          <div className="mx-auto mt-10 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Looks like this route took a wrong turn.
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              The article you&apos;re looking for doesn&apos;t exist, was moved,
              or the URL might be slightly off.
            </p>
          </div>

          {/* Route visualization */}
          <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="rounded-md border border-border bg-muted/40 px-3 py-2">
              /blog
            </span>

            <span className="text-muted-foreground/50">→</span>

            <span className="rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2 text-red-500">
              /404
            </span>

            <span className="text-muted-foreground/50">→</span>

            <span className="rounded-md border border-border bg-muted/40 px-3 py-2">
              ?
            </span>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore the blog
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background/50 px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Go home
            </Link>
          </div>

          {/* Tiny developer easter egg */}
          <p className="mt-12 font-mono text-xs text-muted-foreground/50">
            Error: RESOURCE_NOT_FOUND
          </p>
        </section>
      </main>
    </MainLayout>
  );
}
