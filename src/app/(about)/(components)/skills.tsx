"use client";

export default function Skills() {
  return (
    <>
      <p className="text-3xl font-semibold tracking-tighter">Skills</p>
      <div className="grid grid-cols-1 md:grid-cols-2 text-zinc-900 gap-8">
        <ul className="space-y-2 text-lg font-semibold text-zinc-700">
          <li className="leading-relaxed font-semibold text-zinc-500 uppercase tracking-widest">
            Languages
          </li>
          <li className="leading-relaxed tracking-wide">JavaScript</li>
          <li className="leading-relaxed tracking-wide">TypeScript</li>
          <li className="leading-relaxed tracking-wide">C++</li>
        </ul>
        <ul className="space-y-2 text-lg font-semibold text-zinc-700">
          <li className="leading-relaxed font-semibold text-zinc-500 uppercase tracking-widest">
            Frontend
          </li>
          <li className="leading-relaxed tracking-wide">React</li>
          <li className="leading-relaxed tracking-wide">Next.js</li>
          <li className="leading-relaxed tracking-wide">Tailwind CSS</li>
        </ul>
        <ul className="space-y-2 text-lg font-semibold text-zinc-700">
          <li className="leading-relaxed text-zinc-500 uppercase tracking-widest">
            Backend
          </li>
          <li className="leading-relaxed tracking-wide">Node.js</li>
          <li className="leading-relaxed tracking-wide">Express</li>
          <li className="leading-relaxed tracking-wide">MongoDB</li>
        </ul>
        <ul className="space-y-2 text-lg font-semibold text-zinc-700">
          <li className="leading-relaxed text-zinc-500 uppercase tracking-widest">
            Tools & Platforms
          </li>
          <li className="leading-relaxed tracking-wide">Git & GitHub</li>
          <li className="leading-relaxed tracking-wide">Docker</li>
          <li className="leading-relaxed tracking-wide">VS Code</li>
        </ul>
      </div>
    </>
  );
}
