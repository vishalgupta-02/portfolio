"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Mail,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Github, LinkedIn, X, Discord } from "@/components/socials";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("abhimanyug987@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = "mailto:abhimanyug987@gmail.com";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) {
      setStatus("error");
      setErrorMessage("Please enter both your email and a brief message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try emailing directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Available For Roles & Architecture Review
          </span>
        </div>

        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
          <h2 className="text-foreground font-sans text-2xl font-bold tracking-tight">
            Connect & Contact
          </h2>
          <span className="text-muted-foreground font-mono text-xs">
            Fast reply to your inbox
          </span>
        </div>

        <p className="text-muted-foreground font-display text-xs leading-relaxed sm:text-sm">
          Open for high-impact backend engineering roles, system design
          consulting, or discussing distributed architectures. Send a direct
          note or connect below.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Redesigned Connect With Me: Interactive Channels Grid */}
        <div className="space-y-2.5">
          <span className="text-muted-foreground/80 block font-mono text-[11px] tracking-wider uppercase">
            Active Channels
          </span>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {/* Direct Email Card with Click-to-Copy */}
            <div
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              aria-label="Copy direct email address"
              className="group border-border/40 bg-card/30 hover:bg-card/70 relative flex cursor-pointer items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 hover:border-emerald-500/40 active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105 group-hover:border-emerald-500/30">
                  <Mail className="size-4 text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <span className="text-foreground block truncate font-sans text-xs font-semibold">
                    abhimanyug987@gmail.com
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 font-mono text-[10px]">
                    Primary Inbox · Direct
                  </span>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                <AnimatePresence mode="wait">
                  {copiedEmail ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400"
                    >
                      <Check className="size-3" />
                      <span>Copied</span>
                    </motion.span>
                  ) : (
                    <span className="border-border/40 bg-background/60 text-muted-foreground group-hover:text-foreground group-hover:border-border flex size-7 items-center justify-center rounded-md border transition-colors">
                      <Copy className="size-3" />
                    </span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* GitHub Card */}
            <Link
              href="https://github.com/vishalgupta-02"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/70 flex items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
                  <Github className="text-foreground size-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <span className="text-foreground block truncate font-sans text-xs font-semibold">
                    vishalgupta-02
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    GitHub · Open Source Repos
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* X / Twitter Card */}
            <Link
              href="https://x.com/v1shalworks"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/70 flex items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
                  <X className="text-foreground size-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <span className="text-foreground block truncate font-sans text-xs font-semibold">
                    @v1shalworks
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    X / Twitter · Systems & Devlogs
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* LinkedIn Card */}
            <Link
              href="https://www.linkedin.com/in/v1shalgupt9"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/70 flex items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
                  <LinkedIn className="text-foreground size-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <span className="text-foreground block truncate font-sans text-xs font-semibold">
                    Vishal Gupta
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    LinkedIn · Professional Profile
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Discord Card */}
            <Link
              href="https://www.discord.com/users/v1shal_gupt9"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/70 col-span-1 flex items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 active:scale-[0.99] sm:col-span-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
                  <Discord className="text-foreground size-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <span className="text-foreground block truncate font-sans text-xs font-semibold">
                    v1shal_gupt9
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    Discord · Developer Chat & Real-Time Collaborations
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Direct Contact Form */}
        <div className="border-border/40 bg-card/25 space-y-4 rounded-xl border p-4 shadow-xs sm:p-5">
          <div className="border-border/30 flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-emerald-500" />
              <span className="text-foreground font-sans text-xs font-semibold">
                Direct Message
              </span>
            </div>
            <span className="text-muted-foreground font-mono text-[10px]">
              Delivered via Resend to my inbox
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label
                  htmlFor="contact-name"
                  className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or company"
                  maxLength={100}
                  className="border-border/50 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-foreground/20 font-display w-full rounded-lg border px-3 py-2 text-xs transition-all focus:ring-1 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase"
                >
                  Your Email <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  maxLength={120}
                  className="border-border/50 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-foreground/20 font-display w-full rounded-lg border px-3 py-2 text-xs transition-all focus:ring-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="contact-message"
                className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase"
              >
                Message <span className="text-emerald-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}

                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building? Tell me about the role, challenge, or project..."
                maxLength={3000}
                className="border-border/50 bg-background/70 text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:ring-foreground/20 font-display min-h-[100px] max-h-[260px] w-full resize-y rounded-lg border px-3 py-2 text-xs transition-all focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Error State */}
            {status === "error" && errorMessage && (
              <div
                role="alert"
                className="font-display flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-600 dark:text-rose-400"
              >
                <span className="font-mono font-bold">!</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success State */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="font-display flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400"
              >
                <Check className="size-4 shrink-0 text-emerald-500" />
                <span>
                  Message dispatched successfully! I will reply directly to your
                  email shortly.
                </span>
              </motion.div>
            )}

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground/70 hidden font-mono text-[10px] sm:inline">
                Encrypted in transit · Delivered directly
              </span>

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium shadow-xs transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
