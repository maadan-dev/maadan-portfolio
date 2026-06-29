"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { posts } from '../data/blog';
import { HallucinationPost } from '../components/blog/posts/HallucinationPost';
import { MotivationPost } from '../components/blog/posts/MotivationPost';
import { DavidorlahPost } from '../components/blog/posts/DavidorlahPost';
import { TableOfContents } from '../components/blog/TableOfContents';
import { PostInteractions } from '../components/blog/PostInteractions';

const postContent: Record<string, React.ComponentType> = {
  'hallucination-architecture': HallucinationPost,
  'motivation-is-a-bug': MotivationPost,
  'client-side-pdf-generator': DavidorlahPost,
};

export function BlogPost({ slug: propSlug }: { slug?: string }) {
  const params = useParams();
  const slug = propSlug || params.slug as string;
  const contentRef = useRef<HTMLDivElement>(null!);
  const post = posts.find((p) => p.slug === slug);
  const ContentComponent = slug ? postContent[slug] : null;

  if (!post || !ContentComponent) {
    return null;
  }

  return (
    <div>
      <article className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Writing
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            {post.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
            {post.subtitle}
          </p>
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border/50">
            <div>
              <p className="text-sm text-text-primary font-medium">Abdulyekeen Maadan</p>
              <p className="text-xs text-text-secondary font-mono">
                {post.date} {post.lastUpdated && `· Updated ${post.lastUpdated}`} · {post.readTime}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Table of Contents */}
        <TableOfContents contentRef={contentRef} />

        {/* Article Body */}
        <motion.div
          ref={contentRef}
          className="prose-custom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContentComponent />
        </motion.div>

        {/* Post Interactions (Views, Claps, Shares) */}
        <PostInteractions slug={slug} title={post.title} />

        {/* CTA */}
        <motion.div
          className="mt-16 p-6 md:p-8 rounded-lg bg-surface border border-border/50 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-text-secondary mb-4 italic">
            "The room you’re in is already deciding how far you go."
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest bg-text-primary text-background px-6 py-3 rounded-full hover:opacity-90 transition-all no-underline"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </article>
    </div>
  );
}
