import About from "@/components/about";
import ExperienceSection from "@/components/experience-section";
import Hero from "@/components/hero";
import { IntroLoader } from "@/components/intro-loader";
import MainLayout from "@/components/main-layout";
import ProjectSection from "@/components/project-section";
import SkillsSection from "@/components/skills-section";

export default async function Home() {
  return (
    <>
      <IntroLoader />
      <MainLayout>
        <Hero />
        <About />
        <ProjectSection />
        <ExperienceSection />
        <SkillsSection />
      </MainLayout>
    </>
  );
}
