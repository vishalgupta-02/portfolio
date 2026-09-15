"use client";

import { Line } from "../lines";
import { Socials } from "../socials";
import { usePathname } from "next/navigation";

type Props = {
  quote: Awaited<ReturnType<typeof import("@/hooks/get-quotes").getQuotes>>;
};

export default function FooterContent({ quote }: Props) {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog";

  if (isBlogPage) {
    return null;
  }

  return (
    <footer className="mx-auto w-full max-w-2xl rounded-md px-4 py-0">
      <Line type="horizontal" width={640} className="my-8" />

      {quote && (
        <div className="bg-custom-gray/10 dark:border-custom-white/10 border-custom-black flex w-full flex-col gap-3 rounded-sm border p-4">
          <p className="text-center text-sm">“ {quote.quote} ”</p>

          <div className="space-y-1 text-right">
            <p className="font-display text-xs italic">
              — {quote.author?.name},{" "}
              <span className="text-md ml-1">{quote.author?.company.name}</span>
            </p>
          </div>
        </div>
      )}

      <div className="my-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="font-sans text-xl">Connect With Me</p>

        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <Socials />
        </div>
      </div>

      <Line type="horizontal" width={640} className="mt-8 mb-4" />

      <p className="font-display text-sm font-light">
        &copy; 2026 Vishal Gupta. All rights reserved.
      </p>
    </footer>
  );
}
