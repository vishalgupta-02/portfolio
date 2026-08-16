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
      <section className='grid grid-cols-2 w-full gap-2 py-2 text-sm px-4'>
        <div className='col-span-2 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <CodeIcon />
          </div>
          Backend-focused Software Engineer
        </div>
        <div className='col-span-2 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <BrainIcon />
          </div>
          Building Linkforge & Analytics Engine
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <LocationIcon />
          </div>
          Delhi, India
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <ClockIcon />
          </div>
          <TimeDisplay />
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <PhoneIcon />
          </div>
          +91-9650153145
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <EmailIcon />
          </div>
          abhimanyug987@gmail.com
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <LinkIcon />
          </div>
          linkforge or some cool projects link
        </div>
        <div className='col-span-1 flex gap-2 items-center'>
          <div className='border border-white p-0.5 rounded-sm'>
            <GenderIcon />
          </div>
          he/him
        </div>
      </section>
    </MainLayout>
  )
}
