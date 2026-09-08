# Walkthrough: Fix Developer View Missing-Content Fallback

We resolved the issue where viewing an article in **Developer View mode** fell back to displaying the **User View content** when the developer content was missing or empty.

---

## 1. Root Cause Analysis

1. **Unconditional SSR Fallback**: In [page.tsx](file:///d:/portfolio/src/app/blog/[slug]/page.tsx), if `hasDualView && post.developerContent` evaluated to `false` (e.g. when the companion `.developer.mdx` was missing or empty, or `dualView` flag was missing), the page bypassed [ArticleContent](file:///d:/portfolio/src/components/blog/article-content.tsx) and rendered `<MDXRemote source={post.content} />` directly. When visiting a post with `?view=developer`, it incorrectly rendered the user content.
2. **Missing Developer Content UI**: When developer content was missing or empty, there was no dedicated empty-state component to inform the user that developer content was unavailable for that article.
3. **Empty/Whitespace MDX Handling**: [getDeveloperViewContent](file:///d:/portfolio/src/lib/blog/blog.ts) previously returned raw strings even if the developer MDX file was blank or whitespace-only.

---

## 2. Changes Made

### A. Dedicated Unavailable State Component
Created [DeveloperContentUnavailable](file:///d:/portfolio/src/components/blog/developer-content-unavailable.tsx):
- Theme-compatible empty-state card matching the portfolio styling (`bg-muted/30 border border-border/80`).
- Displays a `Code2` terminal icon, heading `"Developer View Unavailable"`, and clear explanation without exposing filesystem details.
- Includes an interactive `"Switch to User View"` action to return to reader mode cleanly.
- Accessible (`role="status"`, `aria-label="Developer content unavailable"`, `data-testid="developer-content-unavailable"`).

### B. Safe Content Resolution & Empty Content Detection
Updated [getDeveloperViewContent](file:///d:/portfolio/src/lib/blog/blog.ts):
- Checks file existence using `fs.existsSync`.
- Validates that Gray-Matter extracted content is not empty or whitespace-only (`!content || content.trim().length === 0`).
- Returns `null` for missing/empty files while preserving any unexpected syntax/parse errors.

### C. Mode-Aware Content Rendering
Updated [ArticleContent](file:///d:/portfolio/src/components/blog/article-content.tsx):
- Accepts `developerContent: ReactNode | null`.
- When `activeView === "user"`: Renders `userContent` in `[data-view="user"]`.
- When `activeView === "developer"`: Renders `developerContent ?? <DeveloperContentUnavailable />` in `[data-view="developer"]`.
- Never displays `userContent` when in Developer View mode.

### D. Reading Time & Page Updates
- Updated [DualViewReadingTime](file:///d:/portfolio/src/components/blog/dual-view-reading-time.tsx) to handle `developerReadingTime: ReadingTime | null` gracefully without crashes or inaccurate times.
- Updated [page.tsx](file:///d:/portfolio/src/app/blog/[slug]/page.tsx) to always wrap the article body in [ArticleContent](file:///d:/portfolio/src/components/blog/article-content.tsx).

---

## 3. Verification & Test Coverage

Created test suite in [developer-view-fallback.test.ts](file:///d:/portfolio/src/lib/blog/__tests__/developer-view-fallback.test.ts) covering all 6 required scenarios:

| Test Scenario | View Mode | User Content | Developer Content | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **Test 1** | `user` | Available | Available | User content is rendered |
| **Test 2** | `developer` | Available | Available | Developer content is rendered |
| **Test 3** | `developer` | Available | Missing (null) | `DeveloperContentUnavailable` rendered; User content **NOT** rendered |
| **Test 4** | `developer` | Available | Empty (`""`) | `DeveloperContentUnavailable` rendered; User content **NOT** rendered |
| **Test 5** | `developer` | Available | Whitespace (`"   \n\t "`) | `DeveloperContentUnavailable` rendered |
| **Test 6** | `developer` | Available | Missing | User content presence does **NOT** cause fallback |
