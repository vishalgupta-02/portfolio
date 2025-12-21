"use client";

import { ExperienceData } from "@/types/types";

const ExperCard = ({
  company,
  role,
  duration,
  description1,
  description2,
  skills,
}: ExperienceData) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-2">{company}</h2>
          <p className="text-sm text-zinc-500 mb-4">{duration}</p>
        </div>
        <p className="text-lg mb-2 text-teal-500">{role}</p>
        <div className="flex flex-wrap gap-2 space-x-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-zinc-600 dark:text-zinc-400 rounded-full text-xs uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>
        <ul className="mt-4 space-y-2 dark:text-zinc-300 text-zinc-700">
          <li>
            <span className="text-teal-600 mr-3">•</span>
            {description1}
          </li>
          <li>
            <span className="text-teal-600 mr-3">•</span>
            {description2}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExperCard;
