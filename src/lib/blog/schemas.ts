import { z } from "zod"

export const blogPostMetadataSchema = z
  .object({
    title: z.string().trim().min(1, "Blog title is required.").max(120),
    description: z
      .string()
      .trim()
      .min(1, "Blog description is required.")
      .max(200),
    publishedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    image: z.string().trim().startsWith("/").optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    published: z.boolean().default(false),
    dualView: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.updatedAt) {
        return true
      }

      return new Date(data.updatedAt) >= new Date(data.publishedAt)
    },
    {
      message: "updatedAt cannot be earlier than publishedAt.",
      path: ["updatedAt"],
    },
  )

export type BlogPostMetadata = z.infer<typeof blogPostMetadataSchema>
