import Image from "next/image";
import CurrentlyPlaying from "./song-exp";
import { Socials } from "./socials";

export default function Hero() {
  return (
    <section className="w-full flex flex-col gap-7 py-8 px-4 border-b border-border/40">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="group relative size-20 sm:size-22 shrink-0 rounded-xl border border-border/50 bg-muted/20 overflow-hidden shadow-xs ring-1 ring-border/30 hover:ring-border hover:shadow-md transition-all duration-300">
            <Image
              src="/static/vishal-gupta.webp"
              alt="Vishal Gupta"
              width={250}
              height={250}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold font-sans tracking-tight text-foreground">
                Vishal Gupta
              </h1>
            </div>
            <p className="font-mono text-xs sm:text-sm text-muted-foreground font-normal">
              Backend & Systems Engineer
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span
                title="Open to high-impact distributed systems and backend engineering opportunities"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400/90 transition-all cursor-default"
              >
                <span className="relative flex size-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
                </span>
                Available for Roles
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <p className="text-base sm:text-lg font-display font-medium text-foreground/90 leading-snug">
          I care more about why it broke than that it works.
        </p>
        <p className="text-xs sm:text-sm font-display text-muted-foreground leading-relaxed">
          Detail-obsessed engineer specializing in distributed backend architecture, multi-tenant databases, concurrency safety, and high-performance telemetry.
        </p>

        <div className="pt-2 flex flex-col gap-3.5">
          <CurrentlyPlaying />
          <Socials />
        </div>
      </div>
    </section>
  );
}


