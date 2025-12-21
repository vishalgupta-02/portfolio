import Image from "next/image";

export default function Project2() {
  return (
    <div className="w-full h-full min-h-1/2 flex items-center justify-center mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 group cursor-pointer">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold mb-4 group-hover:text-teal-500 transition-colors duration-500">
            Mentora
          </h2>
          <p>
            AI-driven mentorship platform connecting learners with expert
            mentors.
          </p>
          <ul className="mt-4 flex justify-start items-center gap-2 uppercase text-xs text-zinc-600 dark:text-zinc-300 tracking-wider">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Gemini API</li>
            <li>PostgreSQL</li>
            <li>OpenAI API</li>
          </ul>
          <p className="text-sm text-zinc-700 dark:text-zinc-400 mt-4 max-w-sm">
            Connect with expert mentors and accelerate your learning journey
            with personalized guidance and{" "}
            <span className="font-semibold text-teal-500">AI-powered</span>{" "}
            insights to achieve your goals faster.
          </p>
        </div>
        <div className="overflow-hidden">
          <Image
            src="/images/mentora_portfolio.png"
            width={1200}
            height={1200}
            alt="Mentora-project"
            className="group-hover:scale-110 w-full h-full min-h-80 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
