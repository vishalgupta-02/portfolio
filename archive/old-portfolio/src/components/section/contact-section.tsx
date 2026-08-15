'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { DATA } from '@/data/resume'
import { cn } from '@/lib/utils'

export default function ContactSection() {
  const [showPopover, setShowPopover] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false)
      }
    }

    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopover])

  return (
    <div className='border rounded-xl p-10 relative'>
      <div className='absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2'>
        <span className='text-background text-sm font-medium'>Contact</span>
      </div>
      <div className='absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden'>
        <FlickeringGrid
          className='h-full w-full'
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
      </div>
      <div className='relative flex flex-col items-center gap-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
          Let&apos;s Talk
        </h2>
        <p className='mx-auto max-w-lg text-muted-foreground text-balance'>
          Whether you want to collaborate on something, have an interesting
          problem to solve, or just want to talk about tech, building, or
          fighter jets — my inbox is open.
        </p>
        {/* <Link
          href={DATA.contact.social.email.url}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm text-white',
          )}>
          Email
        </Link> */}
      </div>
    </div>
  )
}
