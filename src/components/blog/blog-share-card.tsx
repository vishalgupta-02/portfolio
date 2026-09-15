import { ShareButtons } from "@/components/ui/share-buttons";
import { Share2 } from "lucide-react";

interface BlogShareCardProps {
  title: string;
  description?: string;
  slug: string;
  tags?: string[];
}

export function BlogShareCard({
  title,
  description,
  slug,
  tags = [],
}: BlogShareCardProps) {
  const url = `/blog/${slug}`;

  return (
    <div className="my-10 rounded-xl border border-border/40 bg-card/40 p-5 sm:p-6 backdrop-blur-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
            <Share2 className="size-4 text-emerald-500" />
            <span>Share this article</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            Found this helpful? Share it with other developers, colleagues, or your network.
          </p>
        </div>

        <ShareButtons
          url={url}
          title={title}
          description={description}
          tags={tags}
          variant="pills"
        />
      </div>
    </div>
  );
}
