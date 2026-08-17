"use client"

import { Line } from "../lines"
import { Socials } from "../socials"
import { usePathname } from "next/navigation"

type Props = {
  quote: Awaited<ReturnType<typeof import("@/hooks/get-quotes").getQuotes>>
}

export default function FooterContent({ quote }: Props) {
  const pathname = usePathname()
  const isBlogPage = pathname === "/blog"

  if (isBlogPage) {
    return null
  }

  return (
    <footer className='w-full max-w-2xl rounded-md mx-auto px-4 py-8'>
      <Line type='horizontal' width={640} className='my-8' />

      {quote && (
        <div className='w-full flex flex-col p-4 gap-3 rounded-sm bg-custom-gray/10 border dark:border-custom-white border-custom-black'>
          <p className='text-center text-lg'>“ {quote.quote} ”</p>

          <div className='space-y-1 text-right'>
            <p className='text-md font-display italic'>
              — {quote.author?.name},{" "}
              <span className='text-md ml-1'>{quote.author?.company.name}</span>
            </p>
          </div>
        </div>
      )}

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 my-8'>
        <p className='text-xl font-sans'>Connect With Me</p>

        <div className='flex gap-2 justify-start sm:justify-end items-center flex-wrap'>
          <Socials />
        </div>
      </div>

      <Line type='horizontal' width={640} className='mb-4 mt-8' />

      <p className='font-display font-light text-sm'>
        &copy; 2026 Vishal Gupta. All rights reserved.
      </p>
    </footer>
  )
}
