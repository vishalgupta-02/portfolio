"use client";

import Link from "next/link";
import { Github, X, LinkedIn, Discord, Email } from "../socials";
import { usePathname } from "next/navigation";

type Props = {
  quote: Awaited<ReturnType<typeof import("@/hooks/get-quotes").getQuotes>>;
};

export default function FooterContent({ quote }: Props) {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";
  const isHomePage = pathname === "/";

  if (isBlogPage) {
    return null;
  }

  return (
    <footer className="mx-auto mb-8 w-full max-w-2xl rounded-md px-4 py-0">
      <hr className="border-border/40 my-8" />

      {quote && (
        <div className="bg-muted/20 border-border/60 hover:border-border hover:bg-muted/30 flex w-full flex-col gap-3 rounded-xl border p-4 shadow-xs transition-all duration-200">
          <p className="font-display text-foreground/90 text-center text-sm">
            “ {quote.quote} ”
          </p>

          <div className="space-y-1 text-right">
            <p className="font-display text-muted-foreground text-xs italic">
              — {quote.author?.name},{" "}
              <span className="text-foreground/80 ml-1 font-medium">
                {quote.author?.company.name}
              </span>
            </p>
          </div>
        </div>
      )}

      {!isHomePage && (
        <div className="border-border/40 bg-card/30 hover:border-border/70 hover:bg-card/50 my-8 space-y-4 rounded-2xl border p-5 shadow-xs transition-all duration-200 sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  Connectivity & Collaboration
                </span>
              </div>
              <p className="text-foreground font-sans text-lg font-bold tracking-tight sm:text-xl">
                Connect With Me
              </p>
              <p className="font-display text-muted-foreground mt-0.5 max-w-md text-xs leading-relaxed">
                Open for technical discussions, distributed systems, and backend
                engineering roles.
              </p>
            </div>

            <Link
              href="/#contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-xs font-medium shadow-xs transition-all active:scale-95 sm:self-auto"
            >
              <span>Direct Message</span>
              <span className="font-mono text-[10px]">→</span>
            </Link>
          </div>

          <div className="border-border/30 flex flex-wrap items-center gap-2 border-t pt-2">
            <Link
              href="https://github.com/vishalgupta-02"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 bg-background/60 hover:bg-muted/60 hover:border-border text-foreground inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Github className="size-3.5 shrink-0" />
              <span className="font-mono text-[11px] leading-none">GitHub</span>
            </Link>

            <Link
              href="https://x.com/v1shalworks"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 bg-background/60 hover:bg-muted/60 hover:border-border text-foreground inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <X className="size-3.5 shrink-0" />
              <span className="font-mono text-[11px] leading-none">
                Twitter / X
              </span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/v1shalgupt9"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 bg-background/60 hover:bg-muted/60 hover:border-border text-foreground inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <LinkedIn className="size-3.5 shrink-0" />
              <span className="font-mono text-[11px] leading-none">
                LinkedIn
              </span>
            </Link>

            <Link
              href="https://www.discord.com/users/v1shal_gupt9"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 bg-background/60 hover:bg-muted/60 hover:border-border text-foreground inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Discord className="size-3.5 shrink-0" />
              <span className="font-mono text-[11px] leading-none">
                Discord
              </span>
            </Link>

            <Link
              href="mailto:abhimanyug987@gmail.com"
              className="border-border/50 bg-background/60 hover:bg-muted/60 hover:border-border text-foreground inline-flex h-8 items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-2xs transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <Email className="size-3.5 shrink-0" />
              <span className="font-mono text-[11px] leading-none">Email</span>
            </Link>
          </div>
        </div>
      )}

      <hr className="border-border/40 mt-8 mb-4" />

      <div className="flex flex-col gap-4 font-mono text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-sans font-semibold text-foreground">Vishal Gupta</span>
            <span className="text-muted-foreground ml-2 text-[11px]">Backend & Systems Engineer</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-sans">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="/#engineering" className="hover:text-foreground transition-colors">Engineering</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Writing</Link>
            <Link href="/postmortems" className="hover:text-foreground transition-colors">Postmortems</Link>
            <Link href="/now" className="hover:text-foreground transition-colors">Now</Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/20 pt-3">
          <p className="font-display text-xs font-light">
            &copy; {new Date().getFullYear()} Vishal Gupta. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <div className="bg-muted/40 border-border/50 flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px]">
              <span className="size-1.5 rounded-full bg-emerald-500/80" />
              <span className="text-foreground/80 font-mono">Portfolio v2.4</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
