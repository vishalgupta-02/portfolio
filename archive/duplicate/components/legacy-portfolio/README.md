# Legacy Portfolio Components & Layouts (v0 Architecture)

## Status

Superseded implementation architecture.

## Original locations

- `archive/old-portfolio/src/components/navbar.tsx`
- `archive/old-portfolio/src/components/mode-toggle.tsx`
- `archive/old-portfolio/src/components/project-card.tsx`
- `archive/old-portfolio/src/components/timeline.tsx`
- `archive/old-portfolio/src/components/magicui/dock.tsx`
- `archive/old-portfolio/src/data/resume.tsx`

## What it did

Comprised the original Next.js template implementation of the portfolio, utilizing a MagicUI bottom floating magnification dock navbar, monolithic resume data structure, timeline components, and initial project cards.

## Why it was archived

The entire portfolio was redesigned into the modern, bespoke Next.js App Router architecture featuring a top navigation bar, refined dark/light mode toggle with Framer Motion transitions, interactive experience sections, and optimized project showcases.

## Current replacements

- Top Navbar: `src/components/header/header.tsx` & `src/components/header/site-header.tsx`
- Mode Toggle: `src/components/mode-toggle.tsx`
- Experience & Projects: `src/components/experience-section.tsx` & `src/components/projects.tsx`
- Resume / Profile data: `src/data/portfolio.ts`

## Archived files

- `navbar.tsx`
- `mode-toggle.tsx`
- `project-card.tsx`
- `timeline.tsx`
- `dock.tsx`
- `resume.tsx`

## Notes

This archive is preserved for historical reference.
The original implementation remains in its original location until manually removed.
