import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects, testimonials } from '../../data/content';
import { CaseStudyCard } from '../ui/CaseStudyCard';

const ACCENT= '#60a5fa';
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
            Work.
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
            color: 'rgba(250,250,250,0.5)',
          }}
        >
          Shipped products and client work.
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

      {/* Inline Client Feedback */}
      {testimonials.length > 0 && (
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(32px, 4vh, 48px) clamp(24px, 5vw, 80px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: E as any }}
            style={{
              position: 'relative',
              padding: 'clamp(20px, 3vw, 32px)',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 3,
              height: '100%',
              background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
              opacity: 0.4,
            }} />

            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(59,130,246,0.5)',
              display: 'block',
              marginBottom: 12,
            }}>Client Feedback</span>

            <p style={{
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              color: 'rgba(250,250,250,0.55)',
              lineHeight: 1.8,
              fontWeight: 300,
              fontStyle: 'italic',
              marginBottom: 16,
              maxWidth: 700,
            }}>
              "{testimonials[0].quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: ACCENT,
              }}>
                {testimonials[0].author.charAt(0)}
              </div>
              <div>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: 'rgba(250,250,250,0.85)',
                  display: 'block',
                }}>{testimonials[0].author}</span>
                <span style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 300,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,250,250,0.45)',
                }}>{testimonials[0].role}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bottom accent line */}
      <div style={{ height: 1, background: `rgba(59,130,246,0.12)`, marginTop: 'clamp(32px, 4vh, 48px)' }} />
    </section>
  );
}
