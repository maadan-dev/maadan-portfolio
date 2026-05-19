import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/content';
import { CaseStudyCard } from '../ui/CaseStudyCard';

const ACCENT = '#3b82f6';
const E = [0.16, 1, 0.3, 1] as const;

export function CaseStudies() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="case-studies" className="relative w-full" style={{ background: '#050505' }}>
      {/* Section Header */}
      <div
        ref={headRef}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 80px) clamp(24px, 5vw, 80px) clamp(32px, 4vh, 48px)',
        }}
      >
        {/* Animated rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: E as any }}
          style={{
            height: 1,
            width: '100%',
            transformOrigin: 'left',
            background: 'rgba(255,255,255,0.06)',
            marginBottom: 'clamp(24px, 4vh, 48px)',
          }}
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: E as any, delay: 0.1 }}
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: `rgba(59,130,246,0.5)`,
            marginBottom: 16,
          }}
        >
          01 // Selected Work
        </motion.p>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: E as any, delay: 0.18 }}
          style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(12px, 2vw, 24px)', flexWrap: 'wrap' }}
        >
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            color: 'rgba(250,250,250,0.95)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Selected
          </span>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            color: ACCENT,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Systems.
          </span>
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(59,130,246,0.4)',
          }}>
            ({projects.length})
          </span>
        </motion.div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: E as any, delay: 0.28 }}
          style={{
            marginTop: 12,
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.3)',
          }}
        >
          Things I shipped, not just built.
        </motion.p>
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {projects.map((project, index) => (
          <CaseStudyCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: `rgba(59,130,246,0.12)`, marginTop: 'clamp(32px, 4vh, 48px)' }} />
    </section>
  );
}
