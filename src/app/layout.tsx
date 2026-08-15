import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { IntroLoader } from "@/components/intro-loader";
import { siteConfig } from "@/lib/blog/site";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = localFont({
  // for the heading
  src: "../../public/fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const publicSans = localFont({
  // for the body
  src: "../../public/fonts/PublicSans-Variable.ttf",
  variable: "--font-public-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = localFont({
  // for the code
  src: "../../public/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

// export const metadata: Metadata = {
//   title: "Portfolio",
//   description: "Personal portfolio built with Next.js",
// }

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
    },
  ],
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/feed.xml",
          title: "Vishal Gupta RSS Feed",
        },
      ],
    },
  },
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        publicSans.variable,
        jetbrainsMono.variable,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IntroLoader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
