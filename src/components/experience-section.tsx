import ExperienceCard from "./experience-card";

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
        <ExperienceCard
          companyName="Reospark Technologies Pvt. Ltd."
          timeline="July 2025 - August 2026"
          role="Software Engineer"
          locations="Noida, India (On-site)"
        />
        <ExperienceCard
          companyName="Vomyra AI"
          timeline="January 2025 - June 2025"
          role="Software Engineer Intern"
          locations="Noida, India (On-site)"
        />
      </div>
    </section>
  );
}
