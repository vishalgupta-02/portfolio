"use client";

import { useState, useEffect } from "react";
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

type ContactIntent = "hiring" | "collab" | "opensource" | "hello";

const INTENT_PLACEHOLDERS: Record<ContactIntent, string> = {
  hiring: "Hi Vishal, we have an open role for a Backend / Systems Engineer. Here are details about the team, stack, and scope...",
  collab: "Hi Vishal, I am designing/troubleshooting a distributed system and wanted to discuss...",
  opensource: "Hi Vishal, reaching out regarding open source, telemetry, or tool development...",
  hello: "Hi Vishal, just dropping a quick note to say hello and connect...",
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState<ContactIntent>("hiring");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const feedbackTarget = params.get("feedback") || params.get("ref");
    const intentParam = params.get("intent") as ContactIntent | null;

    if (intentParam && INTENT_PLACEHOLDERS[intentParam]) {
      setIntent(intentParam);
    }

    if (feedbackTarget) {
      const targetName =
        feedbackTarget.charAt(0).toUpperCase() + feedbackTarget.slice(1);
      setMessage((prev) =>
        prev ? prev : `Hi Vishal, sharing some feedback regarding ${targetName}: `
      );
      const textarea = document.getElementById("contact-message");
      if (textarea) {
        setTimeout(() => textarea.focus(), 250);
      }
    }
  }, []);

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
      setErrorMessage("Please enter both your email and a message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `[Intent: ${intent.toUpperCase()}]\n\n${message}`,
        }),
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
          : "Transmission failed. Please email abhimanyug987@gmail.com directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="border-border/40 mx-auto w-full max-w-2xl border-b px-4 py-8 scroll-mt-20"
      aria-label="Contact and Technical Collaboration"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Available For Roles &amp; Systems Collaboration
          </span>
        </div>

        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
          <h2 className="text-foreground font-sans text-2xl font-bold tracking-tight">
            Have a hard backend problem?
          </h2>
          <span className="text-muted-foreground font-mono text-xs">
            Direct response to your inbox
          </span>
        </div>

        <p className="text-muted-foreground font-display text-xs leading-relaxed sm:text-sm">
          Open for backend &amp; systems engineering roles, architecture reviews, distributed systems collaboration, and technical discussions. Send a direct note or connect below.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Direct Contact Form with Intent Selection */}
        <div className="border-border/40 bg-card/25 space-y-4 rounded-xl border p-4 shadow-xs sm:p-5">
          <div className="border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-muted-foreground" />
              <span className="text-foreground font-sans text-xs font-semibold">
                Direct Message
              </span>
            </div>

            {/* Intent Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => setIntent("hiring")}
                className={`rounded px-2 py-0.5 transition-all cursor-pointer ${
                  intent === "hiring"
                    ? "bg-foreground/10 text-foreground font-semibold border border-border/80"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                [Hiring]
              </button>
              <button
                type="button"
                onClick={() => setIntent("collab")}
                className={`rounded px-2 py-0.5 transition-all cursor-pointer ${
                  intent === "collab"
                    ? "bg-foreground/10 text-foreground font-semibold border border-border/80"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                [Collaboration]
              </button>
              <button
                type="button"
                onClick={() => setIntent("opensource")}
                className={`rounded px-2 py-0.5 transition-all cursor-pointer ${
                  intent === "opensource"
                    ? "bg-foreground/10 text-foreground font-semibold border border-border/80"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                [Open Source]
              </button>
              <button
                type="button"
                onClick={() => setIntent("hello")}
                className={`rounded px-2 py-0.5 transition-all cursor-pointer ${
                  intent === "hello"
                    ? "bg-foreground/10 text-foreground font-semibold border border-border/80"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                [Say Hello]
              </button>
            </div>
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
                placeholder={INTENT_PLACEHOLDERS[intent]}
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
                  Message delivered directly to Vishal&apos;s inbox. You will receive a direct reply to your email shortly.
                </span>
              </motion.div>
            )}

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-muted-foreground/70 hidden font-mono text-[10px] sm:inline">
                Encrypted in transit · Resend API verified
              </span>

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium shadow-xs transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
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

        {/* Active Channels Grid */}
        <div className="space-y-2.5">
          <span className="text-muted-foreground/80 block font-mono text-[11px] tracking-wider uppercase">
            Active Direct Channels
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
              className="group border-border/40 bg-card/30 hover:bg-card/70 relative flex cursor-pointer items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 hover:border-border/80 active:scale-[0.99]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="border-border/50 bg-muted/40 text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
                  <Mail className="size-4 text-muted-foreground" />
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
                    @vishalgupta-02
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    GitHub · Open Source &amp; Systems
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* LinkedIn Card */}
            <Link
              href="https://linkedin.com/in/v1shalgupt9"
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
              className="group border-border/40 bg-card/30 hover:border-border/80 hover:bg-card/70 flex items-center justify-between rounded-xl border p-3 shadow-xs transition-all duration-200 active:scale-[0.99]"
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
                    Discord · Developer Chat
                  </span>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
