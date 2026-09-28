import ExperienceCard from "./experience-card";
import { WORK_EXPERIENCES } from "@/lib/experience";

export default function ExperienceSection() {
  return (
    <section className="w-full max-w-2xl mx-auto py-8 px-4 border-b border-border/40">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground font-sans">
            Experience
          </h2>
          <p className="text-xs text-muted-foreground font-display mt-0.5">
            Engineering roles & production platform contributions
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {WORK_EXPERIENCES.map((exp) => (
          <ExperienceCard
            key={exp.id}
            companyName={exp.company}
            timeline={exp.period}
            role={exp.role}
            locations={`${exp.location} (${exp.locationType})`}
            summary={exp.summary}
            technologies={exp.technologies}
          />
        ))}
      </div>
    </section>
  );
}
