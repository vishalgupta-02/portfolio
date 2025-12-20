"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-300 px-12 py-8 text-center">
      <div className="flex justify-between items-center my-4 mx-auto max-w-5xl px-8 py-4">
        <p className="text-sm text-zinc-900">
          Built with Next.js + TypeScript and Tailwind CSS.
        </p>
        <ul className="text-sm text-zinc-900">
          <li className="inline mx-6 hover:text-teal-500">
            <Link href="https://www.github.com/vishal-gupta-02">GitHub</Link>
          </li>
          <li className="inline mx-6 hover:text-teal-500">
            <Link href="https://www.linkedin.com/in/vishal-gupta-16018719a">
              LinkedIn
            </Link>
          </li>
          <li className="inline mx-6 hover:text-teal-500">
            <Link href="https://x.com/VishalG41764750">Twitter</Link>
          </li>
        </ul>
      </div>
      <p className="text-md text-zinc-700">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-teal-500">Vishal Gupta</span>. All rights
        reserved.
      </p>
    </footer>
  );
}
