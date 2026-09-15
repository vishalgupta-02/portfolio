# Duplicate & Superseded Implementations Inventory

This inventory catalogs all superseded, duplicated, experimental, and obsolete features identified during the audit.

| # | Previous Implementation | Current Implementation | Original Location | Archived Location | Reason / Classification |
|---|---|---|---|---|---|
| 1 | `TableOfContents` | `FloatingReadingProgress` | `src/components/blog/table-of-contents.tsx` | `duplicate/components/table-of-contents/` | **Superseded** — Replaced by dynamic floating circular progress bar with heading trackers. |
| 2 | `ArticleNavigation` | `RelatedArticles` | `src/components/blog/article-navigation.tsx` | `duplicate/components/article-navigation/` | **Superseded** — Replaced by rich contextual cards with image previews & metadata. |
| 3 | `SpotifySongExperience` & `Particles` | `CurrentlyPlaying` | `src/deferred-ideas/spotify-song-exp-deferred.tsx`, `src/components/ui/particles.tsx` | `duplicate/components/spotify-song-exp/` | **Experimental / Deferred** — Heavy particle visualizer replaced by clean mini-player bar. |
| 4 | `GithubGraph` & `KuchToHai` | `ExperienceSection` & `Projects` | `src/components/github-graph.tsx`, `src/components/kuchtohai.tsx` | `duplicate/components/github-graph/` | **Experimental / Abandoned** — API heatmap widget prototype not integrated into live routes. |
| 5 | `GlyphMatrix` & `Glyph` | Static Typography & Theme | `src/components/ui/glyph-matrix.tsx`, `src/components/blog/checking-glyph.tsx` | `duplicate/components/glyph-matrix/` | **Experimental / Abandoned** — Canvas matrix stream prototype not integrated into live pages. |
| 6 | `IconCloud` | `SkillsSection` | `src/components/ui/icon-cloud.tsx` | `duplicate/components/icon-cloud/` | **Superseded / Abandoned UI** — 3D rotating spherical cloud replaced by responsive categorized skill grid. |
| 7 | `blogPostMetadataSchema` (`validate.ts`) | `blogPostFrontmatterSchema` (`schemas.ts`) | `src/lib/blog/validate.ts` | `duplicate/lib/blog-metadata-validation/` | **Confirmed Duplicate** — Duplicate frontmatter Zod schema replaced by unified pipeline schema. |
| 8 | Legacy Portfolio (Dock, Resume, Cards) | Modern App Router Portfolio | `archive/old-portfolio/src/` | `duplicate/components/legacy-portfolio/` | **Superseded** — v0 architecture with MagicUI dock & monolithic resume replaced by modern App Router components. |

---

## Ambiguous / Retained Implementations (Not Archived)

The following items were audited and confirmed to be **active or distinctly purposeful**, thus retained without archival:

1. **`src/components/blog/reading-progress.tsx` (`BlogReadingProgress`)**:
   - Distinct top linear progress bar that tracks scroll progress for the whole viewport/post independently of the circular floating heading tracker.
2. **`src/components/share/article-share.tsx` & `src/components/share/share-bar.tsx`**:
   - Distinct sharing UI components designed for different viewports/contexts (standalone embed vs floating / bar layouts).
3. **`src/components/blog/blog-card.tsx` vs `src/components/blog/search-blog-card.tsx`**:
   - `blog-card.tsx` is the primary rich card presentation for blog grids; `search-blog-card.tsx` is specialized with highlight styling for live filter/search results.
4. **`src/components/blog/blog-header.tsx` vs `src/components/header/header.tsx`**:
   - `blog-header.tsx` renders the article title, publication dates, read time, and tags for individual blog posts, whereas `header.tsx` is the global top navigation bar.
