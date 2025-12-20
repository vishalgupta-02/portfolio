import About from "@/components/custom/about";
import CoreStack from "@/components/custom/core-stack";
import CTA from "@/components/custom/cta";
import Hero from "@/components/custom/hero";
import Quote from "@/components/custom/quote";
import RecentExperience from "@/components/custom/recent-experience";
import SelectedWork from "@/components/custom/selected-work";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <SelectedWork />
      <Quote />
      <RecentExperience />
      <CoreStack />
      <CTA />
    </div>
  );
}
