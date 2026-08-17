interface BlogTagProps {
  tag: string;
}

export function BlogTag({ tag }: BlogTagProps) {
  return (
    <p className="inline-flex items-center rounded-full border border-border/70 px-2 py-1 text-[10px] text-foreground/80 transition-colors hover:text-foreground hover:border-foreground/30">
      {tag}
    </p>
  );
}
