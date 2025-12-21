"use client";

import LinkedIn from "../(components)/linkedin";
import GitHub from "../(components)/github";
import EmailContact from "../(components)/email";

export default function Contact() {
  return (
    <div className="pt-24 space-y-4">
      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-6xl font-bold mb-6 tracking-tighter">
          Get in Touch
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
          I&apos;m always interested in hearing about new projects,
          opportunities, and interesting conversations.
        </p>
      </div>
      <div className="w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <EmailContact />
        <GitHub />
        <LinkedIn />
      </div>
      <div className="w-full flex justify-center items-center flex-col px-8 py-28 text-center">
        <p className="text-zinc-800 dark:text-zinc-300 text-3xl font-semibold max-w-2xl leading-relaxed">
          Let&apos;s create something{" "}
          <span className="text-teal-500 dark:text-teal-700">great</span>.
        </p>
        <p className="w-full max-w-3xl text-zinc-500 dark:text-zinc-200 text-lg leading-relaxed mt-4">
          Whether you have a specific project in mind, want to collaborate, or
          just want to chat about tech—I&apos;d love to hear from you. No
          pressure, just conversation.
        </p>
      </div>
    </div>
  );
}
