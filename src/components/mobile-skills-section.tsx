import MainLayout from "./main-layout";
import { IconCloud } from "./ui/icon-cloud";
import {
  Git,
  Github,
  JavaScript,
  NextJS,
  Python,
  TypeScript,
  Vercel,
} from "./ui/svgs-of-techs";

export default function MobileSkillsSection() {
  return (
    <MainLayout>
      <section className="w-full max-w-2xl mx-auto py-4 px-4">
        <div>
          <h2 className="text-[24px] font-semibold mb-4">Skills</h2>
        </div>
        <div className="relative overflow-hidden">
          <IconCloud
            icons={[
              <Git className="size-4" key="git" />,
              <Github key="github" className="size-4" />,
              <NextJS key="nextjs" className="size-4" />,
              <TypeScript key="typescript" className="size-4" />,
              <JavaScript key="javascript" className="size-4" />,
              <Python key="python" className="size-4" />,
              <Vercel key="vercel" className="size-4" />,
            ]}
          />
        </div>
      </section>
    </MainLayout>
  );
}
