import ExperCard from "../(components)/exp-card";

export default function Experience() {
  return (
    <div className="pt-24 space-y-4 mb-12">
      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-6xl font-bold mb-6 tracking-tighter">Experience</h1>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
          My professional journey building impactful products and crafting
          memorable experiences.
        </p>
      </div>
      <div className="pb-12 pt-2">
        <div className="w-full max-w-5xl mx-auto px-8 py-8 space-y-16">
          <ExperCard
            role="Software Engineer Intern"
            company="Vomyra AI"
            duration="July 2025 - September 2025"
            description1="Developed and optimized machine learning algorithms for real-time data analysis, improving processing speed by 30%."
            description2="Collaborated with cross-functional teams to design and implement scalable software solutions, enhancing system reliability."
            skills={[
              "Node",
              "Express",
              "MongoDB",
              "Microsoft Azure",
              "Ffmpeg",
              "Process Management",
            ]}
          />
          <ExperCard
            role="Web Developer Intern"
            company="Cognifyz Technologies"
            duration="July 2025 - September 2025"
            description1="Developed a job portal web application using React for the frontend and Node.js with Express for the backend, enabling seamless job search and application processes."
            description2="Implemented RESTful APIs and integrated MongoDB for efficient data management, resulting in a 25% improvement in data retrieval times."
            skills={[
              "React",
              "Node",
              "Express",
              "MongoDB",
              "REST APIs",
              "Web Development",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
