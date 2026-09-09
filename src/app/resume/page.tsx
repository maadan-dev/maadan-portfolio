import type { Metadata } from 'next';
import { ResumeClient } from './ResumeClient';
import { personalInfo, projects, skillCategories, education, fellowship } from '../../data/content';

export const metadata: Metadata = {
  title: 'Yekeen Maadan · Frontend & Go Developer — Resume',
  description: 'Mathematics graduate turned software developer. Fellow at the Learn2Earn AI Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
  alternates: {
    canonical: 'https://www.maadan.dev/resume',
  },
  openGraph: {
    title: 'Yekeen Maadan · Frontend & Go Developer — Resume',
    description: 'Mathematics graduate turned software developer. Fellow at the Learn2Earn AI Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
    type: 'website',
    url: 'https://www.maadan.dev/resume',
    siteName: 'Maadan Dev',
    images: [
      {
        url: '/og/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Resume preview of Yekeen Maadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yekeen Maadan · Frontend & Go Developer — Resume',
    description: 'Mathematics graduate turned software developer. Fellow at the Learn2Earn AI Engineering Fellowship. Ships Next.js, React, TypeScript, and Go applications.',
    images: ['/og/og-image.jpg?v=2'],
    site: '@maadan_dev',
    creator: '@maadan_dev',
  },
};

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://www.maadan.dev/#person",
                "name": "Yekeen Maadan",
                "jobTitle": "Software Developer",
                "url": "https://www.maadan.dev/resume",
                "email": personalInfo.email,
                "sameAs": [
                  personalInfo.linkedin,
                  personalInfo.github,
                  personalInfo.twitter
                ]
              },
              {
                "@type": "ItemList",
                "name": "Work Experience",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "Role",
                      "roleName": "Contract Frontend Developer",
                      "startDate": "2023-05",
                      "endDate": "2025-12",
                      "description": "Delivered production Next.js and React/TypeScript interfaces for paying clients across travel, non-profit, and executive persona verticals."
                    }
                  }
                ]
              },
              {
                "@type": "ItemList",
                "name": "Projects",
                "itemListElement": projects.map((project, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "item": {
                    "@type": "CreativeWork",
                    "name": project.title,
                    "description": project.problem,
                    "url": project.link,
                    "author": { "@id": "https://www.maadan.dev/#person" }
                  }
                }))
              }
            ]
          })
        }}
      />
      {/* Server-rendered content for crawlers — full resume data */}
      <div className="sr-only">
        <h1>Yekeen Maadan — Software Developer Resume</h1>
        <p>
          Software developer with a Mathematics background and 2+ years
          delivering production applications for real clients. Ships across the
          full stack — Next.js, React, TypeScript, Go — and builds AI-augmented
          products using Gemini and SSE streaming pipelines. Fellow at the
          Learn2Earn AI Engineering Fellowship (Cohort 2, selected from ~50,000 Lagos applicants).
        </p>

        <h2>Contact</h2>
        <ul>
          <li>Email: {personalInfo.email}</li>
          <li>GitHub: {personalInfo.github}</li>
          <li>LinkedIn: {personalInfo.linkedin}</li>
          <li>Twitter: {personalInfo.twitter}</li>
        </ul>

        <h2>Experience</h2>
        <h3>Contract Frontend Developer — Self-Employed (May 2023 – Dec 2025)</h3>
        <ul>
          <li>
            Delivered production Next.js and React/TypeScript interfaces for
            paying clients across travel, non-profit, and executive persona
            verticals — including ATEKER Luxury Safaris (Canada) and a diplomatic
            executive&apos;s digital platform (segunalabi.me).
          </li>
          <li>
            Built interactive UI components with Framer Motion; enforced strict
            TypeScript typing across API boundaries; developed dev-mode fallbacks
            to maintain build velocity.
          </li>
          <li>
            Managed full project cycles independently — scoping, building,
            testing, and deploying without institutional support.
          </li>
        </ul>

        <h2>Projects</h2>
        {projects.map((project) => (
          <div key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.role}</p>
            <p>{project.problem}</p>
            <p>Tech: {project.tech.join(', ')}</p>
            {project.highlights && (
              <ul>
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2>Skills</h2>
        {skillCategories.map((cat) => (
          <div key={cat.title}>
            <h3>{cat.title}</h3>
            <p>{cat.skills.join(', ')}</p>
          </div>
        ))}

        <h2>Education</h2>
        <h3>{fellowship.name} — {fellowship.cohort}</h3>
        <p>{fellowship.duration}</p>
        <p>{fellowship.description}</p>

        <h3>{education.degree} — {education.institution}</h3>
        <p>2019 – 2024</p>
        <p>{education.description}</p>

        <h2>Certifications</h2>
        <ul>
          <li>Responsive Web Design — freeCodeCamp (June 2022)</li>
          <li>NYSC Discharge Certificate — National Youth Service Corps (2025)</li>
        </ul>
      </div>
      <div data-nosnippet>
        <ResumeClient />
      </div>
    </>
  );
}
