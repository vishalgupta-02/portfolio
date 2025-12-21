# Vishal Gupta's Portfolio

A modern, responsive portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. This portfolio showcases professional work, skills, experience, and provides an easy way to get in touch.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS for a sleek, responsive design
- **Dark/Light Mode**: Seamless theme switching using `next-themes`
- **Multiple Sections**:
  - 🏠 **Home/Hero**: Eye-catching landing section
  - 👤 **About**: Personal background and philosophy
  - 💼 **Experience**: Professional work history and achievements
  - 🛠️ **Skills**: Comprehensive breakdown by categories (Frontend, Backend, DevOps, etc.)
  - 📁 **Work/Projects**: Showcase of selected projects
  - 📚 **Blog**: Articles and thoughts
  - 📞 **Contact**: Email, GitHub, and LinkedIn integration
- **TypeScript**: Full type safety throughout the application
- **Accessible Components**: Built with Radix UI primitives
- **Toast Notifications**: Using Sonner for user feedback
- **Optimized Images**: Remote image support from Unsplash
- **SEO Ready**: Next.js optimizations for search engines

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.1.0
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, custom components
- **Icons**: Lucide React
- **Theming**: next-themes
- **Notifications**: Sonner
- **CSS Utilities**: clsx, tailwind-merge

### Development Tools

- **Linting**: ESLint 9
- **Build Tool**: Next.js built-in
- **Package Manager**: npm/yarn

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                          # App router and layouts
│   │   ├── (about)/                  # About page route group
│   │   ├── (blog)/                   # Blog page route group
│   │   ├── (contact)/                # Contact page route group
│   │   ├── (experience)/             # Experience page route group
│   │   ├── (skills)/                 # Skills page route group
│   │   ├── (work)/                   # Work/projects page route group
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── custom/                   # Custom portfolio components
│   │   │   ├── hero.tsx              # Hero section
│   │   │   ├── header.tsx            # Navigation header
│   │   │   ├── footer.tsx            # Footer
│   │   │   ├── project1.tsx          # Featured project
│   │   │   ├── project2.tsx          # Featured project
│   │   │   └── ...                   # Other custom components
│   │   └── ui/                       # Reusable UI components
│   │       ├── button.tsx
│   │       ├── mode-toggle.tsx       # Dark/Light mode toggle
│   │       ├── theme-provider.tsx
│   │       └── sonner.tsx            # Toast provider
│   ├── lib/
│   │   └── utils.ts                  # Utility functions
│   └── types/
│       └── types.ts                  # TypeScript type definitions
├── public/
│   └── images/                       # Static images
├── package.json
├── tsconfig.json
├── next.config.ts                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── components.json                   # Component configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/vishalgupta-02/portfolio.git
cd portfolio
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📄 Pages Overview

- **`/`** - Home page with hero section and highlights
- **`/about`** - About me, background, and philosophy
- **`/experience`** - Professional experience and career timeline
- **`/skills`** - Detailed breakdown of technical skills by category
- **`/work`** - Selected projects and case studies
- **`/blog`** - Articles and technical writings
- **`/contact`** - Contact form and social links

## 🎨 Customization

### Theming

The portfolio uses `next-themes` for dark/light mode support. Customize colors in your Tailwind CSS configuration.

### Content

Update portfolio content by modifying the component files in:

- `src/components/custom/` - Main portfolio sections
- `src/app/` - Page-specific content

### Styling

Tailwind CSS is configured for the entire project. Modify `tailwind.config.js` for theme customization.

## 📊 Performance Optimizations

- **Next.js Image Optimization**: Remote images from Unsplash are optimized
- **Static Generation**: Pages are pre-rendered for faster loading
- **Code Splitting**: Automatic code splitting by Next.js
- **CSS-in-JS**: Tailwind CSS for minimal CSS bundles

## 🔗 Connect

- **Email**: [abhimanyug987@gmail.com](mailto:abhimanyug987@gmail.com)
- **GitHub**: [https://github.com/vishalgupta-02](https://github.com/vishalgupta-02)
- **LinkedIn**: [https://www.linkedin.com/in/vishal-gupta-16018719a](https://www.linkedin.com/in/vishal-gupta-16018719a)

## 📝 License

This portfolio is open source and available under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Toast notifications with [Sonner](https://sonner.emilkowal.ski/)
