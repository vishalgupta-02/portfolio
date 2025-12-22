"use client";

import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  return (
    <header className="fixed w-full border-b border-zinc-300 bg-white dark:bg-black backdrop-blur-md z-50">
      <div className="w-full max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-semibold hover:text-teal-500 tracking-wide">
              Vishal
              <span className="text-teal-400 dark:text-teal-700">Gupta</span>
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-12 justify-center items-center font-semibold">
            <li>
              <Link
                href="/about"
                className="text-zinc-700 dark:text-zinc-200 hover:text-teal-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/experience"
                className="text-zinc-700 dark:text-zinc-200 hover:text-teal-500"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="/skills"
                className="text-zinc-700 dark:text-zinc-200 hover:text-teal-500"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-zinc-700 dark:text-zinc-200 hover:text-teal-500"
              >
                Contact
              </Link>
            </li>
            <ModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  );
}
