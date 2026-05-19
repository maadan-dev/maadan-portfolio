import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { metrics } from '../../data/content';

const ACCENT = '#3b82f6';
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
          padding: 'clamp(32px, 5vh, 56px) clamp(24px, 5vw, 80px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
          }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: E as any }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                paddingLeft: index > 0 ? 'clamp(16px, 3vw, 32px)' : 0,
                borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 400,
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(59,130,246,0.5)',
              }}>
                {metric.label}
              </span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                letterSpacing: '0.04em',
                color: 'rgba(250,250,250,0.8)',
              }}>
                {metric.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)' }} />
    </section>
  );
}
