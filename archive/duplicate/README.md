# Duplicate / Superseded Implementations

This directory contains reference copies of previous, duplicated, superseded, experimental, or obsolete implementations discovered during the codebase audit.

> **CRITICAL ARCHIVAL GUARANTEE:**
> - No original implementations have been deleted or moved from the active source tree.
> - The active application remains completely untouched and functionally unchanged.
> - This directory serves as a structured historical archive for manual review and subsequent cleanup.

---

## Table of Contents

- [Components](#components)
  - [Table of Contents (Article TOC)](#table-of-contents)
  - [Article Navigation (Prev / Next Buttons)](#article-navigation)
  - [Spotify Song Experience & Particle Background](#spotify-song-experience)
  - [GitHub Contribution Graph](#github-contribution-graph)
  - [Glyph Matrix Stream](#glyph-matrix)
  - [3D Icon Cloud](#3d-icon-cloud)
  - [Legacy Portfolio Architecture (v0 Dock & Resume)](#legacy-portfolio-architecture)
- [Libraries & Utilities](#libraries--utilities)
  - [Blog Post Metadata Validation Schema](#blog-post-metadata-validation)
- [Master Inventory](#master-inventory)

---

## Components

### Table of Contents
* **Status:** Superseded
* **Original Location:** `src/components/blog/table-of-contents.tsx`
* **Current Replacement:** `src/components/blog/floating-reading-progress.tsx` (`FloatingReadingProgress`)
* **Description:** Traditional stationary sidebar Table of Contents replaced by the interactive floating circular progress indicator with dynamic section tracking.
* **Archive Details:** [components/table-of-contents/README.md](./components/table-of-contents/README.md)

### Article Navigation
* **Status:** Superseded
* **Original Location:** `src/components/blog/article-navigation.tsx`
* **Current Replacement:** `src/components/blog/related-articles.tsx` (`RelatedArticles`)
* **Description:** Simple previous/next pagination footer replaced by rich contextual related article cards with cover previews and metadata.
* **Archive Details:** [components/article-navigation/README.md](./components/article-navigation/README.md)

### Spotify Song Experience
* **Status:** Experimental / Deferred
* **Original Location:** `src/deferred-ideas/spotify-song-exp-deferred.tsx`, `src/components/ui/particles.tsx`
* **Current Replacement:** `src/components/song-exp.tsx` (`CurrentlyPlaying`)
* **Description:** Heavy interactive particle canvas background with expanded telemetry cards, simplified into a lightweight mini-player bar.
* **Archive Details:** [components/spotify-song-exp/README.md](./components/spotify-song-exp/README.md)

### GitHub Contribution Graph
* **Status:** Experimental / Abandoned
* **Original Location:** `src/components/github-graph.tsx`, `src/components/kuchtohai.tsx`
* **Current Replacement:** `src/components/experience-section.tsx` & `src/components/projects.tsx`
* **Description:** External API-based GitHub contribution heatmap animation created during prototyping but unreferenced on live routes.
* **Archive Details:** [components/github-graph/README.md](./components/github-graph/README.md)

### Glyph Matrix
* **Status:** Experimental / Abandoned
* **Original Location:** `src/components/ui/glyph-matrix.tsx`, `src/components/blog/checking-glyph.tsx`
* **Current Replacement:** Minimalist typography and theme design
* **Description:** Canvas-based matrix character mutating stream prototype.
* **Archive Details:** [components/glyph-matrix/README.md](./components/glyph-matrix/README.md)

### 3D Icon Cloud
* **Status:** Superseded / Abandoned UI
* **Original Location:** `src/components/ui/icon-cloud.tsx`
* **Current Replacement:** `src/components/skills-section.tsx` (`SkillsSection`)
* **Description:** 3D spherical rotating canvas tech stack cloud replaced by responsive, accessible categorized skill grid cards with tooltips.
* **Archive Details:** [components/icon-cloud/README.md](./components/icon-cloud/README.md)

### Legacy Portfolio Architecture
* **Status:** Superseded (v0 Architecture)
* **Original Location:** `archive/old-portfolio/src/` (`components/navbar.tsx`, `components/mode-toggle.tsx`, `components/project-card.tsx`, `components/timeline.tsx`, `components/magicui/dock.tsx`, `data/resume.tsx`)
* **Current Replacement:** Modern bespoke App Router architecture (`src/components/header/site-header.tsx`, `src/components/mode-toggle.tsx`, `src/components/experience-section.tsx`, `src/data/portfolio.ts`)
* **Description:** Original portfolio template featuring MagicUI bottom magnification dock, monolithic `resume.tsx` schema, and v0 cards.
* **Archive Details:** [components/legacy-portfolio/README.md](./components/legacy-portfolio/README.md)

---

## Libraries & Utilities

### Blog Post Metadata Validation
* **Status:** Confirmed Duplicate / Superseded
* **Original Location:** `src/lib/blog/validate.ts`
* **Current Replacement:** `src/lib/blog/schemas.ts` (`blogPostFrontmatterSchema`, `BlogPostMetadata`)
* **Description:** Initial standalone Zod schema definition for blog post frontmatter, superseded by unified pipeline schema in `schemas.ts`.
* **Archive Details:** [lib/blog-metadata-validation/README.md](./lib/blog-metadata-validation/README.md)

---

## Master Inventory

For a full summary matrix, please see [INVENTORY.md](./INVENTORY.md).
