"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-full border-b border-zinc-300 bg-white">
      <div className="w-full max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-semibold hover:text-teal-500 tracking-tighter">
              Vishal.
            </h1>
          </Link>
        </div>
        <div>
          <nav>
            <ul className="flex space-x-12">
              <li>
                <a href="/about" className="text-zinc-700 hover:text-teal-500">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/experience"
                  className="text-zinc-700 hover:text-teal-500"
                >
                  Experience
                </a>
              </li>
              <li>
                <a href="/work" className="text-zinc-700 hover:text-teal-500">
                  Work
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-zinc-700 hover:text-teal-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
