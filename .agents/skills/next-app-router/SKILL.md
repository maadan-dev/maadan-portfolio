---
name: next-app-router
description: Scaffolds and edits pages, routes, components, and metadata for maadan.dev — a Next.js App Router project using Tailwind CSS v4, TypeScript, and a src/ directory layout. Activate when creating new pages, routes, components, or metadata for the portfolio site.
license: MIT
compatibility:
  product: maadan-portfolio
  runtime: independent-browsing-agent
---

# Skill: Next.js App Router — maadan.dev Conventions

## Project Structure

- Source root is `src/` — all imports use the `@/*` alias mapped to `./src/*`
- App directory: `src/app/`
- Components: `src/components/` — subfolders: `/blog`, `/layout`, `/resume`, `/sections`, `/ui`
- Views (full page compositions): `src/views/` — pages import view components from here
- Existing routes: `/`, `/blog`, `/blog/[slug]`, `/resume`, `/writing`, `/api`

## Page Component Pattern

Pages are thin route files. They import the actual view from `src/views/`:

```tsx
import { PageNameView } from '../views/PageNameView';

export default function PageRoute() {
  return (
    <>
      {/* SEO-visible server-rendered content for crawlers */}
      <div className="sr-only">
        <h1>Page heading matching meta description intent</h1>
        <p>Supporting copy.</p>
      </div>
      <div data-nosnippet>
        <PageNameView />
      </div>
    </>
  );
}
```

Never put markup or logic directly in the route file. Keep it a thin wrapper.

## Metadata Conventions

### Static metadata (standard pages):
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title · Yekeen Maadan',
  description: 'Page description.',
  alternates: {
    canonical: 'https://www.maadan.dev/page-slug',
  },
  openGraph: {
    title: 'Page Title · Yekeen Maadan',
    description: 'Page description.',
    type: 'website',
    url: 'https://www.maadan.dev/page-slug',
    siteName: 'Maadan Dev',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Description of image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title · Yekeen Maadan',
    description: 'Page description.',
    images: ['/og/og-image.jpg?v=2'],
    site: '@maadan_dev',
    creator: '@maadan_dev',
  },
};
```

### Dynamic metadata (e.g. blog posts):
```tsx
export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  // resolve data, then return same shape as static metadata above
  // always include alternates.canonical
}
```

## Tailwind CSS

- Tailwind v4 — no `tailwind.config.ts`. All tokens defined in `src/index.css` via `@theme {}`.
- Never create a `tailwind.config` file for this project.
- Use token-based class names: `bg-background`, `text-text-primary`, `text-text-secondary`, `bg-surface`, `border-border`, `text-accent`, `bg-accent`.
- Font utilities: `font-sans`, `font-display`, `font-mono`, `font-bebas`, `font-barlow`, `font-barlow-condensed`.
- Utility class available: `glass-panel` (frosted glass surface).
- Animations available: `animate-fade-in`, `animate-slide-up`.

## Rules

- Always use `@/*` imports, never relative paths that climb more than one level.
- Always set `alternates.canonical` on every metadata export.
- Always include both `openGraph` and `twitter` blocks in metadata.
- Default OG image: `/og/og-image.jpg?v=2`.
- `metadataBase` is already set in root layout — do not re-declare it in child pages.
- Never install a separate Tailwind config — use CSS tokens only.
- New routes go inside `src/app/`. New views go in `src/views/`. New shared UI in `src/components/ui/`.