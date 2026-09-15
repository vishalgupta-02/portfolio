"use client"

import { cn } from "@/lib/utils"
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { createContext, useContext, useRef, type ReactNode } from "react"

interface DockProps {
  className?: string
  children: ReactNode
  magnification?: number
  distance?: number
}

interface DockIconProps {
  className?: string
  children?: ReactNode
}

const DEFAULT_MAGNIFICATION = 50
const DEFAULT_DISTANCE = 120
const BASE_SIZE = 40
const BASE_ICON_SIZE = 20
const ICON_SIZE_RATIO = 0.5
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 }

interface DockContextValue {
  mouseX: MotionValue<number>
  magnification: number
  distance: number
}

const DockContext = createContext<DockContextValue | null>(null)

const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border",
          className,
        )}>
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const context = useContext(DockContext)

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component")
  }

  const { mouseX, magnification, distance } = context

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect()

    if (!bounds) {
      return Infinity
    }

    return val - bounds.left - bounds.width / 2
  })

  const containerScale = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, magnification / BASE_SIZE, 1],
  )
  const containerSize = useSpring(containerScale, SPRING)
  const iconScale = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, (magnification * ICON_SIZE_RATIO) / BASE_ICON_SIZE, 1],
  )
  const iconSize = useSpring(iconScale, SPRING)

  return (
    <motion.div
      ref={ref}
      style={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        scale: containerSize,
        transformOrigin: "center",
      }}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full shrink-0 will-change-transform",
        className,
      )}>
      <motion.div
        style={{
          width: BASE_ICON_SIZE,
          height: BASE_ICON_SIZE,
          scale: iconSize,
          transformOrigin: "center",
        }}
        className='flex items-center justify-center will-change-transform'>
        {children}
      </motion.div>
    </motion.div>
  )
}

export { Dock, DockIcon }
export type { DockProps, DockIconProps }
