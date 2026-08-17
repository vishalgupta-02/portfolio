import Image from "next/image"
import CurrentlyPlaying from "./song-exp"
import { Socials } from "./socials"
import MainLayout from "./main-layout"

export default function Hero() {
  return (
    <MainLayout>
      <div className='w-full flex flex-col gap-5 py-6 px-4'>
        <div className='w-full flex items-center sm:items-end gap-3 sm:gap-4'>
          <div className='w-24 h-24 sm:w-32 sm:h-32 shrink-0 max-h-full flex rounded-md justify-center items-center overflow-hidden'>
            <Image
              src='/static/vishal-gupta.webp'
              alt='Vishal Gupta'
              width={120}
              height={120}
              className='w-full h-full object-cover'
              loading='eager'
            />
          </div>
          <div className='flex flex-col gap-1 min-w-0'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold font-sans tracking-tight truncate sm:overflow-visible'>
              Vishal Gupta
            </h1>
            <p className='font-display text-xs sm:text-sm text-custom-black/60 dark:text-white/35'>
              Backend-first. Detail-obsessed. Still learning.
            </p>
          </div>
        </div>
        <div className='flex flex-col mt-3 gap-3'>
          <p className='text-sm sm:text-base font-display text-custom-black/70 dark:text-white/70'>
            I care more about why it broke than that it works.
          </p>
          <CurrentlyPlaying />
          <Socials />
        </div>
      </div>
    </MainLayout>
  )
}
