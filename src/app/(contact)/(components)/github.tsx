"use client";

import { ExternalLink, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const GitHub = () => {
  const navigate = useRouter();

  return (
    <>
      <div
        className="group relative space-y-2 border border-zinc-400 px-8 py-8 rounded-xs hover:border-teal-500 hover:cursor-pointer hover:overflow-hidden"
        onClick={() => navigate.push("https://github.com/vishalgupta-02")}
      >
        <div className="group-hover:opacity-60">
          <Mail className="inline-block mr-2 mb-1 text-zinc-400 group-hover:text-teal-500" />
          <p className="text-xl font-semibold tracking-tight mt-2 group-hover:text-teal-500">
            GitHub
          </p>
          <p className="text-sm text-zinc-500 font-medium mt-2">
            View my Works
          </p>
        </div>
        <div className="group-hover:opacity-100 opacity-0 transition-all duration-300">
          <p className="translate-y-4 text-sm font-medium text-zinc-900 group-hover:text-teal-500 transition-all duration-300 group-hover:translate-y-0">
            Go
            <ExternalLink className="inline-block w-4 h-4 ml-2 mb-1 text-zinc-400" />
          </p>
        </div>
      </div>
    </>
  );
};

export default GitHub;
