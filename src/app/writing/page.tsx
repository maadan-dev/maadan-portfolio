import type { Metadata } from 'next';
import { WritingPage } from '../../views/WritingPage';
import { posts } from '../../data/blog';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts on systems, engineering, and personal growth. Essays on software development, AI, and building real products.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing | Yekeen Maadan',
    description: 'Thoughts on systems, engineering, and personal growth. Essays on software development, AI, and building real products.',
    url: 'https://www.maadan.dev/writing',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Writing archive preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing | Yekeen Maadan',
    description: 'Thoughts on systems, engineering, and personal growth.',
    images: ['/og/og-image.jpg?v=2'],
    site: '@maadan_dev',
    creator: '@maadan_dev',
  },
};

export default function WritingRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Writing — Yekeen Maadan",
            "description": "Thoughts on systems, engineering, and personal growth.",
            "url": "https://www.maadan.dev/writing",
            "author": {
              "@type": "Person",
              "@id": "https://www.maadan.dev/#person",
              "name": "Yekeen Maadan"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": posts.map((post, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "description": post.subtitle,
                  "url": `https://www.maadan.dev/blog/${post.slug}`,
                  "datePublished": new Date(post.date).toISOString(),
                  ...(post.lastUpdated ? { "dateModified": new Date(post.lastUpdated).toISOString() } : {}),
                  "author": {
                    "@type": "Person",
                    "@id": "https://www.maadan.dev/#person",
                    "name": "Yekeen Maadan"
                  }
                }
              }))
            }
          })
        }}
      />
      <WritingPage />
    </>
  );
}
