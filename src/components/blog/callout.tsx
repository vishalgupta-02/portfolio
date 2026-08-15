import type { ReactNode } from "react"

interface CalloutProps {
  children: ReactNode
  title?: string
  type?: "info" | "warning" | "success"
}

export function Callout({ children, title, type = "info" }: CalloutProps) {
  return (
    <aside data-callout-type={type} className='my-6 rounded-xl border p-5'>
      {title && <p className='mt-0 font-semibold'>{title}</p>}

      <div className='text-sm'>{children}</div>
    </aside>
  )
}
