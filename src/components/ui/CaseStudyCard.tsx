import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';
import { Badge } from './Badge';
import { ArrowUpRight } from 'lucide-react';

const ACCENT= '#60a5fa';
const E = [0.16, 1, 0.3, 1] as const;

interface CaseStudyCardProps {
  project: Project;
  index: number;
}

export function CaseStudyCard({ project, index }: CaseStudyCardProps) {
  const isEven = index % 2 === 0;
  const isGif = project.image.endsWith('.gif');
  const isVideo = project.image.endsWith('.mp4') || project.image.endsWith('.webm');
  const isAnimated = isGif || isVideo;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: E as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'clamp(24px, 4vw, 48px)',
        padding: 'clamp(32px, 5vh, 56px) 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      className={`md:grid-cols-12 items-center ${project.featured ? 'md:py-16' : ''}`}
    >
      {/* Index number */}
      <motion.span
        className="hidden md:block md:col-span-1"
        animate={{ color: hovered ? ACCENT : 'rgba(59,130,246,0.3)' }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.2em',
          alignSelf: 'start',
          paddingTop: 4,
          order: isEven ? 0 : 3,
        }}
      >
        0{index + 1}
      </motion.span>

      {/* Image/Video */}
      <div className={`md:col-span-6 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.a
          href={project.link || undefined}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noopener noreferrer" : undefined}
          data-hover={!!project.link}
          className={`block relative overflow-hidden bg-[#0a0a0a] w-full ${
            isAnimated ? 'aspect-auto' : 'aspect-[16/10]'
          }`}
          style={{
            borderRadius: 4,
            border: project.featured ? `1px solid rgba(59,130,246,0.15)` : '1px solid rgba(255,255,255,0.04)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: hovered ? `0 0 40px rgba(59,130,246,0.08)` : 'none',
          }}
          whileHover="hover"
        >
          {isVideo ? (
            <video
              src={project.image}
              autoPlay muted loop playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-[#050505] relative z-10"
            />
          ) : (
            <motion.img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover object-center relative z-10 ${
                isGif ? 'object-contain bg-[#050505]' : ''
              }`}
              variants={{
                hover: { scale: isAnimated ? 1 : 1.04, transition: { duration: 0.8, ease: 'easeOut' } },
              }}
            />
          )}
          {!isAnimated && (
            <motion.div
              className="absolute inset-0 z-20"
              style={{ background: 'rgba(5,5,5,0.15)' }}
              variants={{
                hover: { backgroundColor: 'rgba(5,5,5,0)', transition: { duration: 0.4 } },
              }}
            />
          )}
        </motion.a>

        {project.featured && (
          <div className="absolute top-3 left-3 z-30">
            <Badge variant="solid">Featured Project</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`md:col-span-5 flex flex-col gap-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
            letterSpacing: '0.02em',
            color: 'rgba(250,250,250,0.95)',
            lineHeight: 1,
            marginBottom: 6,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.55)',
          }}>
            {project.role}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 14, color: 'rgba(250,250,250,0.55)', lineHeight: 1.7 }}>
            <strong style={{ color: 'rgba(250,250,250,0.8)', fontWeight: 500 }}>Problem:</strong> {project.problem}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(250,250,250,0.55)', lineHeight: 1.7 }}>
            <strong style={{ color: 'rgba(250,250,250,0.8)', fontWeight: 500 }}>Execution:</strong> {project.execution}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(250,250,250,0.55)', lineHeight: 1.7 }}>
            <strong style={{ color: 'rgba(250,250,250,0.8)', fontWeight: 500 }}>Result:</strong> {project.result}
          </p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div style={{ paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(59,130,246,0.5)',
            }}>
              Technical Highlights
            </span>
            <ul style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'start', gap: 8, fontSize: 13, color: 'rgba(250,250,250,0.55)', lineHeight: 1.6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, marginTop: 7, flexShrink: 0, opacity: 0.6 }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s ease',
              }}
            >
              View Live
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,250,0.55)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s ease',
              }}
            >
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
