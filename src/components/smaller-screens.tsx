"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import SkillsSection from "./skills-section";
import MobileSkillsSection from "./mobile-skills-section";

export default function ResponsiveContentSkills() {
  const smallerScreen = useMediaQuery("(max-width: 767px)");

  return <> {smallerScreen ? <MobileSkillsSection /> : <SkillsSection />} </>;
}
