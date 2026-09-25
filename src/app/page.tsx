import About from "@/components/about";
import ContactSection from "@/components/contact-section";
import ExperienceSection from "@/components/experience-section";
import GithubSection from "@/components/github-section";
import Hero from "@/components/hero";
// import { IntroLoader } from "@/components/intro-loader";
import MainLayout from "@/components/main-layout";
import ProjectSection from "@/components/project-section";
import SkillsSection from "@/components/skills-section";

export default async function Home() {
  return (
    <>
      {/* IntroLoader preserved and commented out in favor of hardware-accelerated CSS bottom-to-top stagger */}
      {/* <IntroLoader /> */}
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
          <ExperienceSection />
        </div>
        <div className="animate-enter [animation-delay:360ms]">
          <SkillsSection />
        </div>
        <div className="animate-enter [animation-delay:440ms]">
          <GithubSection />
        </div>
        <div className="animate-enter [animation-delay:520ms]">
          <ContactSection />
        </div>
      </MainLayout>
    </>
  );
}

