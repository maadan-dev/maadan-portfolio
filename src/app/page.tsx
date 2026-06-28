import { HomePage } from '../views/HomePage';

export default function HomeRoute() {
  return (
    <>
      {/* Interlinked Schema Graph (Person, WebSite, SoftwareApplication) */}
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
                "name": "Abdulyekeen Maadan · Frontend & Go Developer",
                "alternateName": ["Maadan", "Yekeen", "maadan.dev", "www.maadan.dev"],
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
      <HomePage />
    </>
  );
}
