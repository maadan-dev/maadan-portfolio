# Maadan Portfolio

Personal portfolio site for Yekeen Maadan ([maadan.dev](https://maadan.dev)).

## Live

- https://maadan.dev/
- https://maadan.dev/resume

## Highlights

- **Next.js 15 (App Router)** + React 19 + TypeScript
- **Tailwind CSS v4** token-driven styling
- **Framer Motion** physics-based staggered reveals and ambient spotlight tracking
- **AI Advocate Terminal** powered by Google AI SDK (`@ai-sdk/google`, `@ai-sdk/react`)
- **Print & PDF-optimized Resume** with real-time tag highlighting and terminal emulator
- **Automated Image Optimization** pipeline (WebP conversion via Sharp)
- **Vercel Analytics + Speed Insights**

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Optimize WebP images and build production Next.js bundle
- `npm run optimize-images` - Convert raw imagery to WebP via Sharp
- `npm run lint` - Run ESLint checks
- `npm run start` - Start production server

## Project Structure

- `src/app/` - Next.js App Router routes (`/`, `/resume`, `/blog`, `/writing`, `/api`)
- `src/components/sections/` - Major landing page sections (Hero, MetricsBar, CaseStudies, Method, Education, Contact)
- `src/components/ui/` - Interactive UI primitives (DeveloperTerminal, StatusTicker, Loader)
- `src/data/` - Typed structured data (`content.ts`, `ai-prompt.ts`, `blog.ts`)
- `public/` - Static assets, generated WebP images, PDF resumes, `llms.txt`
- `.agents/skills/` - Custom agent evaluation and workflow skills

## Deployment

Deployed on Vercel.
