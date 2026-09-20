import { BookOpen, Layers, Tag } from "lucide-react"

interface BlogStatsHeaderProps {
  totalArticles: number
  dualViewCount: number
  totalTopics: number
}

export function BlogStatsHeader({
  totalArticles,
  dualViewCount,
  totalTopics,
}: BlogStatsHeaderProps) {
  return (
    <div className='border-border/50 bg-card/40 mt-6 grid grid-cols-3 gap-3 rounded-xl border p-3 text-center sm:p-4 shadow-xs backdrop-blur-xs'>
      <div className='border-border/60 border-r pr-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <BookOpen className='size-3.5 text-emerald-500' aria-hidden='true' />
          Articles
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {totalArticles}
        </p>
      </div>

      <div className='border-border/60 border-r px-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <Layers className='size-3.5 text-blue-500' aria-hidden='true' />
          Dual-View
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {dualViewCount}
        </p>
      </div>

      <div className='pl-2'>
        <span className='text-muted-foreground flex items-center justify-center gap-1 font-mono text-xs'>
          <Tag className='size-3.5 text-amber-500' aria-hidden='true' />
          Topics
        </span>
        <p className='text-foreground mt-1 font-mono text-lg font-bold'>
          {totalTopics}
        </p>
      </div>
    </div>
  )
}
