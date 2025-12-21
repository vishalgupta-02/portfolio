import Image from "next/image";

export default function Project1() {
  return (
    <div className="w-full h-full min-h-1/2 flex items-center justify-center mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 group cursor-pointer">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold mb-4 group-hover:text-teal-500 transition-colors duration-500">
            Clariv
          </h2>
          <p>AI-powered document summarization platform using advanced NLP.</p>
          <ul className="mt-4 flex justify-start items-center gap-2 uppercase text-xs text-zinc-600 dark:text-zinc-300 tracking-wider">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>OpenAI API</li>
          </ul>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 mt-4 max-w-sm">
            Automatically summarizes lengthy documents in{" "}
            <span className="font-semibold text-teal-500">30 seconds</span> to
            save time and extract{" "}
            <span className="font-semibold text-teal-500">95%</span> of key
            insights.
          </p>
        </div>
        <div className="overflow-hidden">
          <Image
            src="/images/clariv_portfolio.png"
            width={1200}
            height={1200}
            alt="Clariv-project"
            className="group-hover:scale-110 w-full h-full min-h-80 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
