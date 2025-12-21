"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Project1 from "./project1";
import Project2 from "./project2";
import { useRouter } from "next/navigation";

export default function SelectedWork() {
  const navigate = useRouter();

  return (
    <section id="selected-work" className="my-16 px-8 py-4">
      <h2 className="text-4xl font-bold">Selected Work</h2>
      <p className="mb-8 mt-4 text-zinc-700 dark:text-zinc-300 max-w-2xl">
        A curated selection of projects showcasing my skills in fullstack
        development, AI integration, and user-centric design.
      </p>
      <div className="space-y-12">
        <Project1 />
        <Project2 />
      </div>
      <Button
        variant="link"
        onClick={() => navigate.push("/work")}
        className="text-teal-400 cursor-pointer mt-8 rounded-none text-md font-semibold hover:text-zinc-900"
      >
        View All Work
        <ArrowUpRight className="ml-1 h-8 w-8" />
      </Button>
    </section>
  );
}
