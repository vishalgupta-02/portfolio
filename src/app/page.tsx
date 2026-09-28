import About from "@/components/about";
import BuildLog from "@/components/build-log";
import ContactSection from "@/components/contact-section";
import EngineeringSection from "@/components/engineering-section";
import ExperienceSection from "@/components/experience-section";
import GithubSection from "@/components/github-section";
import Hero from "@/components/hero";
import MainLayout from "@/components/main-layout";
import ProjectSection from "@/components/project-section";
import SkillsSection from "@/components/skills-section";

export default async function Home() {
  return (
    <>
      <MainLayout>
        <div className="animate-enter [animation-delay:40ms]">
          <Hero />
        </div>
        <div className="animate-enter [animation-delay:120ms]">
          <About />
        </div>
        <div className="animate-enter [animation-delay:200ms]">
          <ProjectSection />
        </div>
        <div className="animate-enter [animation-delay:280ms]">
          <EngineeringSection />
        </div>
        <div className="animate-enter [animation-delay:360ms]">
          <ExperienceSection />
        </div>
        <div className="animate-enter [animation-delay:440ms]">
          <SkillsSection />
        </div>
        <div className="animate-enter [animation-delay:520ms]">
          <BuildLog />
        </div>
        <div className="animate-enter [animation-delay:600ms]">
          <GithubSection />
        </div>
        <div className="animate-enter [animation-delay:680ms]">
          <ContactSection />
        </div>
      </MainLayout>
    </>
  );
}

