import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isTouch;
}

export default function CustomCursor() {
  const isTouch = useIsTouch();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    if (isTouch) return;
    const SELECTORS = 'a, button, [role="button"], [data-hover], input, textarea, select, label';
    const onMove  = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setIsVisible(true); };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onOver  = (e: MouseEvent) => { if ((e.target as Element).closest(SELECTORS)) setIsHovering(true); };
    const onOut   = (e: MouseEvent) => { if ((e.target as Element).closest(SELECTORS)) setIsHovering(false); };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseover',  onOver);
    window.addEventListener('mouseout',   onOut);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Glow Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: isHovering ? 38 : 26,
          height: isHovering ? 38 : 26,
          borderRadius: '50%',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          boxShadow: isHovering
            ? '0 0 14px 3px rgba(59, 130, 246, 0.2), inset 0 0 8px rgba(59, 130, 246, 0.1)'
            : '0 0 8px 2px rgba(59, 130, 246, 0.08)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.22s ease, height 0.22s ease, box-shadow 0.22s ease, opacity 0.3s ease, border-color 0.22s ease',
        }}
      />

      {/* Core Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          width: isHovering ? 7 : 4,
          height: isHovering ? 7 : 4,
          borderRadius: '50%',
          background: isHovering
            ? 'radial-gradient(circle, #fff 0%, #93bbfd 100%)'
            : '#ffffff',
          boxShadow: isHovering
            ? '0 0 6px 2px rgba(59, 130, 246, 0.45)'
            : '0 0 4px 1px rgba(255, 255, 255, 0.25)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.12s ease, height 0.12s ease, background 0.18s ease, box-shadow 0.18s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
