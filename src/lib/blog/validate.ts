import { z } from "zod"

export const blogPostMetadataSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Blog title is required.")
    .max(120, "Blog title cannot exceed 120 characters."),
  description: z
    .string()
    .trim()
    .min(1, "Blog description is required.")
    .max(200, "Blog description cannot exceed 200 characters."),
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  image: z.string().trim().optional(),
  tags: z
    .array(z.string().trim().min(1))
    .default([])
    .transform((tags) => [...new Set(tags)]),
  published: z.boolean().default(false),
})

export type BlogPostMetadata = z.infer<typeof blogPostMetadataSchema>
