import MainLayout from "./main-layout"
import {
  BrainIcon,
  ClockIcon,
  CodeIcon,
  EmailIcon,
  GenderIcon,
  LinkIcon,
  LocationIcon,
  PhoneIcon,
} from "./socials"
import TimeDisplay from "./time-stamp"

export default function About() {
  return (
    <MainLayout>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full gap-2.5 sm:gap-2 py-2 text-sm px-4'>
        <div className='col-span-1 sm:col-span-2 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <CodeIcon />
          </div>
          <span className="truncate sm:overflow-visible">Backend-focused Software Engineer</span>
        </div>
        <div className='col-span-1 sm:col-span-2 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <BrainIcon />
          </div>
          <span className="truncate sm:overflow-visible">Building Linkforge & Analytics Engine</span>
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <LocationIcon />
          </div>
          Delhi, India
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <ClockIcon />
          </div>
          <TimeDisplay />
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <PhoneIcon />
          </div>
          +91-9650153145
        </div>
        <div className='col-span-1 flex gap-2 items-center min-w-0'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <EmailIcon />
          </div>
          <span className="truncate sm:overflow-visible text-xs sm:text-sm">abhimanyug987@gmail.com</span>
        </div>
        <div className='col-span-1 flex gap-2 items-center min-w-0'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <LinkIcon />
          </div>
          <span className="truncate sm:overflow-visible">linkforge or some cool projects link</span>
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm shrink-0'>
            <GenderIcon />
          </div>
          he/him
        </div>
      </section>
    </MainLayout>
  )
}
