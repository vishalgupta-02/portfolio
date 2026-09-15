"use client";

import * as React from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/blog/site";

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  tags?: string[];
  variant?: "compact" | "expanded" | "inline" | "pills";
  className?: string;
}

export function ShareButtons({
  url,
  title,
  description,
  tags = [],
  variant = "compact",
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState(url || siteConfig.url);
  const [canNativeShare, setCanNativeShare] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = url
        ? url.startsWith("http")
          ? url
          : `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`
        : window.location.href;
      setShareUrl(fullUrl);
      setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
    }
  }, [url]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const hashtags = tags
    .map((t) => t.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .join(",");
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${
    hashtags ? `&hashtags=${encodeURIComponent(hashtags)}` : ""
  }`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} ${shareUrl}`
  )}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Native share error:", err);
        }
      }
    }
  };

  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer",
            copied
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-border/40 bg-background/80 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
          )}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 hover:bg-muted/60 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
          aria-label="Share on X"
        >
          <XIcon className="size-3.5" />
          <span>Post</span>
        </a>

        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 hover:bg-muted/60 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="size-3.5" />
          <span>LinkedIn</span>
        </a>

        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 hover:bg-muted/60 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon className="size-3.5" />
          <span>WhatsApp</span>
        </a>

        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-background/80 hover:bg-muted/60 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 sm:hidden cursor-pointer"
            aria-label="Share via device menu"
          >
            <Share2 className="size-3.5" />
            <span>More</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-muted-foreground",
        className
      )}
    >
      <span className="text-[11px] font-mono mr-1 text-muted-foreground/70 hidden sm:inline">
        Share:
      </span>

      {/* Copy link button */}
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "relative p-1.5 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer",
          copied && "text-emerald-500 hover:text-emerald-500"
        )}
        title={copied ? "Link copied!" : "Copy link"}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>

      {/* X / Twitter */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors"
        title="Share on X"
        aria-label="Share on X"
      >
        <XIcon className="size-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="size-3.5" />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon className="size-3.5" />
      </a>

      {/* Web Share (Mobile) */}
      {canNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="p-1.5 rounded-md hover:bg-muted/80 hover:text-foreground transition-colors sm:hidden cursor-pointer"
          title="Share via device"
          aria-label="Share via device menu"
        >
          <Share2 className="size-3.5" />
        </button>
      )}
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-3.5 fill-current", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-3.5 fill-current", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
        clipRule="evenodd"
      />
      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-3.5 fill-current", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
