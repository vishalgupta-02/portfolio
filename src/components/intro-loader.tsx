"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

const greetings = [
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "Hallo",
  "こんにちは",
  "안녕하세요",
  "你好",
  "مرحبا",
  "Привет",
  "Merhaba",
  "שלום",
  "Hej",
  "Cześć",
  "Sawubona",
  "Jambo",
  "Xin chào",
  "สวัสดี",
  "Hello",
  "नमस्ते",
]

const INITIAL_DELAY = 230
const MIN_DELAY = 65
const ACCELERATION = 11

export function IntroLoader() {
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (index === greetings.length - 1) {
      const timeout = window.setTimeout(() => {
        setFinished(true)
      }, 250)

      return () => window.clearTimeout(timeout)
    }

    const delay = Math.max(INITIAL_DELAY - index * ACCELERATION, MIN_DELAY)

    const timeout = window.setTimeout(() => {
      setIndex((current) => current + 1)
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [index])

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-120%" }}
          transition={{
            duration: 1.15,
            ease: [0.76, 0, 0.24, 1],
          }}
          className='fixed inset-x-0 top-0 z-9999 h-dvh bg-background text-foreground'>
          <div className='flex h-full items-center justify-center'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={greetings[index]}
                initial={{
                  opacity: 0,
                  y: 12,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.09,
                  ease: "easeOut",
                }}
                className='text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl'>
                {greetings[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Curved bottom edge */}
          <div className='absolute -bottom-16 left-1/2 h-32 w-[120%] -translate-x-1/2 rounded-[50%] bg-background' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
