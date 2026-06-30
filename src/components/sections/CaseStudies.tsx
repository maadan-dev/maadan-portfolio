import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects, testimonials } from '../../data/content';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

const ACCENT = '#60a5fa';
const E = [0.16, 1, 0.3, 1] as const;

export function CaseStudies() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  // Split projects by featured status
  const spotlightProjects = projects.filter(p => p.featured);
  const clientProjects = projects.filter(p => !p.featured);

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

      {/* Spotlight Products Section (2-Column Grid) */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px) 64px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <h4 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-8 mt-12">
          Featured Products & Systems
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {spotlightProjects.map((project, idx) => {
            const isVideo = project.image.endsWith('.mp4') || project.image.endsWith('.webm');
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: E as any }}
                className="group relative bg-zinc-950/40 border border-zinc-900 rounded-3xl p-6 flex flex-col gap-6 transition-all duration-300 hover:border-zinc-800 hover:shadow-2xl hover:shadow-[#60a5fa]/5 hover:-translate-y-1"
              >
                {/* Visual Media Container */}
                <div className="relative overflow-hidden w-full aspect-[16/10] bg-zinc-900/50 rounded-2xl border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                  {isVideo ? (
                    <video
                      src={project.image}
                      autoPlay muted loop playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 z-20">
                    <Badge variant="solid">Spotlight</Badge>
                  </div>
                </div>

                {/* Text Details */}
                <div className="flex flex-col gap-3 flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-2xl text-zinc-100 group-hover:text-[#60a5fa] transition-colors leading-tight uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mt-1">
                        {project.role}
                      </span>
                    </div>

                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#60a5fa] transition-all shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed font-light mt-1">
                    {project.result}
                  </p>

                  {/* Highlights Bullet List */}
                  {project.highlights && (
                    <ul className="flex flex-col gap-2 mt-2 pt-4 border-t border-zinc-900">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex gap-2 text-xs text-zinc-500 leading-normal">
                          <span className="text-[#60a5fa] shrink-0 select-none font-bold">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Chips & GitHub */}
                <div className="flex justify-between items-center gap-4 mt-auto pt-4 border-t border-zinc-900">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map(tech => (
                      <span key={tech} className="font-mono text-[9px] px-2.5 py-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full text-zinc-450">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="font-mono text-[9px] px-2.5 py-1 bg-transparent text-zinc-600">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-[#60a5fa] transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Client Projects Section (3-Column Grid) */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px) 48px',
        }}
      >
        <h4 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-8 mt-12 pt-12 border-t border-zinc-900">
          Client Contracts & Web Projects
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: E as any }}
              className="group relative bg-zinc-950/10 border border-zinc-900/60 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-950/40"
            >
              {/* Media preview - simplified */}
              <div className="relative overflow-hidden w-full aspect-[16/9] bg-zinc-900/30 rounded-xl border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-display font-semibold text-lg text-zinc-200 group-hover:text-[#60a5fa] transition-colors leading-tight uppercase">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                  {project.role}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1">
                  {project.result}
                </p>
              </div>

              {/* Footer Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900/60 mt-auto">
                {project.tech.map(tech => (
                  <span key={tech} className="font-mono text-[8.5px] px-2 py-0.5 bg-zinc-900/40 border border-zinc-800/60 rounded-md text-zinc-500">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
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
              borderRadius: 16,
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.03)',
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
