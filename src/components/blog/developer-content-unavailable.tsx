import { Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DeveloperContentUnavailableProps {
  onSwitchToUserView?: () => void;
}

export function DeveloperContentUnavailable({
  onSwitchToUserView,
}: DeveloperContentUnavailableProps) {
  return (
    <section
      role="status"
      aria-label="Developer content unavailable"
      data-testid="developer-content-unavailable"
      className="my-8 rounded-xl border border-border/80 bg-muted/30 p-8 sm:p-12 text-center not-prose"
    >
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted border border-border/80 text-foreground">
        <Code2 className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>

      <h2 className="mt-4 text-lg sm:text-xl font-semibold text-foreground tracking-tight">
        Developer View Unavailable
      </h2>

      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        The developer-focused version of this article isn&apos;t available yet.
      </p>

      <p className="mt-1 text-xs text-muted-foreground/80 max-w-md mx-auto">
        You&apos;re viewing this article in Developer View, but no developer
        content has been published for it yet.
      </p>

      <div className="mt-6 flex justify-center">
        {onSwitchToUserView ? (
          <button
            type="button"
            onClick={onSwitchToUserView}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline cursor-pointer"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Switch to User View
          </button>
        ) : (
          <Link
            href="?view=user"
            scroll={false}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Switch to User View
          </Link>
        )}
      </div>
    </section>
  );
}
