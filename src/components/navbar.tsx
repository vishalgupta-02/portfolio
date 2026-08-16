import Link from "next/link"
import CommandMenu from "./command-k"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

export default function Navbar() {
  return (
    <nav className='w-full max-w-2xl rounded-md mx-auto px-4'>
      <div className='flex items-center justify-between py-6'>
        <ul className='flex gap-5 text-sm'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/work'>Work</Link>
          </li>
          <li>
            <Link href='/blog'>Blog</Link>
          </li>
        </ul>
        <div className='flex items-center gap-4'>
          {/* <CommandMenu /> */}
          <AnimatedThemeToggler />
        </div>
      </div>
    </nav>
  )
}
