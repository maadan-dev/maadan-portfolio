import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Layout } from '../components/layout/Layout';
import { Inter, Outfit, Geist_Mono, Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const barlow = Barlow({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maadan.dev'),
  title: {
    default: 'Yekeen Maadan | Software Developer — Lagos, Nigeria',
    template: '%s | Yekeen Maadan',
  },
  description: 'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
  keywords: [
    'Software Developer',
    'Frontend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Go',
    'Lagos',
    'Web Developer Nigeria',
    'AI-Augmented Development',
    'Fullstack'
  ],
  authors: [{ name: 'Yekeen Maadan' }],
  creator: 'Yekeen Maadan',
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
    title: 'Yekeen Maadan — Software Developer',
    description: 'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Portfolio preview of Yekeen Maadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@maadan_dev',
    creator: '@maadan_dev',
    title: 'Yekeen Maadan | Software Developer',
    description: 'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
    images: ['/og/og-image.jpg?v=2'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${geistMono.variable} ${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <head>

      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
