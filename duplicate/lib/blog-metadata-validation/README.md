# Blog Post Metadata Schema (`validate.ts`)

## Status

Confirmed duplicate / Superseded utility schema.

## Original locations

- `src/lib/blog/validate.ts`

## What it did

Defined the Zod schema `blogPostMetadataSchema` and exported the type `BlogPostMetadata` for validating MDX frontmatter.

## Why it was archived

The blog data parsing pipeline was standardized into `src/lib/blog/schemas.ts`, which defines the comprehensive `blogPostFrontmatterSchema` and exports `BlogPostMetadata` used across `src/lib/blog/mdx.ts` and `src/lib/blog/queries.ts`. `validate.ts` became a duplicate/superseded schema definition.

## Current replacement

- `src/lib/blog/schemas.ts` (`blogPostFrontmatterSchema`)

## Archived files

- `validate.ts`

## Notes

This archive is preserved for historical reference.
The original implementation remains in its original location until manually removed.
