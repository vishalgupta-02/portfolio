"use client";

import { useState } from "react";
import posthog from "posthog-js";

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      if (posthogConfigured) {
        posthog.capture("code_example_copied");
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={
        copied ? "Code copied to clipboard" : "Copy code to clipboard"
      }
      className="
        text-muted-foreground hover:bg-muted
        hover:text-foreground rounded-md
        border
        px-2 py-1
        text-xs
        transition-colors
      "
    >
      <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
