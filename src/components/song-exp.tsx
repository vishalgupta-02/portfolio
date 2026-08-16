"use client"

import { ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

type Song = {
  title: string
  artist: string
  artwork: string
  spotifyUrl: string
}

type CurrentlyPlayingProps = {
  song?: Song
}

const defaultSong: Song = {
  title: "Tu Chale",
  artist: "Arijit Singh, Shreya Ghoshal",
  artwork: "/music/tu-chale.jpg",
  spotifyUrl: "https://open.spotify.com/track/0XCtA9pYB0aOciPzrJpkAK",
}

const bars = [45, 85, 60, 100]

export default function CurrentlyPlaying({
  song = defaultSong,
}: CurrentlyPlayingProps) {
  return (
    <div className='relative z-50 w-full max-w-lg'>
      <SongTeaser song={song} />
    </div>
  )
}

type SongTeaserProps = {
  song: Song
}

function SongTeaser({ song }: SongTeaserProps) {
  return (
    <Link href={defaultSong.spotifyUrl} target='_blank'>
      <motion.button
        type='button'
        layoutId='music-container'
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className='group relative flex w-full items-center gap-3 overflow-hidden rounded-full text-left outline-none transition-colors cursor-pointer'>
        <MiniEqualizer />

        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-2'>
            <span className='shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-custom-black/40 dark:text-white/35'>
              On repeat
            </span>

            <span className='h-px w-3 shrink-0 dark:bg-white/15 bg-custom-black/20' />

            <motion.span
              layoutId='song-title'
              className='truncate text-sm font-medium dark:text-white/90 text-custom-black'>
              {song.title}
            </motion.span>

            <span className='hidden shrink-0 dark:text-white/20 text-custom-black/40 sm:inline'>
              —
            </span>

            <motion.span
              layoutId='song-artist'
              className='hidden truncate text-xs dark:text-white/35 transition-colors dark:group-hover:text-white/60 sm:block'>
              {song.artist}
            </motion.span>
          </div>
        </div>

        <motion.div
          initial={false}
          whileHover={{
            x: 2,
            y: -2,
          }}
          className='text-white transition-colors opacity-0 group-hover:opacity-100'>
          <ExternalLink className='size-3.5' />
        </motion.div>
      </motion.button>
    </Link>
  )
}
function MiniEqualizer() {
  return (
    <div aria-hidden='true' className='flex h-3 shrink-0 items-end gap-0.5'>
      {bars.map((height, index) => (
        <motion.span
          key={index}
          animate={{
            height: [
              `${height * 0.35}%`,
              `${height}%`,
              `${Math.max(height * 0.55, 30)}%`,
            ],
          }}
          transition={{
            duration: 0.45 + index * 0.12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className='block w-0.5 rounded-full bg-green-400'
        />
      ))}
    </div>
  )
}
