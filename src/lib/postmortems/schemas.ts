import { z } from "zod"

export const postmortemSeveritySchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
])

export const postmortemStatusSchema = z.enum(["resolved", "monitoring", "open"])

export const postmortemCategorySchema = z.enum([
  "authentication",
  "database",
  "infrastructure",
  "performance",
  "security",
  "deployment",
  "api",
  "observability",
  "other",
])

export const postmortemMetadataSchema = z
  .object({
    slug: z.string().trim().min(1).optional(),
    title: z.string().trim().min(1, "Title is required").max(160),
    description: z.string().trim().min(1, "Description is required").max(300),
    date: z.string().trim().min(1, "Date is required"),
    updatedAt: z.string().trim().optional(),
    status: postmortemStatusSchema.default("resolved"),
    severity: postmortemSeveritySchema.default("medium"),
    category: postmortemCategorySchema.default("other"),
    tags: z.array(z.string().trim().min(1)).default([]),
    duration: z.string().trim().optional(),
    systemsAffected: z.array(z.string().trim().min(1)).optional(),
    impact: z.string().trim().min(1, "Impact summary is required"),
    rootCause: z.string().trim().min(1, "Root cause summary is required"),
    resolution: z.string().trim().min(1, "Resolution summary is required"),
    lessonsLearned: z.array(z.string().trim().min(1)).optional(),
    author: z.string().trim().default("Vishal Gupta"),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (!data.updatedAt) return true
      return new Date(data.updatedAt) >= new Date(data.date)
    },
    {
      message: "updatedAt cannot be earlier than date",
      path: ["updatedAt"],
    },
  )

export type PostmortemMetadataInput = z.infer<typeof postmortemMetadataSchema>
