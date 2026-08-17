import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Geist } from "next/font/google"
import { cn } from "@/lib/utils"
import { IntroLoader } from "@/components/intro-loader"
import { siteConfig } from "@/lib/blog/site"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const spaceGrotesk = localFont({
  // for the heading
  src: "../../public/fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
})

const publicSans = localFont({
  // for the body
  src: "../../public/fonts/PublicSans-Variable.ttf",
  variable: "--font-public-sans",
  display: "swap",
  preload: true,
})

const jetbrainsMono = localFont({
  // for the code
  src: "../../public/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
})

const idGrotesk = localFont({
  // for the code
  src: "../../public/fonts/IDGroteskRegular-BcJmFnYE.woff2",
  variable: "--font-id-grotesk",
  display: "swap",
  preload: true,
})

// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: [...siteConfig.keywords],
//   authors: [
//     {
//       name: siteConfig.author,
//     },
//   ],
//   alternates: {
//     types: {
//       "application/rss+xml": [
//         {
//           url: "/feed.xml",
//           title: "Vishal Gupta RSS Feed",
//         },
//       ],
//     },
//   },
//   creator: siteConfig.author,
//   publisher: siteConfig.author,
//   robots: {
//     index: true,
//     follow: true,
//   },
// }

const ogImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: "Vishal Gupta — Software Engineer",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.author,
  publisher: siteConfig.author,
  applicationName: "Vishal Gupta",
  category: "technology",
  alternates: {
    canonical: siteConfig.url,

    types: {
      "application/rss+xml": [
        {
          url: "/feed.xml",
          title: "Vishal Gupta RSS Feed",
        },
      ],
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@VishalG41764750",
    images: [siteConfig.ogImage],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      data-scroll-behavior='smooth'
      lang='en'
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        publicSans.variable,
        jetbrainsMono.variable,
        idGrotesk.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning>
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
