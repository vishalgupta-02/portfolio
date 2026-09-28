"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { cn } from "@/lib/utils"

const CommandMenu = dynamic(() => import("./command-k"), {
  ssr: false,
  loading: () => (
    <button
      type='button'
      aria-label="Open command palette"
      className='group flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/60 bg-muted/20 px-2 sm:px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs shrink-0'>
      <span className='hidden sm:inline font-mono text-[11px]'>Search</span>
      <span className='inline-flex items-center gap-0.5 rounded border border-border/80 bg-background/80 px-1 sm:px-1.5 py-0.2 font-mono text-[10px] font-semibold text-muted-foreground'>
        <span>⌘</span>
        <span>K</span>
      </span>
    </button>
  ),
})

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/postmortems", label: "Postmortems" },
  { href: "/now", label: "Now" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Automatically close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className='w-full max-w-2xl rounded-md mx-auto px-4 sticky top-0 z-40 bg-background/80 backdrop-blur-md transition-colors'>
      {/* Desktop Navigation (>= sm) */}
      <nav aria-label="Main Navigation" className='hidden sm:flex items-center justify-between py-4 sm:py-5 border-b border-border/30'>
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

      {/* Mobile Navigation (< sm) */}
      <div className='sm:hidden flex flex-col border-b border-border/30'>
        <div className='flex items-center justify-between py-3.5'>
          {/* User's Name in place of the navbar links */}
          <Link
            href='/'
            className='group flex items-center gap-2 text-foreground font-sans font-semibold text-sm tracking-tight hover:text-primary transition-colors'
          >
            <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
            <span>Vishal Gupta</span>
          </Link>

          {/* Mobile Right Controls: Search, Theme Toggler & Mobile Menu Button */}
          <div className='flex items-center gap-2'>
            <CommandMenu />
            <AnimatedThemeToggler />
            <button
              type='button'
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className='inline-flex items-center justify-center size-8 rounded-lg border border-border/60 bg-muted/20 text-foreground hover:bg-muted/50 transition-colors cursor-pointer active:scale-95'
            >
              {mobileMenuOpen ? (
                <X className='size-4 text-foreground' />
              ) : (
                <Menu className='size-4 text-foreground' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Panel */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation Menu"
            className='py-2 pb-3.5 flex flex-col gap-1 border-t border-border/20 animate-in fade-in-50 slide-in-from-top-2 duration-150'
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <span className='flex items-center gap-2'>
                    {isActive && (
                      <span className='size-1.5 rounded-full bg-emerald-500' />
                    )}
                    <span>{item.label}</span>
                  </span>
                  <span className='font-mono text-[10px] text-muted-foreground'>&rarr;</span>
                </Link>
              )
            })}

            <Link
              href='/#contact'
              onClick={() => setMobileMenuOpen(false)}
              className='flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors'
            >
              <span>Contact</span>
              <span className='font-mono text-[10px] text-muted-foreground'>&rarr;</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
