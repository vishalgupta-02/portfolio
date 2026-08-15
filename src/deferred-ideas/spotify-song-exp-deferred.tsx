"use client"

import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import {
  ChevronDown,
  Heart,
  ListMusic,
  Maximize2,
  MoreHorizontal,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useEffect, useState } from "react"

type Song = {
  title: string
  artist: string
  album: string
  artwork: string
  duration: number
}

type SpotifySongExperienceProps = {
  song?: Song
}

const defaultSong: Song = {
  title: "Die With A Smile",
  artist: "Lady Gaga, Bruno Mars",
  album: "MAYHEM",
  artwork: "/music/die-with-a-smile.jpg",
  duration: 251,
}

const equalizerBars = [
  24, 44, 65, 35, 78, 48, 90, 57, 72, 38, 82, 52, 68, 31, 74,
]

const particles = [
  { left: "10%", top: "18%", size: 4, delay: 0 },
  { left: "18%", top: "72%", size: 7, delay: 1.2 },
  { left: "28%", top: "31%", size: 3, delay: 2.1 },
  { left: "38%", top: "82%", size: 5, delay: 0.7 },
  { left: "51%", top: "14%", size: 4, delay: 1.8 },
  { left: "62%", top: "76%", size: 6, delay: 2.8 },
  { left: "72%", top: "28%", size: 3, delay: 1.4 },
  { left: "83%", top: "66%", size: 5, delay: 0.4 },
  { left: "91%", top: "22%", size: 4, delay: 2.4 },
]

export default function SpotifySongExperience({
  song = defaultSong,
}: SpotifySongExperienceProps) {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [muted, setMuted] = useState(false)

  const [progress, setProgress] = useState(32)
  const [volume, setVolume] = useState(75)

  useEffect(() => {
    if (!expanded) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false)
      }

      if (event.code === "Space") {
        const target = event.target as HTMLElement

        if (target.tagName !== "INPUT" && target.tagName !== "BUTTON") {
          event.preventDefault()
          setPlaying((current) => !current)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [expanded])

  return (
    <>
      <CompactSongCard
        song={song}
        playing={playing}
        liked={liked}
        onOpen={() => setExpanded(true)}
        onPlay={() => setPlaying((value) => !value)}
        onLike={() => setLiked((value) => !value)}
      />

      <AnimatePresence>
        {expanded && (
          <FullscreenPlayer
            song={song}
            playing={playing}
            liked={liked}
            shuffle={shuffle}
            repeat={repeat}
            muted={muted}
            progress={progress}
            volume={volume}
            onClose={() => setExpanded(false)}
            onPlay={() => setPlaying((value) => !value)}
            onLike={() => setLiked((value) => !value)}
            onShuffle={() => setShuffle((value) => !value)}
            onRepeat={() => setRepeat((value) => !value)}
            onMute={() => setMuted((value) => !value)}
            onProgress={setProgress}
            onVolume={setVolume}
          />
        )}
      </AnimatePresence>
    </>
  )
}

type CompactSongCardProps = {
  song: Song
  playing: boolean
  liked: boolean
  onOpen: () => void
  onPlay: () => void
  onLike: () => void
}

function CompactSongCard({
  song,
  playing,
  liked,
  onOpen,
  onPlay,
  onLike,
}: CompactSongCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), {
    stiffness: 160,
    damping: 22,
  })

  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-5, 5]), {
    stiffness: 160,
    damping: 22,
  })

  return (
    <motion.article
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()

        mouseX.set(event.clientX - rect.left - rect.width / 2)
        mouseY.set(event.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -5 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
      }}
      className='group relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950 p-3 shadow-2xl shadow-black/30'>
      {/* Ambient artwork */}

      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <Image
          src={song.artwork}
          alt=''
          fill
          className='scale-125 object-cover opacity-20 blur-3xl transition duration-700 group-hover:scale-150 group-hover:opacity-30'
        />

        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60' />
      </div>

      <button
        type='button'
        onClick={onOpen}
        aria-label={`Open ${song.title} player`}
        className='relative flex w-full cursor-pointer items-center gap-4 rounded-[20px] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70'>
        {/* Artwork */}

        <motion.div
          layoutId='song-artwork'
          className='relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 sm:h-28 sm:w-28'>
          <Image
            src={song.artwork}
            alt={`${song.title} artwork`}
            fill
            sizes='112px'
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />

          <div className='absolute inset-0 bg-black/0 transition group-hover:bg-black/10' />
        </motion.div>

        {/* Information */}

        <div className='min-w-0 flex-1 py-2'>
          <div className='mb-2 flex items-center gap-2'>
            {playing && <MiniEqualizer />}

            <span className='text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40'>
              Now playing
            </span>
          </div>

          <motion.h3
            layoutId='song-title'
            className='truncate text-lg font-semibold tracking-tight text-white sm:text-xl'>
            {song.title}
          </motion.h3>

          <motion.p
            layoutId='song-artist'
            className='mt-1 truncate text-sm text-white/50'>
            {song.artist}
          </motion.p>

          <div className='mt-4 h-[3px] overflow-hidden rounded-full bg-white/10'>
            <motion.div
              className='h-full rounded-full bg-white'
              initial={false}
              animate={{ width: "32%" }}
            />
          </div>
        </div>

        <Maximize2 className='mr-3 hidden size-4 text-white/30 transition group-hover:text-white/80 sm:block' />
      </button>

      {/* Controls */}

      <div className='relative mt-2 flex items-center justify-between px-2 pb-1'>
        <button
          type='button'
          aria-label={liked ? "Unlike song" : "Like song"}
          onClick={onLike}
          className='rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'>
          <motion.div
            whileTap={{ scale: 0.7 }}
            animate={liked ? { scale: [1, 1.3, 1] } : {}}>
            <Heart
              className={`size-5 ${
                liked ? "fill-green-400 text-green-400" : ""
              }`}
            />
          </motion.div>
        </button>

        <div className='flex items-center gap-3'>
          <button
            type='button'
            aria-label='Previous song'
            className='rounded-full p-2 text-white/50 transition hover:text-white'>
            <SkipBack className='size-5 fill-current' />
          </button>

          <motion.button
            type='button'
            aria-label={playing ? "Pause" : "Play"}
            onClick={onPlay}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            className='flex size-11 items-center justify-center rounded-full bg-white text-black shadow-xl'>
            {playing ? (
              <Pause className='size-5 fill-current' />
            ) : (
              <Play className='ml-0.5 size-5 fill-current' />
            )}
          </motion.button>

          <button
            type='button'
            aria-label='Next song'
            className='rounded-full p-2 text-white/50 transition hover:text-white'>
            <SkipForward className='size-5 fill-current' />
          </button>
        </div>

        <button
          type='button'
          aria-label='More options'
          className='rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white'>
          <MoreHorizontal className='size-5' />
        </button>
      </div>
    </motion.article>
  )
}

