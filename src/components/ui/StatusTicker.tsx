import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT= '#60a5fa';
const E = [0.16, 1, 0.3, 1] as const;

interface StatusTickerProps {
  visible: boolean;
}

const ITEMS = [
  'OPEN FOR FREELANCE',
  'BASED IN LAGOS',
  'SOFTWARE DEVELOPER',
  'REACT · TYPESCRIPT · GO',
];

export default function StatusTicker({ visible }: StatusTickerProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 2800);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <div className="flex items-center gap-3 overflow-hidden" style={{ height: 16 }}>
      <style>{`@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: ACCENT,
          flexShrink: 0,
          animation: 'pulse-dot 1.4s ease-in-out infinite',
        }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.25, ease: E as any }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'rgba(250,250,250,0.5)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {ITEMS[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
