import { Line } from "./lines";
import MainLayout from "./main-layout";
import {
  ChatGPT,
  Claude,
  Docker,
  Gemini,
  Git,
  Github,
  JavaScript,
  MongoDB,
  Motion,
  NextJS,
  NodeJS,
  PostgreSQL,
  Python,
  React,
  ShadCN,
  TailwindCSS,
  TanStack,
  TypeScript,
  Vercel,
} from "./ui/svgs-of-techs";

export default function SkillsSection() {
  return (
    <MainLayout>
      <section className="w-full max-w-2xl mx-auto py-4 px-4">
        <div>
          <h2 className="text-[24px] font-semibold mb-4">Skills</h2>
        </div>
        <div className="space-y-4">
          {/* Skills */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="w-[17%]">Language</p>
            <Line type="vertical" width={2} height={30} className="mr-4" />
            <div className="flex items-center justify-start gap-2 flex-wrap w-[84%]">
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <JavaScript className="size-3" />
                JavaScript
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <TypeScript className="size-3" />
                TypeScript
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Python />
                Python
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit">
                C++
              </p>
            </div>
          </div>
          {/* Skills */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="w-[17%]">Frontend</p>
            <Line type="vertical" width={2} height={60} className="mr-4" />
            <div className="flex items-center justify-start gap-2 flex-wrap w-[84%]">
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <React />
                React
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <NextJS />
                Next.js
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <ShadCN />
                ShadCN
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <TailwindCSS />
                TailwindCSS
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Motion />
                Motion
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <TanStack />
                TanStack
              </p>
            </div>
          </div>
          {/* Skills */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="w-[17%]">Backend & Databases</p>
            <Line type="vertical" width={2} height={60} className="mr-4" />
            <div className="flex items-center justify-start gap-2 flex-wrap w-[84%]">
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <NodeJS />
                Node.js
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                {/* <ExpressJS /> */}
                Express.js
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <MongoDB />
                MongoDB
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <PostgreSQL />
                PostgreSQL
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                Django
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit">
                Django REST Framework
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit">
                MySQL
              </p>
            </div>
          </div>
          {/* Skills */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="w-[17%]">Workflow & Tools</p>
            <Line type="vertical" width={2} height={50} className="mr-4" />
            <div className="flex items-center justify-start gap-2 flex-wrap w-[84%]">
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Git />
                Git
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Github />
                GitHub
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                {/* <VSCode /> */}
                VS Code
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                {/* <Postman /> */}
                Postman
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Docker />
                Docker
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <ChatGPT />
                ChatGPT
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Claude />
                Claude
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Gemini />
                Gemini
              </p>
            </div>
          </div>
          {/* Skills */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="w-[17%]">Deployment</p>
            <Line type="vertical" width={2} height={30} className="mr-4" />
            <div className="flex items-center justify-start gap-2 flex-wrap w-[84%]">
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                <Vercel />
                Vercel
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                {/* <Netlify /> */}
                Netlify
              </p>
              <p className="border border-border/25 px-2 py-1 rounded-full text-[13px] text-foreground/70 w-fit flex gap-1 items-center">
                {/* <Render /> */}
                Render
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