type FullscreenPlayerProps = {
  song: Song
  playing: boolean
  liked: boolean
  shuffle: boolean
  repeat: boolean
  muted: boolean
  progress: number
  volume: number
  onClose: () => void
  onPlay: () => void
  onLike: () => void
  onShuffle: () => void
  onRepeat: () => void
  onMute: () => void
  onProgress: (value: number) => void
  onVolume: (value: number) => void
}

function FullscreenPlayer({
  song,
  playing,
  liked,
  shuffle,
  repeat,
  muted,
  progress,
  volume,
  onClose,
  onPlay,
  onLike,
  onShuffle,
  onRepeat,
  onMute,
  onProgress,
  onVolume,
}: FullscreenPlayerProps) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{
        y: "100%",
        transition: {
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      transition={{
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
      }}
      className='fixed inset-0 z-[999] overflow-hidden bg-black text-white'>
      {/* Artwork background */}

      <motion.div
        animate={
          playing
            ? {
                scale: [1.1, 1.16, 1.1],
              }
            : {
                scale: 1.1,
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className='absolute inset-0'>
        <Image
          src={song.artwork}
          alt=''
          fill
          priority
          className='object-cover opacity-40 blur-[80px]'
        />
      </motion.div>

      {/* Gradient overlays */}

      <div className='absolute inset-0 bg-black/45' />
      <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/95' />
      <div className='absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30' />

      {/* Animated particles */}

      <div className='pointer-events-none absolute inset-0 hidden overflow-hidden md:block'>
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              playing
                ? {
                    opacity: [0, 0.35, 0],
                    y: [30, -60, -130],
                    scale: [0.7, 1, 0.5],
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 6 + index * 0.3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            className='absolute rounded-full bg-white blur-[1px]'
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      {/* Top bar */}

      <div className='absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-5 sm:p-8'>
        <motion.button
          whileHover={{ y: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label='Close player'
          className='flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-xl transition hover:bg-white/10'>
          <ChevronDown className='size-5' />
        </motion.button>

        <div className='text-center'>
          <p className='text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40'>
            Playing from album
          </p>

          <p className='mt-1 text-xs font-medium text-white/80'>{song.album}</p>
        </div>

        <button
          type='button'
          aria-label='More options'
          className='flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-xl transition hover:bg-white/10'>
          <MoreHorizontal className='size-5' />
        </button>
      </div>

      {/* Main */}

      <div className='relative z-10 flex min-h-dvh items-center justify-center px-5 pb-8 pt-24 sm:px-8 lg:px-14'>
        <div className='grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.75fr)] lg:gap-16'>
          {/* Artwork section */}

          <div className='relative mx-auto flex w-full max-w-[620px] items-center justify-center'>
            <motion.div
              animate={
                playing
                  ? {
                      scale: [1, 1.015, 1],
                    }
                  : {
                      scale: 1,
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='absolute h-[80%] w-[80%] rounded-full bg-white/10 blur-[90px]'
            />

            <motion.div
              layoutId='song-artwork'
              whileHover={{ scale: 1.015 }}
              className='relative aspect-square w-full max-w-[280px] overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.7)] sm:max-w-[400px] lg:max-w-[560px]'>
              <Image
                src={song.artwork}
                alt={`${song.title} artwork`}
                fill
                priority
                sizes='(max-width: 640px) 280px, (max-width: 1024px) 400px, 560px'
                className='object-cover'
              />

              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
            </motion.div>

            <AnimatePresence>
              {playing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='absolute -bottom-6 flex h-16 items-end gap-1.5 rounded-full border border-white/10 bg-black/40 px-6 py-4 shadow-xl backdrop-blur-2xl'>
                  {equalizerBars.slice(0, 9).map((height, index) => (
                    <motion.span
                      key={index}
                      animate={{
                        height: [
                          `${Math.max(height * 0.25, 10)}%`,
                          `${height}%`,
                          `${Math.max(height * 0.4, 15)}%`,
                        ],
                      }}
                      transition={{
                        duration: 0.5 + index * 0.07,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                      className='block w-1 rounded-full bg-white'
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Information / controls */}

          <div className='mx-auto w-full max-w-xl'>
            <div className='mb-7 flex items-end justify-between gap-4'>
              <div className='min-w-0'>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.25 },
                  }}
                  className='mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/40'>
                  Now playing
                </motion.p>

                <motion.h1
                  layoutId='song-title'
                  className='truncate text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl'>
                  {song.title}
                </motion.h1>

                <motion.p
                  layoutId='song-artist'
                  className='mt-2 truncate text-base text-white/50 sm:text-lg'>
                  {song.artist}
                </motion.p>
              </div>

              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={onLike}
                aria-label={liked ? "Unlike song" : "Like song"}
                className='shrink-0 rounded-full p-3'>
                <Heart
                  className={`size-6 transition ${
                    liked
                      ? "fill-green-400 text-green-400"
                      : "text-white/50 hover:text-white"
                  }`}
                />
              </motion.button>
            </div>

            {/* Progress */}

            <div>
              <div className='group relative flex h-5 items-center'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(event) => onProgress(Number(event.target.value))}
                  aria-label='Song progress'
                  className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
                />

                <div className='relative h-1 w-full overflow-visible rounded-full bg-white/15'>
                  <motion.div
                    className='absolute inset-y-0 left-0 rounded-full bg-white'
                    animate={{ width: `${progress}%` }}
                  />

                  <motion.span
                    animate={{
                      left: `${progress}%`,
                    }}
                    className='absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100'
                  />
                </div>
              </div>

              <div className='flex justify-between text-[11px] tabular-nums text-white/35'>
                <span>
                  {formatDuration(Math.round((song.duration * progress) / 100))}
                </span>

                <span>{formatDuration(song.duration)}</span>
              </div>
            </div>

            {/* Main controls */}

            <div className='mt-7 flex items-center justify-between'>
              <ControlButton
                active={shuffle}
                label='Shuffle'
                onClick={onShuffle}>
                <Shuffle className='size-5' />
              </ControlButton>

              <button
                type='button'
                aria-label='Previous song'
                className='text-white/75 transition hover:scale-110 hover:text-white'>
                <SkipBack className='size-7 fill-current' />
              </button>

              <motion.button
                type='button'
                onClick={onPlay}
                aria-label={playing ? "Pause" : "Play"}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                className='relative flex size-16 items-center justify-center rounded-full bg-white text-black shadow-2xl shadow-black/30 sm:size-20'>
                {playing && (
                  <motion.span
                    animate={{
                      scale: [1, 1.35],
                      opacity: [0.25, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className='absolute inset-0 rounded-full bg-white'
                  />
                )}

                {playing ? (
                  <Pause className='relative size-7 fill-current sm:size-8' />
                ) : (
                  <Play className='relative ml-1 size-7 fill-current sm:size-8' />
                )}
              </motion.button>

              <button
                type='button'
                aria-label='Next song'
                className='text-white/75 transition hover:scale-110 hover:text-white'>
                <SkipForward className='size-7 fill-current' />
              </button>

              <ControlButton active={repeat} label='Repeat' onClick={onRepeat}>
                <Repeat2 className='size-5' />
              </ControlButton>
            </div>

            {/* Equalizer */}

            <div className='mt-8 flex h-12 items-end justify-center gap-1 opacity-30'>
              {equalizerBars.map((height, index) => (
                <motion.div
                  key={index}
                  animate={
                    playing
                      ? {
                          height: [
                            `${Math.max(height * 0.3, 8)}%`,
                            `${height}%`,
                            `${Math.max(height * 0.45, 12)}%`,
                          ],
                        }
                      : {
                          height: "10%",
                        }
                  }
                  transition={{
                    duration: 0.45 + (index % 5) * 0.1,
                    repeat: playing ? Infinity : 0,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  className='w-full max-w-3 rounded-full bg-white'
                />
              ))}
            </div>

            {/* Bottom controls */}

            <div className='mt-6 flex items-center justify-between border-t border-white/10 pt-5'>
              <button
                type='button'
                className='flex items-center gap-2 text-xs text-white/40 transition hover:text-white'>
                <ListMusic className='size-4' />
                Queue
              </button>

              <div className='group flex w-32 items-center gap-3 sm:w-40'>
                <button
                  type='button'
                  onClick={onMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className='text-white/50 transition hover:text-white'>
                  {muted || volume === 0 ? (
                    <VolumeX className='size-4' />
                  ) : (
                    <Volume2 className='size-4' />
                  )}
                </button>

                <div className='relative flex h-5 flex-1 items-center'>
                  <input
                    type='range'
                    min={0}
                    max={100}
                    value={muted ? 0 : volume}
                    onChange={(event) => onVolume(Number(event.target.value))}
                    aria-label='Volume'
                    className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
                  />

                  <div className='relative h-1 w-full rounded-full bg-white/15'>
                    <div
                      className='absolute inset-y-0 left-0 rounded-full bg-white/70'
                      style={{
                        width: `${muted ? 0 : volume}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className='mt-7 text-center text-[10px] uppercase tracking-[0.25em] text-white/20'>
              Press space to play · ESC to close
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

type ControlButtonProps = {
  active: boolean
  label: string
  onClick: () => void
  children: React.ReactNode
}

function ControlButton({
  active,
  label,
  onClick,
  children,
}: ControlButtonProps) {
  return (
    <motion.button
      type='button'
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      whileTap={{ scale: 0.8 }}
      className={`relative rounded-full p-2 transition ${
        active ? "text-green-400" : "text-white/40 hover:text-white"
      }`}>
      {children}

      {active && (
        <motion.span
          layoutId={`${label}-active`}
          className='absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-green-400'
        />
      )}
    </motion.button>
  )
}

function MiniEqualizer() {
  return (
    <div className='flex h-3 items-end gap-[2px]'>
      {[45, 90, 65, 100].map((height, index) => (
        <motion.span
          key={index}
          animate={{
            height: [`${height * 0.4}%`, `${height}%`, "30%"],
          }}
          transition={{
            duration: 0.45 + index * 0.1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className='w-[2px] rounded-full bg-green-400'
        />
      ))}
    </div>
  )
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
