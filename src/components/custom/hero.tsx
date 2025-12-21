"use client";

import { ArrowRight, Download } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Vishal_Gupta_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full mx-auto h-full min-h-screen flex items-center px-8">
      <div className="flex flex-col justify-center items-start h-full gap-8">
        <p className="px-4 py-2 border border-zinc-800 dark:border-zinc-300 tracking-wider">
          Hi, I&apos;m{" "}
          <span className="text-teal-500 font-medium dark:text-teal-700">
            Vishal
          </span>
        </p>
        <h1 className="text-7xl font-bold w-full max-w-5xl tracking-tight text-left">
          Building digital experiences with{" "}
          <span className="text-teal-500 dark:text-teal-700">precision</span>.
        </h1>
        <p className="text-2xl w-full max-w-3xl">
          I am a full-stack software engineer focused on crafting clean,
          performant, and user-centric applications.
        </p>
        <p className="text-md">
          Available for freelance projects and full-time opportunities.
        </p>
        <div className="w-full flex justify-start items-center gap-8">
          <Link href="/work">
            <Button className="w-48 cursor-pointer rounded-none hover:bg-teal-600 dark:hover:bg-teal-800 dark:hover:text-white transition-colors duration-300">
              View My Work
              <ArrowRight className="ml-2 h-8 w-8" />
            </Button>
          </Link>
          <Button
            onClick={handleResumeDownload}
            className="w-48 cursor-pointer rounded-none hover:bg-teal-600 dark:hover:bg-teal-800 dark:hover:text-white transition-colors duration-300"
          >
            Download Resume
            <Download className="ml-2 h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  );
}
