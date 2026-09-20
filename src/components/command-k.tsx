"use client"

import { Command } from "cmdk"
import React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { replayIntro } from "./intro-loader"

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleAction = (actionId: string) => {
    setOpen(false)
    switch (actionId) {
      case "home":
        router.push("/")
        break
      case "work":
        router.push("/work")
        break
      case "blog":
        router.push("/blog")
        break
      case "postmortems":
        router.push("/postmortems")
        break
      case "theme":
        setTheme(theme === "dark" ? "light" : "dark")
        break
      case "replay-intro":
        replayIntro()
        break
      case "copy-email":
        navigator.clipboard?.writeText("abhimanyug987@gmail.com")
        break
      case "github":
        window.open("https://github.com/vishalgupta-02", "_blank")
        break
      default:
        break
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className='group flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs transition-all duration-200 hover:border-border hover:bg-muted/50 hover:text-foreground active:scale-95 cursor-pointer'>
        <span className='hidden sm:inline font-mono text-[11px]'>Search</span>
        <span className='inline-flex items-center gap-0.5 rounded border border-border/80 bg-background/80 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors'>
          <span>⌘</span>
          <span>K</span>
        </span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label='Global Command Menu'
        className='fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-20 sm:pt-28 backdrop-blur-sm animate-in fade-in-0 duration-150'>
        <div className='w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl ring-1 ring-border/50'>
          <div className='flex items-center gap-3 border-b border-border px-4 py-3'>
            <span className='flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-muted/60 font-mono text-xs font-semibold text-foreground'>
              ⌘
            </span>
            <Command.Input
              placeholder='Type a command, jump to page, or search...'
              className='h-9 w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-sans'
            />
            <kbd className='rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-muted-foreground'>
              ESC
            </kbd>
          </div>

          <Command.List className='max-h-[60vh] overflow-y-auto p-2 scrollbar-thin'>
            <Command.Empty className='rounded-xl border border-dashed border-border/60 px-4 py-8 text-center text-xs font-mono text-muted-foreground'>
              No matching commands found.
            </Command.Empty>

            <Command.Group heading='Navigation' className='px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>
              <Command.Item
                value='Home'
                onSelect={() => handleAction("home")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Go to Home</span>
                <span className='font-mono text-[10px] text-muted-foreground'>/</span>
              </Command.Item>
              <Command.Item
                value='Work Projects Case Studies'
                onSelect={() => handleAction("work")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>View Engineering Work</span>
                <span className='font-mono text-[10px] text-muted-foreground'>/work</span>
              </Command.Item>
              <Command.Item
                value='Blog Technical Articles'
                onSelect={() => handleAction("blog")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Read Blog Articles</span>
                <span className='font-mono text-[10px] text-muted-foreground'>/blog</span>
              </Command.Item>
              <Command.Item
                value='Postmortems Incident Analysis'
                onSelect={() => handleAction("postmortems")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Read Production Postmortems</span>
                <span className='font-mono text-[10px] text-muted-foreground'>/postmortems</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className='my-1.5 h-px bg-border/60' />

            <Command.Group heading='Interactive Systems' className='px-1 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>
              <Command.Item
                value='Replay Boot Sequence Loader Animation'
                onSelect={() => handleAction("replay-intro")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span className='flex items-center gap-2'>
                  <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
                  Replay System Boot Sequence
                </span>
                <span className='rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground'>
                  Boot OS
                </span>
              </Command.Item>
              <Command.Item
                value='Toggle Theme Light Dark Mode'
                onSelect={() => handleAction("theme")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Toggle Color Theme</span>
                <span className='rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground'>
                  T
                </span>
              </Command.Item>
              <Command.Item
                value='Copy Email Contact'
                onSelect={() => handleAction("copy-email")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Copy Direct Email (abhimanyug987@gmail.com)</span>
                <span className='rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground'>
                  Copy
                </span>
              </Command.Item>
              <Command.Item
                value='Open GitHub Profile'
                onSelect={() => handleAction("github")}
                className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Open GitHub Profile (@vishalgupta-02)</span>
                <span className='font-mono text-[10px] text-muted-foreground'>↗</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  )
}

export default CommandMenu
