"use client"

import { Command } from "cmdk"
import React from "react"

const quickActions = [
  { id: "home", label: "Go to Home", shortcut: "H" },
  { id: "work", label: "View Work", shortcut: "W" },
  { id: "about", label: "About Me", shortcut: "A" },
  { id: "contact", label: "Contact", shortcut: "C" },
  { id: "theme", label: "Toggle Theme", shortcut: "T" },
]

const CommandMenu = () => {
  const [open, setOpen] = React.useState(false)

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

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='group flex items-center gap-2 rounded-full border border-border px-2 py-1 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-accent/70 hover:shadow-md'>
        <span className='text-xs'>Search</span>
        <span className='hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:inline'>
          K
        </span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label='Global Command Menu'
        className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-20 backdrop-blur-sm'>
        <div className='w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl shadow-black/20 ring-1 ring-border'>
          <div className='flex items-center gap-3 border-b border-border px-4 py-3'>
            <span className='flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-sm font-semibold'>
              ⌘
            </span>
            <Command.Input
              placeholder='Search commands or pages...'
              className='h-10 w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
            />
            <kbd className='rounded border border-border bg-muted px-2 py-1 text-[10px] font-semibold uppercase text-muted-foreground'>
              esc
            </kbd>
          </div>

          <Command.List className='max-h-[60vh] overflow-y-auto p-2'>
            <Command.Empty className='rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground'>
              No matches found. Try a different keyword.
            </Command.Empty>

            <Command.Group heading='Quick actions' className='px-1 py-2'>
              {quickActions.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.label}
                  onSelect={() => setOpen(false)}
                  className='flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground transition-colors duration-150 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                  <span>{item.label}</span>
                  <span className='rounded border border-border bg-muted px-2 py-1 text-[10px] uppercase text-muted-foreground'>
                    {item.shortcut}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className='my-2 h-px bg-border' />

            <Command.Group heading='Navigate' className='px-1 py-2'>
              <Command.Item
                value='Open portfolio home'
                onSelect={() => setOpen(false)}
                className='flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground transition-colors duration-150 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Open portfolio home</span>
                <span className='text-muted-foreground'>↵</span>
              </Command.Item>
              <Command.Item
                value='Jump to contact'
                onSelect={() => setOpen(false)}
                className='flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground transition-colors duration-150 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground'>
                <span>Jump to contact</span>
                <span className='text-muted-foreground'>↵</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  )
}

export default CommandMenu
