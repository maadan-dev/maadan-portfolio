import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, skillCategories } from '../../data/content';

const ACCENT= '#60a5fa';
const AR= '96,165,250';
const E = [0.16, 1, 0.3, 1] as const;

const LINES = [
  [{ text: 'I', em: false }, { text: 'ship', em: false }],
  [{ text: 'real', em: true }, { text: 'products', em: true }],
  [{ text: 'for', em: false }, { text: 'real', em: false }],
  [{ text: 'people.', em: false }],
];

const STATS = [
  { value: '3+', label: 'Clients shipped' },
  { value: '1', label: 'AI product live' },
  { value: '∞', label: 'Problems to solve' },
];

export function MethodSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });
  let wordIdx = 0;

  return (
    <section id="method" className="relative" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, left: '50%', top: '40%', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle,rgba(${AR},0.08) 0%,transparent 65%)`, filter: 'blur(100px)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,10vh,100px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
          {/* LEFT — Profile (desktop) */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-3">
              <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${AR},0.55)` }}>02 / About</span>
              <div style={{ width: 24, height: 1, background: ACCENT, opacity: 0.4 }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, ease: E as any }} className="relative overflow-hidden rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <img src="/images/profile.webp?v=2" alt="Abdulyekeen Maadan" loading="lazy" decoding="async" width={600} height={800} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" style={{ maxHeight: 340, objectPosition: 'center top' }} />
            </motion.div>

            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(250,250,250,0.5)' }}>
              React · TypeScript · Go · AI-Augmented
            </motion.span>
          </div>

          {/* RIGHT — Word reveal + philosophy */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {/* Mobile label */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col gap-3 lg:hidden">
              <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${AR},0.55)` }}>02 / About</span>
              <div style={{ width: 24, height: 1, background: ACCENT, opacity: 0.4 }} />
            </motion.div>

            {/* Word reveal */}
            <div ref={headRef} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.8rem,7vw,6rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.92 }}>
              {LINES.map((lineWords, li) => (
                <div key={li} style={{ display: 'block', overflow: 'hidden' }}>
                  {lineWords.map((w) => {
                    const i = wordIdx++;
                    return (
                      <motion.span key={i} initial={{ y: '100%', opacity: 0 }} animate={headInView ? { y: '0%', opacity: 1 } : {}} transition={{ duration: 0.7, ease: E as any, delay: 0.15 + i * 0.08 }} style={{ display: 'inline-block', marginRight: '0.18em', color: w.em ? ACCENT : 'rgba(250,250,250,0.92)', textShadow: w.em ? `0 0 40px rgba(${AR},0.25)` : 'none' }}>
                        {w.text}
                      </motion.span>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Philosophy */}
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.2, ease: E as any }} style={{ fontWeight: 300, fontSize: 'clamp(0.9rem,1.2vw,1.05rem)', lineHeight: 1.85, color: 'rgba(250,250,250,0.55)', maxWidth: 520, paddingLeft: 16, borderLeft: `2px solid rgba(${AR},0.2)` }}>
              {personalInfo.about}
            </motion.p>

            {/* Mobile profile */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-lg lg:hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <img src="/images/profile.webp?v=2" alt="Abdulyekeen Maadan" loading="lazy" decoding="async" width={400} height={500} className="w-full h-auto object-cover grayscale" style={{ maxHeight: 280, objectPosition: 'center top' }} />
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.1 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,36px)' }}>
              {skillCategories.map((cat) => (
                <div key={cat.title} style={{ minWidth: 160 }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: `rgba(${AR},0.45)`, display: 'block', marginBottom: 8 }}>{cat.title}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {cat.skills.map((s) => (
                      <span key={s} style={{ fontSize: 13, color: 'rgba(250,250,250,0.55)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 3, height: 3, borderRadius: '50%', background: ACCENT, opacity: 0.4, flexShrink: 0 }} />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,48px)', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {STATS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} className="flex flex-col gap-1">
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.8rem)', letterSpacing: '-0.02em', color: ACCENT, lineHeight: 1 }}>{s.value}</span>
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.55)', whiteSpace: 'nowrap' }}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
