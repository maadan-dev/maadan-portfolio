import type { Metadata } from 'next';
import { ResumeClient } from './ResumeClient';

export const metadata: Metadata = {
  title: 'Abdulyekeen Maadan · Frontend & Go Developer — Resume',
  description: 'Mathematics graduate turned software developer. Incoming Fellow at the Learn2Earn AI Software Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
  alternates: {
    canonical: 'https://www.maadan.dev/resume',
  },
  openGraph: {
    title: 'Abdulyekeen Maadan · Frontend & Go Developer — Resume',
    description: 'Mathematics graduate turned software developer. Incoming Fellow at the Learn2Earn AI Software Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
    type: 'website',
    url: 'https://www.maadan.dev/resume',
    siteName: 'Maadan Dev',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Resume preview of Abdulyekeen Maadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulyekeen Maadan · Frontend & Go Developer — Resume',
    description: 'Mathematics graduate turned software developer. Incoming Fellow at the Learn2Earn AI Software Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
    images: ['/og/og-image.jpg?v=2'],
    site: '@maadan_dev',
    creator: '@maadan_dev',
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
