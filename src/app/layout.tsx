import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from '../components/layout/Layout';
import { DeveloperTerminal } from '../components/ui/DeveloperTerminal';

// Import global fonts
import '@fontsource/bebas-neue/400.css';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/900.css';
import '@fontsource/barlow/300.css';
import '@fontsource/barlow/400.css';
import '../index.css';

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maadan.dev'),
  title: {
    default: 'Abdulyekeen Maadan | Software Developer — Lagos, Nigeria',
    template: '%s | Abdulyekeen Maadan',
  },
  description: 'Software developer based in Lagos. I build production software for real clients using React, TypeScript, and Go. Open for freelance and part-time remote work.',
  keywords: [
    'Software Developer',
    'Frontend Developer',
    'React',
    'TypeScript',
    'Go',
    'Lagos',
    'Web Developer Nigeria',
    'AI-Augmented Development',
    'Fullstack'
  ],
  authors: [{ name: 'Abdulyekeen Maadan' }],
  creator: 'Abdulyekeen Maadan',
  robots: 'index, follow',
  alternates: {
    canonical: './',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png?v=2',
  },
  manifest: '/site.webmanifest?v=2',
  other: {
    'google-site-verification': 'gkl5-tw89O_eHr9XuuQyXnBPHSHMWSYqHFRBzs7g0mg',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.maadan.dev/',
    siteName: 'Maadan Dev',
    title: 'Abdulyekeen Maadan — Software Developer',
    description: 'Software developer based in Lagos. I build production software for real clients using React, TypeScript, and Go. Open for freelance and part-time remote work.',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Portfolio preview of Abdulyekeen Maadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@maadan_dev',
    creator: '@maadan_dev',
    title: 'Abdulyekeen Maadan | Software Developer',
    description: 'Software developer based in Lagos. I build production software for real clients using React, TypeScript, and Go. Open for freelance and part-time remote work.',
    images: ['/og/og-image.jpg?v=2'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.maadan.dev/#website",
                "url": "https://www.maadan.dev/",
                "name": "Maadan Dev",
                "alternateName": ["Abdulyekeen Maadan", "Maadan", "Yekeen", "maadan.dev", "www.maadan.dev"],
                "publisher": {
                  "@id": "https://www.maadan.dev/#person"
                }
              },
              {
                "@type": "Person",
                "@id": "https://www.maadan.dev/#person",
                "name": "Abdulyekeen Maadan",
                "jobTitle": "Software Developer",
                "url": "https://www.maadan.dev/",
                "image": "https://maadan.dev/images/profile.webp?v=2",
                "sameAs": [
                  "https://www.linkedin.com/in/abdulyekeenmaadan",
                  "https://github.com/maadan-dev",
                  "https://x.com/maadan_dev"
                ],
                "alumniOf": {
                  "@type": "CollegeOrUniversity",
                  "name": "Federal University of Agriculture, Abeokuta"
                },
                "knowsAbout": [
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                  "Go",
                  "Supabase",
                  "Gemini AI",
                  "Frontend Development",
                  "AI-Augmented Development"
                ]
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://nextroleng.tech/#app",
                "name": "NextRole NG",
                "url": "https://nextroleng.tech",
                "image": "https://www.maadan.dev/images/nextrole.webp",
                "description": "AI-powered CV optimization tool for the Nigerian job market",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "NGN",
                  "availability": "https://schema.org/Discontinued"
                },
                "author": {
                  "@id": "https://www.maadan.dev/#person"
                },
                "sameAs": [
                  "https://github.com/maadan-dev/nextrole-ng-frontend"
                ]
              }
            ]
          })
        }}
      />
      <body>
        <Layout>
          {children}
        </Layout>
        <DeveloperTerminal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
