import { HomePage } from '../views/HomePage';

export default function HomeRoute() {
  return (
    <>
      {/* Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
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
          })
        }}
      />
      {/* WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context" : "https://schema.org",
            "@type" : "WebSite",
            "name" : "Abdulyekeen Maadan",
            "alternateName" : ["Maadan", "Yekeen"],
            "url" : "https://www.maadan.dev/"
          })
        }}
      />
      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NextRole NG",
            "url": "https://nextroleng.tech",
            "logo": "https://maadan.dev/images/nextrole.webp",
            "description": "AI-powered CV optimization tool for the Nigerian job market",
            "founder": {
              "@type": "Person",
              "name": "Abdulyekeen Maadan"
            },
            "sameAs": [
              "https://github.com/maadan-dev/nextrole-ng"
            ]
          })
        }}
      />
      <HomePage />
    </>
  );
}
