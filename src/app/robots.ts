import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/blog/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
