"use client"

import { motion } from "motion/react"

export default function BlogLoading() {
  return (
    <div className='flex min-h-[50vh] items-center justify-center px-6'>
      <div className='flex flex-col items-center text-center'>
        {/* Animated writing cursor */}
        <div className='mb-6 flex items-center gap-1.5'>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className='size-1.5 rounded-full bg-foreground/40'
              animate={{
                opacity: [0.25, 1, 0.25],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.p
          className='text-sm font-medium tracking-tight text-foreground/70'
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          Gathering a few thoughts worth reading…
        </motion.p>

        <motion.p
          className='mt-2 max-w-sm text-xs text-muted-foreground'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}>
          Good ideas take a moment to arrive.
        </motion.p>
      </div>
    </div>
  )
}
