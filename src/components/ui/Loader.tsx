import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT     = '#3b82f6';
const BG         = '#050505';
const CREAM      = 'rgba(250,250,250,1)';
const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const E_SNAP: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount]   = useState(0);
  const [phase, setPhase]   = useState<'count' | 'reveal' | 'wipe' | 'done'>('count');
  const rafRef = useRef<number | null>(null);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Release scroll when wipe starts
  useEffect(() => {
    if (phase === 'wipe') document.body.style.overflow = '';
  }, [phase]);

  // Counter RAF — eased, 1600ms
  useEffect(() => {
    if (phase !== 'count') return;
    const DURATION = 1600;
    const start = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2.2) / 2;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.floor(ease(p) * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => setPhase('reveal'), 320);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // reveal → wipe
  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = setTimeout(() => setPhase('wipe'), 1050);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            pointerEvents: 'all',
            background: BG,
          }}
        >
          <AnimatePresence>
            {phase === 'count' && (
              <motion.div
                key="hud"
                exit={{ opacity: 0, y: -6, transition: { duration: 0.35, ease: E } }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.2rem 3rem',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55, ease: E }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}
                >
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: ACCENT,
                    fontWeight: 500,
                    opacity: 0.85,
                  }}>Maadan.dev</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.55rem',
                  }}>
                    <span style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 300,
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(250,250,250,0.22)',
                    }}>Loading</span>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                      color: count >= 80
                        ? `rgba(59,130,246,${0.55 + (count - 80) / 100})`
                        : 'rgba(250,250,250,0.60)',
                      transition: 'color 0.4s ease',
                    }}>
                      {String(count).padStart(3, '0')}
                    </span>
                  </div>

                  <div style={{ position: 'relative', height: 1, background: 'rgba(250,250,250,0.07)' }}>
                    <motion.div style={{
                      position: 'absolute',
                      inset: 0,
                      background: ACCENT,
                      transformOrigin: 'left',
                      scaleX: count / 100,
                    }} />
                    <motion.div style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${count}%`,
                      transform: 'translate(-50%, -50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: ACCENT,
                      boxShadow: '0 0 8px 3px rgba(59,130,246,0.50)',
                      opacity: count > 2 ? 1 : 0,
                    }} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 20,
                  pointerEvents: 'none',
                }}
              >
                <div style={{ display: 'flex', gap: '0.06em', overflow: 'hidden' }}>
                  {'INITIALIZING'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.55, ease: E, delay: i * 0.045 }}
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(2rem, 6vw, 5rem)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: CREAM,
                        userSelect: 'none',
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: E, delay: 0.42 }}
                  style={{
                    height: 1,
                    width: 'clamp(120px, 18vw, 280px)',
                    background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
                    transformOrigin: 'center',
                  }}
                />

                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: E, delay: 0.60 }}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: '0.30em',
                    textTransform: 'uppercase',
                    color: 'rgba(59,130,246,0.55)',
                  }}
                >
                  Portfolio 2026
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === 'wipe' && (
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.80, ease: E_SNAP, delay: 0.05 }}
              onAnimationComplete={() => setPhase('done')}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 5,
                background: BG,
                boxShadow: `0 2px 0 0 ${ACCENT}, 0 4px 20px 0 rgba(59,130,246,0.25)`,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
