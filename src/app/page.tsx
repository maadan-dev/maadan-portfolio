import type { Metadata } from 'next';
import { ClientHomeWrapper } from '../views/ClientHomeWrapper';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsBar } from '../components/sections/MetricsBar';
import { CaseStudies } from '../components/sections/CaseStudies';
import { MethodSection } from '../components/sections/MethodSection';
import { EducationSection } from '../components/sections/EducationSection';
import { WritingPreviewSection } from '../components/sections/WritingPreviewSection';
import { ContactSection } from '../components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Yekeen Maadan | Software Developer — Lagos, Nigeria',
  description:
    'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
  alternates: {
    canonical: 'https://www.maadan.dev/',
  },
  openGraph: {
    title: 'Yekeen Maadan — Software Developer',
    description:
      'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
    type: 'website',
    url: 'https://www.maadan.dev/',
    siteName: 'Maadan Dev',
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
    title: 'Yekeen Maadan | Software Developer',
    description:
      'Software developer based in Lagos. I build production software for real clients using Next.js, React, TypeScript, and Go. Open for freelance and part-time remote work.',
    images: ['/og/og-image.jpg?v=2'],
    site: '@maadan_dev',
    creator: '@maadan_dev',
  },
};

export default function HomeRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.maadan.dev/#website",
                "url": "https://www.maadan.dev",
                "name": "Maadan Dev",
                "alternateName": ["Abdulyekeen Maadan", "Yaqeen Maadan", "Maadan", "Yekeen Maadan", "Yekeen"],
                "publisher": {
                  "@id": "https://www.maadan.dev/#person"
                }
              },
              {
                "@type": "Person",
                "@id": "https://www.maadan.dev/#person",
                "name": "Yekeen Maadan",
                "description": "Full-stack developer based in Lagos, Nigeria. Builds production AI tools and web applications using Next.js, React, TypeScript, and Go. Open for remote freelance and part-time engagements.",
                "jobTitle": "Software Developer",
                "url": "https://www.maadan.dev",
                "image": "https://maadan.dev/images/profile.webp?v=2",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lagos",
                  "addressCountry": "NG"
                },
                "alternateName": ["Maadan Dev", "Maadan", "Yekeen", "Abdulyekeen Maadan", "Yaqeen Maadan"],
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
                  "Next.js",
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Python",
                  "Tailwind CSS",
                  "Go",
                  "Supabase",
                  "Gemini AI",
                  "Frontend Development",
                  "AI-Augmented Development"
                ]
              }
            ]
          })
        }}
      />
      {/* Server-rendered content for crawlers — matches meta description */}
      <div className="sr-only">
        <h1>Yekeen Maadan — Software Developer, Lagos, Nigeria</h1>
        <p>
          Software developer based in Lagos. I build production software for real
          clients using Next.js, React, TypeScript, and Go. Open for freelance and
          part-time remote work.
        </p>
      </div>
      <div data-nosnippet>
        <ClientHomeWrapper 
          contentSections={
            <>
              <MetricsBar />
              <CaseStudies />
              <MethodSection />
              <EducationSection />
              <WritingPreviewSection />
              <ContactSection />
            </>
          }
        />
      </div>
    </>
  );
}
