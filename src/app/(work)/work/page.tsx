"use client";

import WorkCard from "../(components)/work-card";

export default function Work() {
  return (
    <div>
      <div className="pt-24 space-y-4">
        <div className="w-full max-w-5xl mx-auto px-8 py-12">
          <h1 className="text-6xl font-bold mb-6 tracking-tighter">Work</h1>
          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
            A curated collection of projects showcasing design thinking,
            technical execution, and measurable impact.
          </p>
        </div>
        <div className="w-full max-w-5xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
            <div className="flex flex-col gap-8 my-12">
              <WorkCard
                imgSrc="/images/clariv.png"
                title="Clariv"
                mainDescription="An AI-powered platform for file and meeting summarization"
                solutions={[
                  "Better user experience & scalability",
                  "Advanced AI integration",
                ]}
                skills={[
                  "Next.js",
                  "Tailwind CSS",
                  "Express",
                  "MongoDB",
                  "Gemini API",
                ]}
                duration="2024"
              />
              <WorkCard
                imgSrc="/images/mentora.png"
                title="Mentora"
                mainDescription="A AI-powered career platform connecting students with industry experts"
                solutions={[
                  "Enhanced practical learning",
                  "Scalable architecture",
                  "Robust AI features",
                ]}
                skills={[
                  "React",
                  "Next.js",
                  "PostgreSQL",
                  "Gemini API",
                  "ShadCN",
                  "Tailwind CSS",
                ]}
                duration="2025"
              />
            </div>
            <div className="flex flex-col gap-16 pt-32 my-12">
              <WorkCard
                imgSrc="https://images.unsplash.com/photo-1765873360351-9b8e1ac646de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
                title="TravelEase"
                mainDescription="An AI-driven travel planning app for personalized itineraries"
                solutions={[
                  "Personalized travel plans",
                  "Seamless user experience",
                ]}
                skills={[
                  "Next.js",
                  "Tailwind CSS",
                  "Firebase",
                  "Gemini API",
                  "Google Maps API",
                ]}
                duration="2025"
              />
              <WorkCard
                imgSrc="/images/divvy.png"
                title="Divvy"
                mainDescription="A clone of Splitwise that simplifies group expense management"
                solutions={["Effortless expense tracking", "Secure payments"]}
                skills={[
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "MongoDB",
                  "Google OAuth",
                ]}
                duration="2024"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
