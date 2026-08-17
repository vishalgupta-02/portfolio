import { Line } from "./lines"
import MainLayout from "./main-layout"
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
} from "./ui/svgs-of-techs"

export default function SkillsSection() {
  return (
    <MainLayout>
      <section className='w-full max-w-2xl mx-auto py-4 px-4'>
        <div>
          <h2 className='text-[24px] font-semibold mb-6 sm:mb-4 text-center md:text-left'>
            Skills
          </h2>
        </div>
        <div className='space-y-6 sm:space-y-4'>
          {/* Languages */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-2 mb-2'>
            <p className='w-auto sm:w-28 shrink-0 text-xs sm:text-sm font-medium text-foreground text-center sm:text-left'>
              Languages
            </p>
            <Line
              type='vertical'
              width={2}
              height={30}
              className='hidden sm:block mr-2 sm:mr-4 shrink-0'
            />
            <div className='flex items-center justify-center sm:justify-start gap-2 flex-wrap flex-1 min-w-0'>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <JavaScript className='size-3' />
                JavaScript
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <TypeScript className='size-3' />
                TypeScript
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Python />
                Python
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit'>
                C++
              </p>
            </div>
          </div>

          {/* Frontend */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-2 mb-2'>
            <p className='w-auto sm:w-28 shrink-0 text-xs sm:text-sm font-medium text-foreground text-center sm:text-left'>
              Frontend
            </p>
            <Line
              type='vertical'
              width={2}
              height={60}
              className='hidden sm:block mr-2 sm:mr-4 shrink-0'
            />
            <div className='flex items-center justify-center sm:justify-start gap-2 flex-wrap flex-1 min-w-0'>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <React />
                React
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <NextJS />
                Next.js
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <ShadCN />
                ShadCN
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <TailwindCSS />
                TailwindCSS
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Motion />
                Motion
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <TanStack />
                TanStack
              </p>
            </div>
          </div>

          {/* Backend & Databases */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-2 mb-2'>
            <p className='w-auto sm:w-28 shrink-0 text-xs sm:text-sm font-medium text-foreground text-center sm:text-left'>
              Backend & Databases
            </p>
            <Line
              type='vertical'
              width={2}
              height={60}
              className='hidden sm:block mr-2 sm:mr-4 shrink-0'
            />
            <div className='flex items-center justify-center sm:justify-start gap-2 flex-wrap flex-1 min-w-0'>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <NodeJS />
                Node.js
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                Express.js
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <MongoDB />
                MongoDB
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <PostgreSQL />
                PostgreSQL
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                Django
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit'>
                Django REST Framework
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit'>
                MySQL
              </p>
            </div>
          </div>

          {/* Workflow & Tools */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-2 mb-2'>
            <p className='w-auto sm:w-28 shrink-0 text-xs sm:text-sm font-medium text-foreground text-center sm:text-left'>
              Workflow & Tools
            </p>
            <Line
              type='vertical'
              width={2}
              height={50}
              className='hidden sm:block mr-2 sm:mr-4 shrink-0'
            />
            <div className='flex items-center justify-center sm:justify-start gap-2 flex-wrap flex-1 min-w-0'>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Git />
                Git
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Github />
                GitHub
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                VS Code
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                Postman
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Docker />
                Docker
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <ChatGPT />
                ChatGPT
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Claude />
                Claude
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Gemini />
                Gemini
              </p>
            </div>
          </div>

          {/* Deployment */}
          <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-2 mb-2'>
            <p className='w-auto sm:w-28 shrink-0 text-xs sm:text-sm font-medium text-foreground text-center sm:text-left'>
              Deployment
            </p>
            <Line
              type='vertical'
              width={2}
              height={30}
              className='hidden sm:block mr-2 sm:mr-4 shrink-0'
            />
            <div className='flex items-center justify-center sm:justify-start gap-2 flex-wrap flex-1 min-w-0'>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                <Vercel />
                Vercel
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                Netlify
              </p>
              <p className='border border-border/60 bg-muted/40 px-2.5 py-1 rounded-full text-[13px] text-foreground/80 hover:text-foreground hover:border-border transition-colors w-fit flex gap-1 items-center'>
                Render
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
