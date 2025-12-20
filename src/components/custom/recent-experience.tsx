"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import ExperienceCard from "./experience-card";
import { useRouter } from "next/navigation";

export default function RecentExperience() {
  const navigate = useRouter();

  return (
    <section>
      <div className="my-16 px-8 py-4">
        <div>
          <h2 className="text-4xl font-bold mb-8">Recent Experience</h2>
        </div>
        <div className="space-y-8">
          <ExperienceCard
            role="Software Developer Intern"
            company="Vomyra AI"
            description1="Built and optimized real-time voice AI agents using Node.js, WebSockets, and FFmpeg, increasing streaming efficiency by 60% and streamlining transcription workflows for production deployment"
            description2="Improved website accessibility and discoverability by developing SEO-optimized frontend pages, resulting in enhanced user engagement and search engine visibility"
            description3="Collaborated with cross-functional teams to integrate voice processing APIs and debug latency issues in real-time streaming pipelines"
          />
          {/* <ExperienceCard
            role="Web Development Intern"
            company="Coginfyz Technologies"
            description1="Developed a full-stack job portal using the MERN stack with interactive job listings and user profiles, optimizing MongoDB queries to reduce load times by 40%"
            description2="Implemented responsive UI with Tailwind CSS, improving cross-device navigation speed by 40% and enhancing user engagement during testing phases"
            description3="Designed RESTful APIs for authentication and job management with JWT-based security and role-based access control"
          /> */}
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => navigate.push("/experience")}
            className="text-teal-400 cursor-pointer mt-8 rounded-none text-md font-semibold hover:text-zinc-900"
          >
            Experience Timeline
            <ArrowUpRight className="ml-1 h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  );
}
