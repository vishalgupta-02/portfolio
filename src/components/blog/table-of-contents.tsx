import type { TableOfContentsItem } from "@/lib/blog/types"

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label='Table of contents' className='text-sm'>
      <p className='mb-4 font-semibold'>On this page</p>

      <ul className='space-y-2'>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${item.id}`}
              className='
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                '>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
