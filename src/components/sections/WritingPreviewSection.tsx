import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { posts } from '../../data/blog';

const ACCENT = '#60a5fa';
const AR = '96,165,250';
const E = [0.16, 1, 0.3, 1] as const;

export function WritingPreviewSection() {
  return (
    <section style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px, 8vh, 80px) clamp(24px, 5vw, 80px)' }}>
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-3 mb-6"
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: `rgba(${AR}, 0.55)`
              }}>
                04 / Thought Leadership
              </span>
              <div style={{ width: 24, height: 1, background: ACCENT, opacity: 0.4 }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: E as any }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                letterSpacing: '-0.01em',
                lineHeight: 0.95,
                color: 'rgba(250, 250, 250, 0.95)',
              }}
            >
              Systems Thinking & <span style={{ color: ACCENT }}>Writing.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-6 lg:pt-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: E as any }}
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                color: 'rgba(250, 250, 250, 0.55)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 480
              }}
            >
              Technical writing is the highest-trust signal for async remote work. It proves how I isolate problems, reason through complex systems, and communicate clearly.
            </motion.p>
          </div>
        </div>

        {/* Articles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="max-w-4xl">
          {posts.slice(0, 2).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: E as any }}
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                padding: '32px 0',
              }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block text-decoration-none">
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: ACCENT
                  }}>
                    {post.category}
                  </span>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)' }} />
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 400,
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(250, 250, 250, 0.35)'
                  }}>
                    {post.date}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: 'rgba(250, 250, 250, 0.9)',
                  letterSpacing: '0.01em',
                  lineHeight: 1.1,
                  marginBottom: 8,
                  transition: 'color 0.3s ease'
                }} className="group-hover:text-[#60a5fa]">
                  {post.title}
                </h3>

                <p style={{
                  fontSize: 14,
                  color: 'rgba(250, 250, 250, 0.55)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                  marginBottom: 16,
                  maxWidth: 700
                }}>
                  {post.subtitle}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(250, 250, 250, 0.8)',
                  transition: 'gap 0.2s ease'
                }} className="group-hover:gap-8">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: E as any }}
          style={{ marginTop: 40 }}
        >
          <Link
            href="/writing"
            data-hover
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250, 250, 250, 0.8)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s ease',
            }}
          >
            <div style={{ width: 20, height: 1, background: ACCENT }} />
            View All Writing
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
