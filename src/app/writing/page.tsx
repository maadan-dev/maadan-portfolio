import type { Metadata } from 'next';
import { WritingPage } from '../../views/WritingPage';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts on systems, engineering, and personal growth. Essays on software development, AI, and building real products.',
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing | Abdulyekeen Maadan',
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
    title: 'Writing | Abdulyekeen Maadan',
    description: 'Thoughts on systems, engineering, and personal growth.',
    images: ['/og/og-image.jpg?v=2'],
  },
};

export default function WritingRoute() {
  return <WritingPage />;
}
