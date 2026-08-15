import { Line } from "./lines";
import MainLayout from "./main-layout";
import { getQuotes } from "@/hooks/get-quotes";
import { Socials } from "./socials";

export default async function Footer() {
  const quote = await getQuotes();

  return (
    <MainLayout>
      <footer className="w-full max-w-2xl rounded-md mx-auto px-4 py-8">
        <Line type="horizontal" width={640} className="my-8" />
        {quote && (
          <div className="w-full flex flex-col p-4 gap-3 rounded-sm bg-custom-gray/10 border dark:border-custom-white border-custom-black">
            <p className="text-center text-lg">“ {quote.quote} ”</p>
            <div className="space-y-1 text-right">
              <p className="text-md font-display italic">
                — {quote.author?.name},{" "}
                <span className="text-md ml-1">
                  {quote.author?.company.name}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between my-8">
          <p className="text-xl font-sans">Connect With Me</p>
          <div className="flex gap-2 justify-end items-center">
            <Socials />
          </div>
        </div>

        <Line type="horizontal" width={640} className="mb-4 mt-8" />
        <p className="font-display font-light text-sm">
          &copy; 2026 Vishal Gupta. All rights reserved.
        </p>
      </footer>
    </MainLayout>
  );
}
