import MainLayout from "./main-layout";
import ExperienceCard from "./experience-card";

export default function ExperienceSection() {
  return (
    <MainLayout>
      <section className="w-full max-w-2xl mx-auto py-4 px-4">
        <div>
          <h2 className="text-[24px] font-semibold mb-4">Experience</h2>
        </div>
        <div className="flex flex-col gap-4">
          {/* First experience */}
          <ExperienceCard
            companyName="Reospark Technologies Pvt. Ltd."
            timeline="July 2025 - August 2026"
            role="Software Engineer"
            locations="Noida, India (On-site)"
          />
          {/* Second experience */}
          <ExperienceCard
            companyName="Vomyra AI"
            timeline="January 2025 - June 2025"
            role="Software Engineer Intern"
            locations="Noida, India (On-site)"
          />
        </div>
      </section>
    </MainLayout>
  );
}
