import { motion } from 'framer-motion';
import { education, fellowship } from '../../data/content';

const ACCENT= '#60a5fa';
const AR= '96,165,250';
const E = [0.16, 1, 0.3, 1] as const;

export function EducationSection() {
  return (
    <section style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,80px)' }}>

        {/* Section label */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col gap-3 mb-12">
          <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${AR},0.55)` }}>03 / Foundation</span>
          <div style={{ width: 24, height: 1, background: ACCENT, opacity: 0.4 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT — Education + Image */}
          <div className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E as any }}>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.01em', lineHeight: 0.95, color: 'rgba(250,250,250,0.95)', marginBottom: 24 }}>
                Engineering Built on{' '}<span style={{ color: ACCENT }}>Mathematics.</span>
              </h2>
              <p style={{ fontSize: 'clamp(0.9rem,1.1vw,1rem)', color: 'rgba(250,250,250,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
                {education.description}
              </p>
            </motion.div>

            {/* Degree card */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ padding: '16px 20px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 'clamp(1rem,1.5vw,1.2rem)', color: 'rgba(250,250,250,0.9)', marginBottom: 4 }}>{education.degree}</h3>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.55)' }}>{education.institution}</p>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.8 }} className="relative w-full aspect-[4/3] overflow-hidden" style={{ borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/70 via-transparent to-transparent z-10" />
              <img src="/images/convocation.webp" alt="Convocation" loading="lazy" decoding="async" width={800} height={600} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2" style={{ background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(12px)', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 999 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT }} />
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.7)' }}>Academic Core</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Fellowship */}
          <div className="flex flex-col gap-8 lg:pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: E as any }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, animation: 'pulse-dot 1.4s ease-in-out infinite' }} />
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>{fellowship.status}</span>
              </div>
              <style>{`@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.6rem,4vw,3rem)', letterSpacing: '-0.01em', lineHeight: 0.95, color: 'rgba(250,250,250,0.95)', marginBottom: 16 }}>
                {fellowship.name}
              </h3>
              <p style={{ fontSize: 'clamp(0.85rem,1.1vw,0.95rem)', color: 'rgba(250,250,250,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
                {fellowship.description}
              </p>
            </motion.div>

            {/* Fellowship details */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ padding: '20px 24px', border: `1px solid rgba(${AR},0.12)`, borderRadius: 8, background: `rgba(${AR},0.03)` }}>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Cohort', val: fellowship.cohort },
                  { label: 'Duration', val: fellowship.duration },
                  { label: 'Location', val: fellowship.location },
                  { label: 'Platform', val: fellowship.platform },
                  { label: 'Founded by', val: fellowship.founder },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: `rgba(${AR},0.5)`, minWidth: 80, paddingTop: 2 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: 'rgba(250,250,250,0.7)', lineHeight: 1.5 }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Selection badge */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} style={{ padding: '12px 16px', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgba(${AR},0.45)`, display: 'block', marginBottom: 4 }}>Selection</span>
              <span style={{ fontSize: 13, color: 'rgba(250,250,250,0.55)', lineHeight: 1.6 }}>{fellowship.selection}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
