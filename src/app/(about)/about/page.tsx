"use client";

import Background from "../(components)/background";
import Philosophy from "../(components)/philosophy";
import Skills from "../(components)/skills";

export default function About() {
  return (
    <div className="pt-24 space-y-4">
      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-6xl font-bold mb-6 tracking-tighter">About Me</h1>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
          A glimpse into my journey as a developer, my core beliefs, and the
          skills I&apos;ve honed along the way.
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto px-8 py-8 space-y-6">
        <Background />
      </div>
      <div className="w-full max-w-5xl mx-auto px-8 py-8 space-y-6">
        <Skills />
      </div>
      <div className="w-full max-w-5xl mx-auto px-8 py-8 space-y-6">
        <Philosophy />
      </div>
    </div>
  );
}
