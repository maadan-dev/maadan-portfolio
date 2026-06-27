"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsBar } from '../components/sections/MetricsBar';
import { CaseStudies } from '../components/sections/CaseStudies';
import { MethodSection } from '../components/sections/MethodSection';
import { EducationSection } from '../components/sections/EducationSection';
import { ContactSection } from '../components/sections/ContactSection';
import Loader from '../components/ui/Loader';

export function HomePage() {
  const [showLoader, setShowLoader] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('hasLoaded');
    if (!alreadyLoaded) {
      setShowLoader(true);
    } else {
      setHeroVisible(true);
    }
    setIsMounted(true);
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    setShowLoader(false);
    setHeroVisible(true);
    window.dispatchEvent(new Event('portfolio-loaded'));
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <>
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
          <ContactSection />
        </div>
      </div>
    </>
  );
}
