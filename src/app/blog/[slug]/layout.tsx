import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blog Post | 2AM",
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return (
    <article className='flex flex-col gap-8 py-4 md:py-8'>
      <div className='max-w-3xl mx-auto w-full px-0'>{children}</div>
    </article>
  )
}
