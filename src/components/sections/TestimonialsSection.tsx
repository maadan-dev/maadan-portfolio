import { motion } from 'framer-motion';
import { testimonials } from '../../data/content';

const ACCENT = '#3b82f6';
const E = [0.16, 1, 0.3, 1] as const;

export function TestimonialsSection() {
  return (
    <section style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 80px) clamp(24px, 5vw, 80px)',
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: E as any }}
          className="mb-16"
        >
          <span style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(59,130,246,0.5)',
            display: 'block',
            marginBottom: 16,
          }}>Proof of Work</span>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '-0.01em',
            lineHeight: 0.95,
            color: 'rgba(250,250,250,0.95)',
            marginBottom: 12,
          }}>
            What <span style={{ color: ACCENT }}>clients</span> say.
          </h2>

          <p style={{
            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
            color: 'rgba(250,250,250,0.35)',
            fontWeight: 300,
            maxWidth: 400,
          }}>
            Don't take my word for it.
          </p>
        </motion.div>

        {/* Quotes */}
        <div className="flex flex-col gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: E as any }}
              style={{
                position: 'relative',
                padding: 'clamp(24px, 4vw, 40px)',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* Accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 3,
                height: '100%',
                background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
                opacity: 0.4,
              }} />

              {/* Quote mark */}
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'rgba(59,130,246,0.08)',
                position: 'absolute',
                top: 8,
                right: 20,
                lineHeight: 1,
                userSelect: 'none',
              }}>"</span>

              <p style={{
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                color: 'rgba(250,250,250,0.6)',
                lineHeight: 1.85,
                fontWeight: 300,
                fontStyle: 'italic',
                marginBottom: 20,
                maxWidth: 700,
                position: 'relative',
                zIndex: 2,
              }}>
                "{testimonial.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(59,130,246,0.08)',
                  border: '1px solid rgba(59,130,246,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: ACCENT,
                }}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'rgba(250,250,250,0.85)',
                    display: 'block',
                  }}>{testimonial.author}</span>
                  <span style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,250,250,0.35)',
                  }}>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
