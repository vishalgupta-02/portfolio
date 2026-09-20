<div align="center">

  <h1>⚡ vishalbuild.tech</h1>
  <p><strong>Personal portfolio, engineering blogs, and production postmortems.</strong></p>

  <p>
    <a href="https://vishalbuild.tech"><strong>Explore Live Site »</strong></a>
  </p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://motion.dev"><img src="https://img.shields.io/badge/Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Motion" /></a>
  </p>

  <p>
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-featured-projects">Projects</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-connect">Connect</a>
  </p>

</div>

---

## 🧭 Overview

> _"I care more about why it broke than that it works."_

This is the source code for [vishalbuild.tech](https://vishalbuild.tech) — a minimalist, typography-focused developer portfolio and technical blog built by **Vishal Gupta**.

Designed with an engineer-first aesthetic, it goes beyond traditional project showcases by featuring **real-world production postmortems**, **interactive architecture case studies**, and a **dual-track technical blog**.

---

## ✨ Key Features

- ⚡ **Ultra-Fast & Modern Stack:** Powered by **Next.js 16 (App Router)** and **React 19** with server-side rendering and static optimization.
- 🎨 **Minimalist Design System:** Handcrafted typography, smooth dark/light mode transitions, and subtle fluid animations with **Tailwind CSS v4** and **Motion**.
- ⌨️ **Command Menu (`Cmd + K` / `Ctrl + K`):** Instant keyboard navigation across pages, actions, themes, and social profiles via `cmdk`.
- 📖 **Dual-Track Technical Blog:** MDX-driven writing featuring toggleable reading modes:
  - **Quick Track:** High-level concepts and intuition.
  - **Developer Track:** In-depth implementation details, internal mechanics, and source code.
- 🛠️ **Production Postmortems:** Transparent breakdowns of architectural mistakes, state mismatches, concurrency edge cases, and root-cause solutions.
- 📂 **Detailed Case Studies:** Rich project breakdowns featuring database schema designs, race condition mitigations, and scalability tradeoffs.
- 📊 **Dynamic GitHub Contributions Graph:** Interactive GraphQL-powered activity feed with intelligent caching.

---

## 🚀 Featured Projects

| Project                                             | Description                                                                                                   | Tech Stack                                  | Links                                                                                                |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------ | :--------------------------------------------------------------------------------------------------- |
| **[Linkforge](https://linkforge.vishalbuild.tech)** | Multi-tenant SaaS & real-time analytics with tenant-isolated database partitioning and atomic slug mutations. | Next.js, PostgreSQL, Node.js, Tailwind CSS  | [Live](https://linkforge.vishalbuild.tech) · [Code](https://github.com/vishalgupta-02/linkforge.git) |
| **[Clariv](https://clariv.vercel.app)**             | AI-powered document intelligence reader that extracts context and answers queries using LLM streaming.        | Next.js, Google GenAI, MongoDB, Shadcn UI   | [Live](https://clariv.vercel.app) · [Code](https://github.com/vishalgupta-02/Clariv.git)             |
| **[Careerly](https://careerly.vishalbuild.tech/)**  | Technical interview prep platform featuring dynamic MCQ testing engines and ATS resume scoring.               | Next.js, PostgreSQL, Prisma, AI Integration | [Live](https://careerly.vishalbuild.tech/) · [Code](https://github.com/vishalgupta-02/Careerly.git)  |

---

## 🛠️ Tech Stack

```
Core Framework    │ Next.js 16 (App Router) + React 19 + TypeScript
Styling           │ Tailwind CSS v4 + Base UI / Radix UI + Motion
Content / MDX     │ next-mdx-remote + Shiki (Syntax Highlighting) + Remark GFM
Command & UX      │ cmdk + next-themes + Lucide Icons
Package Manager   │ pnpm
Deployment        │ Vercel
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js 20+ installed
- [pnpm](https://pnpm.io/) installed (`npm install -g pnpm`)

### 1. Clone the repository

```bash
git clone https://github.com/vishalgupta-02/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment setup

Create a `.env.local` file in the root directory:

```env
# Optional: Personal GitHub token for fetching contributions graph
GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── blog/               # Engineering blog routes & dual-track viewer
│   │   ├── postmortems/        # Technical postmortem articles
│   │   ├── projects/           # Deep-dive project case study routes
│   │   ├── work/               # Work & projects listing
│   │   ├── api/github/         # Contributions graph GraphQL proxy
│   │   ├── globals.css         # Tailwind CSS v4 configuration & base styles
│   │   └── layout.tsx          # Root layout & theme providers
│   ├── components/             # Reusable UI & section components
│   │   ├── ui/                 # Atomic UI components & custom SVG icons
│   │   ├── command-k.tsx       # Cmd+K command palette
│   │   ├── github-graph.tsx    # Interactive contribution calendar
│   │   └── hero.tsx            # Hero bio & status widget
│   ├── content/                # MDX articles (Blogs & Postmortems)
│   └── lib/                    # Data sources, project definitions & utilities
└── public/                     # Static assets (images, badges, fonts)
```

---

## 📬 Connect

- **Website:** [vishalbuild.tech](https://vishalbuild.tech)
- **GitHub:** [@vishalgupta-02](https://github.com/vishalgupta-02)
- **LinkedIn:** [vishal-gupta](https://linkedin.com/in/v1shalgupt9)
- **X (Twitter):** [@v1shalworks](https://x.com/v1shalworks)
- **Email:** [abhimanyug987@gmail.com](mailto:abhimanyug987@gmail.com)

---

<div align="center">
  <sub>Designed & built with focus by Vishal Gupta. Released under the MIT License.</sub>
</div>
