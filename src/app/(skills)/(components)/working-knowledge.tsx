"use client";

export default function WorkingKnowledge() {
  return (
    <>
      <div>
        <div className="px-8 py-4 border-b border-zinc-300 p-4">
          <p className="text-xl font-semibold tracking-tight">
            Working Knowledge
          </p>
          <p className="text-zinc-600 text-sm mt-1 font-medium">
            Solid understanding, comfortable in production.
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 text-md px-8 py-6 gap-6 text-zinc-900 dark:text-zinc-400 font-medium">
          <li>JavaScript</li>
          <li>Python</li>
          <li>Vue.js</li>
          <li>Next.js</li>
          <li>MongoDB</li>
          <li>GraphQL</li>
          <li>Docker</li>
          <li>AWS</li>
          <li>Framer Motion</li>
        </ul>
      </div>
    </>
  );
}
