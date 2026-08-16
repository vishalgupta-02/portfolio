// "use client"

// import { usePathname } from "next/navigation"
// import { ArrowUpRight } from "lucide-react"

// interface ExperienceCardProps {
//   companyName: string
//   timeline: string
//   role: string
//   locations: string
// }

// export default function ExperienceCard({
//   companyName,
//   timeline,
//   role,
//   locations,
// }: ExperienceCardProps) {
//   const pathname = usePathname()

//   return (
//     <div className='flex justify-center flex-col items-center group'>
//       <a href='/work' className='w-full'>
//         <div className='w-full flex justify-between items-center gap-1'>
//           <h3 className='text-[16px] font-semibold tracking-wide font-sans dark:text-custom-white text-custom-black flex items-center gap-1'>
//             {companyName}
//             <span className='opacity-0 group-hover:opacity-100 text-custom-gray group-hover:translate-x-1 transition-transform duration-150'>
//               {pathname === "/work" ? (
//                 <></>
//               ) : (
//                 <ArrowUpRight className='size-4' />
//               )}
//             </span>
//           </h3>
//           <p className='text-[13px] font-display text-custom-gray'>
//             {timeline}
//           </p>
//         </div>
//         <div className='w-full flex justify-between items-center gap-1'>
//           <p className='text-[13px] font-display text-custom-gray'>{role}</p>
//           <p className='text-[13px] font-display text-custom-gray'>
//             {locations}
//           </p>
//         </div>
//       </a>
//     </div>
//   )
// }

//! --------------------------------------------------------------------------------------------

"use client"

import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

interface ExperienceCardProps {
  companyName: string
  timeline: string
  role: string
  locations: string
}

export default function ExperienceCard({
  companyName,
  timeline,
  role,
  locations,
}: ExperienceCardProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const content = (
    <div className='w-full flex justify-between items-center gap-1'>
      <h3 className='text-[16px] font-semibold tracking-wide font-sans dark:text-custom-white text-custom-black flex items-center gap-1'>
        {companyName}

        {isHomePage && (
          <span className='opacity-0 group-hover:opacity-100 text-custom-gray group-hover:translate-x-1 transition-all duration-150'>
            <ArrowUpRight className='size-4' />
          </span>
        )}
      </h3>

      <p className='text-[13px] font-display text-custom-gray italic'>
        {timeline}
      </p>
    </div>
  )

  const details = (
    <div className='w-full flex justify-between items-center gap-1'>
      <p className='text-[13px] font-display text-custom-gray italic'>{role}</p>

      <p className='text-[13px] font-display text-custom-gray italic'>
        {locations}
      </p>
    </div>
  )

  return (
    <div className='flex justify-center flex-col items-center group'>
      {isHomePage ? (
        <a href='/work' className='w-full'>
          {content}
          {details}
        </a>
      ) : (
        <div className='w-full'>
          {content}
          {details}
        </div>
      )}
    </div>
  )
}
