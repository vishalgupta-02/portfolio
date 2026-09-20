# Engineering Postmortems — Authoring Guide

This directory contains the markdown/MDX source files for the **Engineering Postmortems** section of the website.

## Overview

The postmortem system is 100% filesystem-driven and strongly typed. Adding a new `.mdx` file to this folder automatically:
1. Validates frontmatter schema at build time via Zod
2. Generates static routes (`/postmortems/[slug]`)
3. Discovers and lists the incident on `/postmortems` with search & filters
4. Generates Open Graph, Twitter cards, canonical tags, and Schema.org JSON-LD
5. Inserts the route into `sitemap.xml`

---

## 1. Quick Start: Adding a New Postmortem

1. Create a new file in `src/content/postmortems/<incident-slug>.mdx`
2. Add the required frontmatter:

```yaml
---
title: "Redis Cluster OOM & Cache Eviction Storm"
slug: "redis-cluster-oom-cache-eviction-storm"
description: "How an unbounded analytics buffer exhausted Redis memory, triggering cascade database fallbacks and how memory limits were re-engineered."
date: "2026-04-12"
status: "resolved"
severity: "high"
category: "infrastructure"
tags:
  - Redis
  - Caching
  - Node.js
  - Reliability
duration: "2 hours 15 minutes"
systemsAffected:
  - "Redis Cache Layer"
  - "Analytics Queue"
  - "PostgreSQL Primary"
impact: "Cache hit rates fell to 0%, resulting in 10x database load spikes."
rootCause: "Keys written without TTL during high-throughput click tracking."
resolution: "Enforced default TTL policy, configured volatile-lru eviction, and decoupled analytics buffer."
author: "Vishal Gupta"
featured: true
published: true
---
```

3. Write your postmortem content using Markdown and MDX components.
4. Run `pnpm dev` or `pnpm build`. The postmortem is published automatically!

---

## 2. Frontmatter Schema Reference

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Incident title (max 160 characters) |
| `slug` | `string` | No | URL slug (defaults to filename if omitted) |
| `description` | `string` | **Yes** | Summary of incident and solution (max 300 chars) |
| `date` | `string` (ISO date) | **Yes** | Date incident occurred (e.g. `2026-03-21`) |
| `updatedAt` | `string` (ISO date) | No | Date report was updated |
| `status` | `resolved` \| `monitoring` \| `open` | **Yes** | Current incident status (defaults to `resolved`) |
| `severity` | `low` \| `medium` \| `high` \| `critical` | **Yes** | Severity classification (defaults to `medium`) |
| `category` | `enum` | **Yes** | Domain category (see below) |
| `tags` | `string[]` | **Yes** | List of technologies, concepts, or subsystems |
| `duration` | `string` | No | Duration / Time to resolve (e.g. `3 hours 45 minutes`) |
| `systemsAffected` | `string[]` | No | List of components impacted |
| `impact` | `string` | **Yes** | Summary of user or system impact |
| `rootCause` | `string` | **Yes** | Summary of underlying root cause |
| `resolution` | `string` | **Yes** | Summary of fix and mitigations |
| `author` | `string` | No | Author name (defaults to `Vishal Gupta`) |
| `featured` | `boolean` | No | Highlight on index pages |
| `published` | `boolean` | No | Set to `false` for drafts (defaults to `true`) |

### Supported Categories:
- `authentication`
- `database`
- `infrastructure`
- `performance`
- `security`
- `deployment`
- `api`
- `observability`
- `other`

---

## 3. Supported MDX Components

All standard markdown formatting (headings, lists, blockquotes, tables, inline code, bold, italic) is supported.

In addition, the following custom components are directly available in MDX files:

### Timeline
```jsx
<Timeline>
  <TimelineEvent time="14:10 UTC" title="Issue Detected" status="detected">
    Alert fired on p99 latency spikes.
  </TimelineEvent>
  <TimelineEvent time="14:35 UTC" title="Root Cause Identified" status="identified">
    Identified unindexed query on tenant links table.
  </TimelineEvent>
  <TimelineEvent time="15:00 UTC" title="Mitigation Applied" status="resolved">
    Concurrent index created and CPU returned to baseline.
  </TimelineEvent>
</Timeline>
```
*Status values for timeline events:* `detected`, `investigating`, `identified`, `mitigated`, `resolved`.

### Callouts
```jsx
<Callout type="root-cause" title="Root Cause Mechanism">
  Explanation of the exact failure trigger...
</Callout>

<Callout type="resolution" title="Mitigation & Fix">
  Details of how the issue was resolved...
</Callout>

<Callout type="warning" title="Contributing Factor">
  Secondary factors that compounded the issue...
</Callout>

<Callout type="preventive" title="Preventive Control">
  Long-term guardrails or CI checks added...
</Callout>
```
*Callout types:* `info`, `warning`, `root-cause`, `resolution`, `preventive`, `security`.

### Code Blocks with Copy Button
Fenced code blocks with language identifiers automatically receive syntax highlighting via Shiki (supporting light and dark themes) and an interactive Copy button.

```typescript
// apps/api/src/config.ts
export const config = {
  port: 5000,
}
```
