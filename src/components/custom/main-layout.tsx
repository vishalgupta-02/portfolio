import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto border-l border-r h-full min-h-screen border-zinc-300 p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
