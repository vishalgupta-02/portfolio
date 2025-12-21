"use client";

export default function Core() {
  return (
    <>
      <div>
        <div className="px-8 py-4 border-b border-zinc-300 p-4">
          <p className="text-xl font-semibold tracking-tight">Core</p>
          <p className="text-zinc-600 text-sm mt-1 font-medium">
            Deep expertise, daily use.
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 text-md px-8 py-4 gap-6 text-zinc-900 dark:text-zinc-400 font-medium">
          <li>TypeScript</li>
          <li>React</li>
          <li>PostgreSQL</li>
          <li>Tailwind CSS</li>
          <li>Node.js</li>
          <li>Git</li>
          <li>Express</li>
        </ul>
      </div>
    </>
  );
}
