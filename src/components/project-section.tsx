import MainLayout from "./main-layout";
import { ArrowUpRight } from "lucide-react";
import { Github } from "./socials";
import { Line } from "./lines";
import Link from "next/link";

export default function ProjectSection() {
  return (
    <MainLayout>
      <div className="w-full max-w-2xl rounded-md mx-auto py-4 px-4">
        <h2 className="text-[24px] font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="relative flex flex-col gap-1 border border-border/20 p-4 rounded-xs col-span-2 bg-background group">
            <div className="z-0 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold tracking-wide font-sans text-foreground">
                  Linkforge
                </h3>
                <p className="flex items-center justify-center gap-1 border border-border/25 px-1 py-0.5 rounded-full text-[10px] text-foreground/70">
                  <span className="w-2 h-2 bg-green-500 animate-pulse transition-colors duration-500 rounded-full" />
                  In Progress
                </p>
              </div>
              <ul className="space-y-1">
                <li className="font-display font-medium text-foreground/80">
                  Multi-tenant SaaS · Link-in-bio & analytics
                </li>
                <li className="font-display text-xs text-foreground/60 max-w-sm">
                  Built the parts that don&apos;t show up in a demo:
                  tenant-isolated data, username-change race condition
                </li>
              </ul>
              <div className="flex items-center gap-1">
                <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                  Analytics
                </p>
                <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                  Advance Backend
                </p>
                <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                  Production-Ready
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-1 z-50 absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="text-[18px] font-display cursor-pointer flex items-center gap-1">
                See full case study
                <ArrowUpRight className="size-5 text-foreground/70 transition-colors duration-150 group-hover:text-foreground" />
              </button>
              <Line type="horizontal" width={200} />
              <Link
                href="https://github.com/vishalgupta-02/linkforge.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="text-[14px] cursor-pointer flex items-center gap-1">
                  Source code
                  <Github />
                </button>
              </Link>
            </div>
          </div>
          <div className="border border-border/20 p-4 rounded-xs col-span-1 bg-background relative group">
            <div className="z-0 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[16px] font-semibold tracking-wide font-sans text-foreground">
                  Clariv
                </h3>
              </div>
              <ul className="space-y-1 mb-2">
                <li className="font-display font-medium text-foreground/80">
                  Document context extractor
                </li>
              </ul>
              <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                MVP Complete
              </p>
            </div>
            <div className="flex items-center justify-center flex-col gap-1 z-50 absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="text-[14px] font-display cursor-pointer flex items-center gap-1">
                See the demo
                <ArrowUpRight className="size-5 text-foreground/70 transition-colors duration-150 group-hover:text-foreground" />
              </button>
              <Line type="horizontal" width={200} />
              <Link
                href="https://github.com/vishalgupta-02/Clariv.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="text-[14px] cursor-pointer flex items-center gap-1">
                  Source code
                  <Github />
                </button>
              </Link>
            </div>
          </div>
          <div className="border border-border/20 p-4 rounded-xs col-span-1 bg-background relative group">
            <div className="z-0 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[16px] font-semibold tracking-wide font-sans text-foreground">
                  Careerly
                </h3>
              </div>
              <ul className="space-y-1 mb-2">
                <li className="font-display font-medium text-foreground/80">
                  Full-stack AI career coach
                </li>
              </ul>
              <div className="flex items-center gap-1">
                <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                  MCQ testing live
                </p>
                <p className="border border-border/25 px-1 py-0.5 rounded-full text-[9px] text-foreground/70 w-fit">
                  resume/cover-letter tooling in progress
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-1 z-50 absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="text-[14px] cursor-pointer font-display flex items-center gap-1">
                See the demo
                <ArrowUpRight className="size-5 text-foreground/70 transition-colors duration-150 group-hover:text-foreground" />
              </button>
              <Line type="horizontal" width={200} />
              <Link
                href="https://github.com/vishalgupta-02/Careerly.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="text-[14px] cursor-pointer flex items-center gap-1">
                  Source code
                  <Github />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
