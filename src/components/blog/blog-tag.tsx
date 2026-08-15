interface BlogTagProps {
  tag: string;
}

export function BlogTag({ tag }: BlogTagProps) {
  return (
    <p className="inline-flex items-center rounded-full border px-2 py-1 text-[10px] text-custom-black dark:text-custom-white transition-colors hover:text-foreground">
      {tag}
    </p>
  );
}
