import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { posts } from '../data/blog';

export function WritingPage() {
  return (
    <>
      <Helmet>
        <title>Writing | Abdulyekeen Maadan</title>
        <meta name="description" content="Thoughts on systems, engineering, and personal growth. Essays on software development, AI, and building real products." />
        <meta property="og:title" content="Writing | Abdulyekeen Maadan" />
        <meta property="og:description" content="Thoughts on systems, engineering, and personal growth. Essays on software development, AI, and building real products." />
        <meta property="og:image" content="https://maadan.dev/og/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Writing archive preview" />
        <meta property="og:url" content="https://www.maadan.dev/writing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Writing | Abdulyekeen Maadan" />
        <meta name="twitter:description" content="Thoughts on systems, engineering, and personal growth." />
        <meta name="twitter:image" content="https://maadan.dev/og/og-image.jpg" />
        <meta name="twitter:image:alt" content="Writing archive preview" />
      </Helmet>
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="font-mono text-sm tracking-widest text-text-secondary uppercase mb-6 block">
            Archive // Writing
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter uppercase leading-[0.9]">
            Thoughts on <br /> Systems & <br /> <span className="text-text-secondary">Growth.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group border-b border-border/50 pb-12"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent shrink-0">
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] text-text-secondary/50 uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-4 uppercase tracking-tight">
                  {post.title}
                </h2>
                
                <p className="text-text-secondary text-lg font-light leading-relaxed mb-6 max-w-2xl">
                  {post.subtitle}
                </p>
                
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-primary group-hover:gap-4 transition-all">
                  Read Article <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
