"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  ArrowRight,
  BookOpen,
  FileText,
  Layers,
  Terminal,
  ExternalLink,
  Copy,
  Moon,
  Sun,
  Keyboard,
  Compass,
} from "lucide-react";
import { GLOBAL_SEARCH_ITEMS, getRandomInterestingItem, type SearchItem } from "@/lib/content-index";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Global keydown handler: Cmd+K, "/", and "G +" shortcuts
  useEffect(() => {
    let pendingGKey = false;
    let gTimeout: NodeJS.Timeout | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        (activeEl instanceof HTMLElement && activeEl.isContentEditable);

      // Cmd+K or Ctrl+K
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((curr) => !curr);
        return;
      }

      // "/" opens search when not in an input
      if (e.key === "/" && !isInputActive && !open) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      // Do not handle navigation shortcuts when inside input or when modal is open
      if (isInputActive || open) {
        return;
      }

      // Handle "G" two-key navigation sequences
      if (e.key === "g" || e.key === "G") {
        pendingGKey = true;
        if (gTimeout) clearTimeout(gTimeout);
        gTimeout = setTimeout(() => {
          pendingGKey = false;
        }, 1200);
        return;
      }

      if (pendingGKey) {
        pendingGKey = false;
        if (gTimeout) clearTimeout(gTimeout);

        switch (e.key.toLowerCase()) {
          case "h":
            e.preventDefault();
            router.push("/");
            break;
          case "p":
            e.preventDefault();
            router.push("/projects");
            break;
          case "e":
            e.preventDefault();
            router.push("/postmortems");
            break;
          case "b":
          case "w":
            e.preventDefault();
            router.push("/blog");
            break;
          case "x":
            e.preventDefault();
            router.push("/work");
            break;
          case "c":
            e.preventDefault();
            router.push("/#contact");
            break;
          case "n":
            e.preventDefault();
            router.push("/now");
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (gTimeout) clearTimeout(gTimeout);
    };
  }, [open, router]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      setSearch("");
      if (item.external) {
        window.open(item.url, "_blank");
      } else {
        router.push(item.url);
      }
    },
    [router]
  );

  const handleAction = useCallback(
    (action: "theme" | "copy-email" | "github" | "linkedin" | "random") => {
      setOpen(false);
      setSearch("");
      switch (action) {
        case "theme":
          setTheme(theme === "dark" ? "light" : "dark");
          break;
        case "copy-email":
          navigator.clipboard?.writeText("abhimanyug987@gmail.com");
          break;
        case "github":
          window.open("https://github.com/vishalgupta-02", "_blank");
          break;
        case "linkedin":
          window.open("https://linkedin.com/in/v1shalgupt9", "_blank");
          break;
        case "random": {
          const item = getRandomInterestingItem();
          router.push(item.url);
          break;
        }
        default:
          break;
      }
    },
    [theme, setTheme, router]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open global search and command palette"
        className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/60 bg-muted/20 px-2 sm:px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs transition-all duration-200 hover:border-border hover:bg-muted/50 hover:text-foreground active:scale-95 cursor-pointer shrink-0"
      >
        <Search className="size-3 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        <span className="hidden sm:inline font-mono text-[11px]">Search</span>
        <span className="inline-flex items-center gap-0.5 rounded border border-border/80 bg-background/80 px-1 sm:px-1.5 py-0.2 font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
          <span>⌘</span>
          <span>K</span>
        </span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Workspace Command Menu"
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-16 sm:pt-24 backdrop-blur-sm animate-in fade-in-0 duration-150"
      >
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl ring-1 ring-border/50">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search projects, postmortems, articles, or jump to page..."
              className="h-9 w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-sans"
            />
            <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-muted-foreground">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="rounded-xl border border-dashed border-border/60 px-4 py-8 text-center text-xs font-mono text-muted-foreground">
              No matching content found for &quot;{search}&quot;.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group
              heading="Quick Actions & Discovery"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              <Command.Item
                value="random interesting discovery explore"
                onSelect={() => handleAction("random")}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  <Compass className="size-3.5 text-muted-foreground" />
                  <span>Give Me Something Interesting →</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">Random Deep Dive</span>
              </Command.Item>

              <Command.Item
                value="toggle theme dark light mode"
                onSelect={() => handleAction("theme")}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  {theme === "dark" ? <Sun className="size-3.5 text-muted-foreground" /> : <Moon className="size-3.5 text-muted-foreground" />}
                  <span>Toggle Color Theme</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">Light / Dark</span>
              </Command.Item>

              <Command.Item
                value="copy direct email abhimanyug987@gmail.com"
                onSelect={() => handleAction("copy-email")}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              >
                <span className="flex items-center gap-2">
                  <Copy className="size-3.5 text-muted-foreground" />
                  <span>Copy Direct Email (abhimanyug987@gmail.com)</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">Clipboard</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="my-1.5 h-px bg-border/60" />

            {/* Navigation Pages */}
            <Command.Group
              heading="Navigation"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {GLOBAL_SEARCH_ITEMS.filter((i) => i.category === "Navigation").map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <span className="font-sans">{item.title}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{item.url}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-1.5 h-px bg-border/60" />

            {/* Engineering Postmortems */}
            <Command.Group
              heading="Production Postmortems"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {GLOBAL_SEARCH_ITEMS.filter((i) => i.category === "Postmortem").map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-sans truncate">{item.title}</span>
                    <span className="font-display text-[11px] text-muted-foreground truncate">{item.description}</span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 shrink-0">Incident</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-1.5 h-px bg-border/60" />

            {/* Projects & Systems */}
            <Command.Group
              heading="Projects & Case Studies"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {GLOBAL_SEARCH_ITEMS.filter((i) => i.category === "Project" || i.category === "Case Study").map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-sans truncate">{item.title}</span>
                    <span className="font-display text-[11px] text-muted-foreground truncate">{item.description}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">{item.badge || item.category}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-1.5 h-px bg-border/60" />

            {/* Technical Articles */}
            <Command.Group
              heading="Technical Articles"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {GLOBAL_SEARCH_ITEMS.filter((i) => i.category === "Article").map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-sans truncate">{item.title}</span>
                    <span className="font-display text-[11px] text-muted-foreground truncate">{item.description}</span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 shrink-0">Article</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="my-1.5 h-px bg-border/60" />

            {/* Technical Stack Evidence */}
            <Command.Group
              heading="Technical Stack Evidence"
              className="px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {GLOBAL_SEARCH_ITEMS.filter((i) => i.category === "Technology").map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-sans truncate">{item.title}</span>
                    <span className="font-display text-[11px] text-muted-foreground truncate">{item.description}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">Evidence</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer Shortcuts Guide */}
          <div className="border-t border-border bg-muted/30 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Navigation:</span>
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">G H</kbd> Home
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">G P</kbd> Projects
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">G E</kbd> Postmortems
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">G B</kbd> Blog
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">↑↓</kbd> navigate
              <kbd className="rounded border border-border/80 bg-background px-1 py-0.2">↵</kbd> select
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
