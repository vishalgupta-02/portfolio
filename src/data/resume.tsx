import { Icons } from "@/components/icons"
import { BrainCircuit, HomeIcon, NotebookIcon } from "lucide-react"
import { ReactLight } from "@/components/ui/svgs/reactLight"
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark"
import { Typescript } from "@/components/ui/svgs/typescript"
import { Nodejs } from "@/components/ui/svgs/nodejs"
import { Python } from "@/components/ui/svgs/python"
import { Golang } from "@/components/ui/svgs/golang"
import { Postgresql } from "@/components/ui/svgs/postgresql"
import { Docker } from "@/components/ui/svgs/docker"
import { Kubernetes } from "@/components/ui/svgs/kubernetes"
import { Csharp } from "@/components/ui/svgs/csharp"

export const DATA = {
  name: "Vishal Gupta",
  initials: "VG",
  url: "https://vishalbuild.tech",
  location: "Noida, India",
  locationLink: "https://www.google.com/maps/place/uttarpradesh",
  description:
    "A software engineer on an intentional, all-in journey — from writing code to truly understanding the systems behind it.",
  summary:
    "I build things the hard way first. Recently, I built authentication from scratch before ever touching a library — because I believe you should earn your abstractions. Currently building LinkFlow, and learning something I didn't know yesterday, every single day.",
  avatarUrl: "/me.jpg",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "C++", icon: Csharp },
    { name: "Golang", icon: Golang },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: BrainCircuit, label: "Projects" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+91 9650153145",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/vishalgupta-02",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vishal-gupta-16018719a/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/VishalG41764750",
        icon: Icons.x,
        navbar: true,
      },
      // Youtube: {
      //   name: 'Youtube',
      //   url: 'https://dub.sh/dillion-youtube',
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "abhimanyug987@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Cognifyz Technologies",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Web Developer Intern",
      logoUrl: "",
      start: "Sept 2025",
      end: "Oct 2024",
      description: "",
    },
    {
      company: "Vomyra AI",
      href: "#",
      badges: [],
      location: "Onsite",
      title: "Software Developer Intern",
      logoUrl: "",
      start: "July 2025",
      end: "Dec 2025",
      description: "",
    },
    {
      company: "Reospark Technology Pvt. Ltd",
      href: "#",
      badges: [],
      location: "On-site",
      title: "Software Engineer",
      logoUrl: "",
      start: "Jan 2025",
      end: "Present",
      description: "",
    },
  ],
  education: [
    {
      school: "GR Convent School",
      href: "#",
      degree: "High School",
      logoUrl: "",
      start: "2016",
      end: "2018",
    },
    {
      school: "Police Modern School",
      href: "#",
      degree: "Intermediate",
      logoUrl: "",
      start: "2018",
      end: "2020",
    },
    {
      school: "IIMT College of Engineering",
      href: "#",
      degree: "Bachelor in Information Technology",
      logoUrl: "",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "Clariv",
      href: "https://clariv.vercel.app",
      dates: "Nov 2025 - Jan 2024",
      active: true,
      description:
        "Ever uploaded a 40-page PDF and wished something would just... read it for you? Thats Clariv.",
      technologies: [
        "Next.js",
        "Typescript",
        "Mongoose",
        "MongoDB",
        "TailwindCSS",
        "OAuth",
        "Shadcn UI",
        "Google GenAI",
      ],
      links: [
        {
          type: "Website",
          href: "https://clariv.vercel.app/",
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: "Source",
          href: "https://github.com/vishalgupta-02/Clariv.git",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "/clariv.png",
      video: "",
    },
    {
      title: "Careerly",
      href: "https://careerly-nu.vercel.app",
      dates: "Sept 2025 - Oct 2025",
      active: true,
      description:
        "Job hunting is stressful. Most people do not fail interviews because theyre unqualified — they fail because they were not prepared the right way. ",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Clerk",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://careerly-nu.vercel.app",
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: "Source",
          href: "https://github.com/vishalgupta-02/Careerly.git",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "/careerly.png",
      video: "",
    },
    {
      title: "Applyless",
      href: "https://applyless-waitlist.vercel.app",
      dates: "Feb 2026 - Present",
      active: true,
      description:
        "Applyless is a lightweight, no-noise tracker for applications, follow-ups, and status updates. No bloat. Just clarity.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "NodeJS",
        "Recharts",
        "Motion",
      ],
      links: [
        {
          type: "Website",
          href: "https://applyless-waitlist.vercel.app",
          icon: <Icons.globe className='size-3' />,
        },
        {
          type: "Source",
          href: "https://github.com/vishalgupta-02/applyless.git",
          icon: <Icons.github className='size-3' />,
        },
      ],
      image: "/applyless.png",
      video: "",
    },
    {
      title: "Linkflow",
      href: "https://automatic.chat",
      dates: "March 2026 - Sept 2026",
      active: true,
      description:
        "Everyone talks about building for scale. I am actually doing it — from scratch, in the open, learning every step of the way.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "NodeJS",
        "Express",
        "Redis",
        "BullMQ",
        "Stripe",
        "Better-Auth",
        "Docker",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Divvy",
      href: "https://divvy-eta.vercel.app",
      dates: "March 2026 - Sept 2026",
      active: true,
      description:
        "A real-time ETA sharing app built on Next.js, PostgreSQL, and Prisma. It allows users to share their live location and ETA with friends and family, making meetups and pickups easier than ever.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "NodeJS",
        "Express",
        "Neondb",
      ],
      links: [
        {
          type: "Website",
          href: "https://divvy-eta.vercel.app",
          icon: <Icons.globe className='size-3' />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "NSHM X OSSDC Code for Change",
      dates: "February, 2025",
      location: "London, Ontario",
      description:
        "My first hackathon. 48 hours, a team, and a problem worth solving — a live blood bank and hospital finder that used the Geolocation API to show people exactly where to go in a medical emergency.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          href: "",
          icon: "",
          title: "",
        },
      ],
    },
  ],
} as const
