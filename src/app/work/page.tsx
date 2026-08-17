import ExperienceCard from "@/components/experience-card"
import { Line } from "@/components/lines"
import MainLayout from "@/components/main-layout"
import {
  Git,
  Github,
  JavaScript,
  NextJS,
  NodeJS,
  Python,
  TypeScript,
} from "@/components/ui/svgs-of-techs"

export default function Work() {
  return (
    <MainLayout>
      <section className='w-full max-w-2xl px-4 mx-auto py-4'>
        <div className='flex flex-col gap-1 my-2'>
          <h2 className='text-2xl font-sans font-semibold'>Work Experience</h2>
          <p className='text-[14px] font-display text-custom-gray'>
            Works that taught me something during its timeperiod.
          </p>
        </div>
        <div className='mt-8'>
          <div className='w-full mb-3'>
            <ExperienceCard
              companyName='Reospark Technologies Pvt. Ltd.'
              timeline='July 2025 - August 2026'
              role='Software Engineer'
              locations='Noida, India (On-site)'
            />
          </div>
          <Line type='horizontal' className='w-full' width={660} />
          <div className='w-full flex items-start justify-center gap-1 flex-col mt-6'>
            <div>
              <h3 className='text-sm dark:text-custom-white text-custom-black font-bold mb-1'>
                What I&apos;ve done
              </h3>
            </div>
            <div className='text-sm text-custom-gray space-y-1.5 font-display'>
              <p>
                • Built admin dashboards with Django, DRF, and Next.js for
                centralized operations and KPI tracking.
              </p>
              <p>
                • Designed MySQL schemas for production workloads and
                multi-client data isolation.
              </p>
              <p>
                • Led 3 client engagements end-to-end across Python/Django and
                Next.js, from requirements to delivery and iteration.
              </p>
            </div>
            <div className='flex gap-2 flex-col'>
              <p className='text-sm dark:text-custom-white text-custom-black font-bold mb-1 mt-3'>
                Tools & Technologies
              </p>
              <div className='flex items-center gap-4 flex-wrap'>
                <JavaScript className='size-5' />
                <NextJS className='size-5' />
                <Python className='size-5' />
                <Git className='size-5' />
                <Github className='size-5' />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <div className='w-full mb-3'>
            <ExperienceCard
              companyName='Vomyra AI'
              timeline='January 2025 - June 2025'
              role='Software Engineer Intern'
              locations='Noida, India (On-site)'
            />
          </div>
          <Line type='horizontal' className='w-full' width={660} />
          <div className='w-full flex items-start justify-center gap-1 flex-col mt-6'>
            <div>
              <h3 className='text-sm dark:text-custom-white text-custom-black font-bold mb-1'>
                What I&apos;ve done
              </h3>
            </div>
            <div className='text-sm text-custom-gray space-y-1.5 font-display'>
              <p>
                • Built and optimized real-time voice AI agents with Node.js,
                WebSockets, and FFmpeg for efficient streaming and
                transcription.
              </p>
              <p>
                • Integrated voice APIs, optimized real-time streaming latency,
                and collaborated across engineering and product teams.
              </p>
              <p>
                • Developed SEO-optimized frontend pages to improve
                discoverability and user engagement.
              </p>
            </div>
            <div className='flex gap-2 flex-col'>
              <p className='text-sm dark:text-custom-white text-custom-black font-bold mb-1 mt-3'>
                Tools & Technologies
              </p>
              <div className='flex items-center gap-4 flex-wrap'>
                <TypeScript className='size-5' />
                <NextJS className='size-5' />
                <NodeJS className='size-5' />
                <Git className='size-5' />
                <Github className='size-5' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
