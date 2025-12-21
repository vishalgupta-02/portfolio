"use client";

export default function Databases() {
  return (
    <>
      <ul className="space-y-2 text-md font-semibold text-zinc-700 dark:text-zinc-300">
        <li className="leading-relaxed font-semibold text-zinc-500 uppercase tracking-widest">
          Databases
        </li>
        <li className="leading-relaxed tracking-wide">MongoDB</li>
        <li className="leading-relaxed tracking-wide">PostgreSQL</li>
        <li className="leading-relaxed tracking-wide">Firebase</li>
        <li className="leading-relaxed tracking-wide">Redis</li>
        <li className="leading-relaxed tracking-wide">Supabase</li>
      </ul>
    </>
  );
}
