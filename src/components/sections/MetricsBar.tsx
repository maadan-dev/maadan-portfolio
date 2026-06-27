import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ACCENT= '#60a5fa';
const E = [0.16, 1, 0.3, 1] as const;

export function MetricsBar() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return (
    <section ref={ref} className="relative" style={{ background: '#050505' }}>
      {/* Top animated line */}
      <div style={{ position: 'relative', height: 1, background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right, ${ACCENT}, rgba(59,130,246,0.1))`,
            transformOrigin: 'left',
            width: lineWidth,
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(32px, 5vh, 48px) clamp(24px, 5vw, 80px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: E as any }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
            color: 'rgba(250,250,250,0.7)',
            textTransform: 'uppercase',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Selected from <span style={{ color: ACCENT, fontWeight: 600 }}>~4,000 applicants</span> for a rigorous 2-year Software Engineering Fellowship — training in systems engineering while active for part-time remote roles and select contracts.
        </motion.p>
      </div>

      {/* Bottom line */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)' }} />
    </section>
  );
}
