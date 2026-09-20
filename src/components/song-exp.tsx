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
    <div className='relative z-10 w-full max-w-lg'>
      <SongTeaser song={song} />
    </div>
  )
}

type SongTeaserProps = {
  song: Song
}

function SongTeaser({ song }: SongTeaserProps) {
  return (
    <Link href={song.spotifyUrl} target='_blank' rel='noopener noreferrer'>
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
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className='group relative flex w-full items-center gap-2.5 px-2.5 py-1.5 rounded-lg border border-border/40 bg-card/20 hover:border-emerald-500/30 hover:bg-card/50 text-left outline-none transition-all cursor-pointer'>
        <MiniEqualizer />

        <div className='min-w-0 flex-1 flex items-center gap-2'>
          <span className='shrink-0 text-[10px] font-mono uppercase tracking-widest text-muted-foreground'>
            Listening to
          </span>

          <span className='h-px w-2.5 shrink-0 bg-border/80' />

          <motion.span
            layoutId='song-title'
            className='truncate text-xs font-semibold text-foreground group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors'>
            {song.title}
          </motion.span>

          <span className='hidden shrink-0 text-muted-foreground/60 sm:inline text-xs'>
            —
          </span>

          <motion.span
            layoutId='song-artist'
            className='hidden truncate text-xs text-muted-foreground sm:block'>
            {song.artist}
          </motion.span>
        </div>

        <motion.div
          className='text-muted-foreground group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0'>
          <ExternalLink className='size-3' />
        </motion.div>
      </motion.button>
    </Link>
  )
}

function MiniEqualizer() {
  return (
    <div aria-hidden='true' className='flex h-3 shrink-0 items-end gap-[2px] px-0.5'>
      {bars.map((height, index) => (
        <motion.span
          key={index}
          animate={{
            height: [
              `${height * 0.35}%`,
              `${height}%`,
              `${Math.max(height * 0.5, 25)}%`,
            ],
          }}
          transition={{
            duration: 0.5 + index * 0.15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className='block w-[2.5px] rounded-full bg-emerald-500/80'
        />
      ))}
    </div>
  )
}


