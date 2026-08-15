import { siteConfig } from "./blog/site"

export function createOpenGraphImage(image: string, alt: string) {
  return {
    url: image,
    width: 1200,
    height: 630,
    alt,
  }
}
