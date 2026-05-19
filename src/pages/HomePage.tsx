import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsBar } from '../components/sections/MetricsBar';
import { CaseStudies } from '../components/sections/CaseStudies';
import { MethodSection } from '../components/sections/MethodSection';
import { EducationSection } from '../components/sections/EducationSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ContactSection } from '../components/sections/ContactSection';
import Loader from '../components/ui/Loader';

export function HomePage() {
  const alreadyLoaded = sessionStorage.getItem('hasLoaded');
  const [showLoader, setShowLoader] = useState(() => !alreadyLoaded);
  const [heroVisible, setHeroVisible] = useState(() => !!alreadyLoaded);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    setShowLoader(false);
    setHeroVisible(true);
  };

  return (
    <>
      <Helmet>
        <title>Abdulyekeen Maadan | Software Developer — Lagos, Nigeria</title>
        <meta name="description" content="Software developer based in Lagos. I build real products for real clients using React, TypeScript, Go, and AI-augmented workflows. Currently shipping NextRole NG — a full-stack CV optimization tool for the Nigerian job market." />
        <meta property="og:site_name" content="Abdulyekeen Maadan" />
        <meta property="og:title" content="Abdulyekeen Maadan — Software Developer" />
        <meta property="og:description" content="Software developer based in Lagos. Building real products with React, TypeScript, Go, and AI-augmented workflows." />
        <meta property="og:image" content="https://maadan.dev/og/og-image.jpg?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Portfolio preview of Abdulyekeen Maadan" />
        <meta property="og:url" content="https://www.maadan.dev/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@maadan_dev" />
        <meta name="twitter:creator" content="@maadan_dev" />
        <meta name="twitter:title" content="Abdulyekeen Maadan | Software Developer" />
        <meta name="twitter:description" content="Software developer based in Lagos. Building real products with React, TypeScript, Go, and AI-augmented workflows." />
        <meta name="twitter:image" content="https://maadan.dev/og/og-image.jpg?v=2" />
        <meta name="twitter:image:alt" content="Portfolio preview of Abdulyekeen Maadan" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Abdulyekeen Maadan",
            "jobTitle": "Software Developer",
            "url": "https://www.maadan.dev",
            "image": "https://maadan.dev/images/profile.webp?v=2",
            "sameAs": [
              "https://www.linkedin.com/in/abdulyekeenmaadan",
              "https://github.com/maadan-dev"
            ],
            "knowsAbout": [
              "React", "TypeScript", "Go",
              "AI-Augmented Development",
              "Fullstack Development",
              "Software Architecture"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Software Developer",
              "occupationLocation": {
                "@type": "City",
                "name": "Lagos",
                "addressCountry": "NG"
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
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
            ],
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "NGN"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context" : "https://schema.org",
            "@type" : "WebSite",
            "name" : "Abdulyekeen Maadan",
            "alternateName" : ["Maadan", "Yekeen"],
            "url" : "https://www.maadan.dev/"
          })}
        </script>
      </Helmet>

      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <div className="relative w-full">
        {/* Hero: fixed position, scales/fades on scroll */}
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'auto',
            transformOrigin: 'center top',
          }}
        >
          <HeroSection visible={heroVisible} />
        </motion.div>

        {/* Spacer — hero scrolls under this */}
        <div style={{ height: '100vh', pointerEvents: 'none' }} />

        {/* Content slides over hero */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#050505',
            boxShadow: '0 -60px 120px 40px #050505',
          }}
        >
          <MetricsBar />
          <CaseStudies />
          <MethodSection />
          <EducationSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
}
