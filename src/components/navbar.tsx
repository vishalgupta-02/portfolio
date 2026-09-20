"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import CommandMenu from "./command-k"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/postmortems", label: "Postmortems" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className='w-full max-w-2xl rounded-md mx-auto px-4 sticky top-0 z-40 bg-background/80 backdrop-blur-md transition-colors'>
      <nav aria-label="Main Navigation" className='flex items-center justify-between py-4 sm:py-5 border-b border-border/30'>
        <ul className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium'>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative px-2.5 py-1.5 rounded-lg transition-all duration-200 inline-flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
                    isActive
                      ? "text-foreground font-semibold bg-muted/60"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {isActive && (
                    <span className="size-1 rounded-full bg-emerald-500 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className='flex items-center gap-2 sm:gap-3'>
          <CommandMenu />
          <AnimatedThemeToggler />
        </div>
      </nav>
    </header>
  )
}
