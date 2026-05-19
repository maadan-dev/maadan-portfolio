import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data/content';
import StatusTicker from '../ui/StatusTicker';

const ACCENT = '#3b82f6';
const BG = '#050505';
const E = [0.16, 1, 0.3, 1] as const;

/* ── Staggered letter reveal ── */
function StaggerName({ text, color, style, delay = 0, visible }: {
  text: string;
  color: string;
  style: React.CSSProperties;
  delay?: number;
  visible: boolean;
}) {
  return (
    <div style={{ overflow: 'hidden', display: 'flex' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={visible ? { y: '0%', opacity: 1 } : {}}
          transition={{
            duration: 0.7,
            ease: E as any,
            delay: (delay + i * 35) / 1000,
          }}
          style={{
            color,
            ...style,
            display: 'inline-block',
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

interface HeroSectionProps {
  visible?: boolean;
}

export function HeroSection({ visible = true }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.12, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], ['0px', '-40px']);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.97]);

  const nameStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(56px, 12vw, 200px)',
    lineHeight: 0.88,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    display: 'block',
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden w-full min-h-screen flex flex-col justify-between"
      style={{
        background: BG,
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
        paddingTop: 'clamp(16px, 3vh, 48px)',
        paddingBottom: 'clamp(24px, 4vh, 64px)',
      }}
    >
      {/* Subtle accent gradient — left side wash */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 0,
          bottom: 0,
          width: '40%',
          background: `linear-gradient(to right, rgba(59,130,246,0.04) 0%, rgba(59,130,246,0.015) 40%, transparent 100%)`,
          zIndex: 1,
        }}
      />

      {/* Subtle structural lines */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: 1 }}
      >
        {/* Horizontal structural rules */}
        {[25, 75].map((pct) => (
          <line
            key={pct}
            x1="0%" y1={`${pct}%`}
            x2="100%" y2={`${pct}%`}
            stroke="rgba(250,250,250,0.03)"
            strokeWidth="0.5"
          />
        ))}
        {/* Vertical rules — content zone edges */}
        {[8, 92].map((pct) => (
          <line
            key={pct}
            x1={`${pct}%`} y1="0%"
            x2={`${pct}%`} y2="100%"
            stroke="rgba(250,250,250,0.025)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Top HUD bar */}
      <div className="relative flex justify-between items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: E as any }}
          className="flex items-center gap-3"
        >
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'rgba(59,130,246,0.85)',
            textTransform: 'uppercase',
          }}>
            Maadan.DEV
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: E as any, delay: 0.4 }}
          className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
        >
          <div style={{ width: 16, height: 1, background: 'rgba(250,250,250,0.1)' }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 400,
            fontSize: 9,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
          }}>
            PORTFOLIO 2026
          </span>
          <div style={{ width: 16, height: 1, background: 'rgba(250,250,250,0.1)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: E as any, delay: 0.15 }}
        >
          <StatusTicker visible={visible} />
        </motion.div>
      </div>

      {/* Main name block */}
      <motion.div
        className="flex flex-col items-start mt-auto relative z-10"
        style={{ opacity, y, scale }}
      >
        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: E as any, delay: 0.2 }}
          style={{
            height: 1,
            width: 'clamp(48px, 6vw, 96px)',
            background: `linear-gradient(to right, ${ACCENT}, transparent)`,
            marginBottom: 14,
            transformOrigin: 'left',
          }}
        />

        <StaggerName
          text="ABDULYEKEEN"
          color="rgba(250,250,250,0.95)"
          style={nameStyle}
          delay={120}
          visible={visible}
        />
        <StaggerName
          text="MAADAN"
          color={ACCENT}
          style={nameStyle}
          delay={350}
          visible={visible}
        />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: E as any, delay: 1.0 }}
          className="mt-5"
        >
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
            letterSpacing: '0.12em',
            color: 'rgba(250,250,250,0.35)',
            textTransform: 'uppercase',
          }}>
            {personalInfo.headline}
          </span>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E as any, delay: 1.2 }}
          className="flex flex-wrap gap-5 mt-8"
        >
          <a
            href="#case-studies"
            data-hover
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,250,250,0.85)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s ease',
            }}
          >
            <div style={{ width: 20, height: 1, background: ACCENT }} />
            View Work
          </a>
          <a
            href={personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,250,250,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            Résumé ↗
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom HUD */}
      <motion.div
        className="relative flex justify-between items-end z-10 mt-16"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {/* Top divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, ease: E as any, delay: 0.3 }}
          className="absolute -top-10 left-0 w-full h-px origin-left"
          style={{
            background: `linear-gradient(to right, rgba(59,130,246,0.2), rgba(255,255,255,0.03), transparent)`,
          }}
        />

        <div className="flex flex-col gap-1">
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}>
            Role
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.65)',
          }}>
            {personalInfo.role}
          </span>
        </div>

        <div className="flex items-end gap-3">
          <div
            style={{
              width: 1,
              height: 32,
              background: 'rgba(250,250,250,0.06)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 1,
              flexShrink: 0,
            }}
          >
            <motion.div
              style={{
                width: '100%',
                background: ACCENT,
                position: 'absolute',
                top: 0,
                borderRadius: 1,
              }}
              animate={{ height: ['0%', '100%'] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.9,
              }}
            />
          </div>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: '0.28em',
            color: 'rgba(250,250,250,0.25)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl' as const,
            lineHeight: 1,
          }}>
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
