"use client";

import { Line } from "../lines";
import { Socials } from "../socials";
import { usePathname } from "next/navigation";
import { replayIntro } from "../intro-loader";

type Props = {
  quote: Awaited<ReturnType<typeof import("@/hooks/get-quotes").getQuotes>>;
};

export default function FooterContent({ quote }: Props) {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";

  if (isBlogPage) {
    return null;
  }

  return (
    <footer className="mx-auto w-full max-w-2xl rounded-md px-4 py-0 mb-8">
      <Line type="horizontal" width={640} className="my-8" />

      {quote && (
        <div className="bg-muted/20 border-border/60 hover:border-border hover:bg-muted/30 transition-all duration-200 flex w-full flex-col gap-3 rounded-xl border p-4 shadow-xs">
          <p className="text-center text-sm font-display text-foreground/90">
            “ {quote.quote} ”
          </p>

          <div className="space-y-1 text-right">
            <p className="font-display text-xs italic text-muted-foreground">
              — {quote.author?.name},{" "}
              <span className="text-foreground/80 font-medium ml-1">
                {quote.author?.company.name}
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="my-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-sans text-xl font-semibold tracking-tight text-foreground">
            Connect With Me
          </p>
          <p className="font-display text-xs text-muted-foreground mt-0.5">
            Open for technical discussions, systems design, and backend roles
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <Socials />
        </div>
      </div>

      <Line type="horizontal" width={640} className="mt-8 mb-4" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <p className="font-display text-xs font-light">
          &copy; {new Date().getFullYear()} Vishal Gupta. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-muted/40 border border-border/50 px-2 py-0.5 rounded-full text-[10px]">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
            </span>
            <span className="text-foreground/80">Systems Nominal</span>
          </div>

          <button
            type="button"
            onClick={() => replayIntro()}
            className="hover:text-foreground border border-border/60 hover:border-border bg-background px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer hover:bg-muted/40 active:scale-95"
          >
            Replay Boot
          </button>
        </div>
      </div>
    </footer>
  );
}
