"use client";

import React from "react";
import { WorkCardProps } from "@/types/types";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

const WorkCard = ({
  imgSrc,
  title,
  mainDescription,
  solutions,
  skills,
  duration,
}: WorkCardProps) => {
  return (
    <div className="w-full group flex flex-col gap-2 cursor-pointer">
      <div className="overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          width={1200}
          height={1000}
          className="w-full min-w-120 h-full mb-4 group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2 group-hover:text-teal-500 transition-colors duration-500">
          {title}
        </h2>
        <p className="text-xs text-zinc-500 group-hover:text-teal-500 italic transition-colors duration-500">
          {duration}
        </p>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
        {mainDescription}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <p
            key={index}
            className="text-xs uppercase text-zinc-600 dark:text-zinc-300 tracking-wider"
          >
            {skill}
          </p>
        ))}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {solutions.map((solution, index) => (
          <p
            key={index}
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-100"
          >
            <ArrowDownRight className="w-4 h-4 text-teal-500" />
            {solution}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WorkCard;
