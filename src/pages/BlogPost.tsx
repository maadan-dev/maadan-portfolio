import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { posts } from '../data/blog';
import { HallucinationPost } from '../components/blog/posts/HallucinationPost';
import { MotivationPost } from '../components/blog/posts/MotivationPost';
import { TableOfContents } from '../components/blog/TableOfContents';

const postContent: Record<string, React.ComponentType> = {
  'hallucination-architecture': HallucinationPost,
  'motivation-is-a-bug': MotivationPost,
};

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null!);
  const post = posts.find((p) => p.slug === slug);
  const ContentComponent = slug ? postContent[slug] : null;

  if (!post || !ContentComponent) {
    return <Navigate to="/writing" replace />;
  }

  return (
    <div>
      <Helmet>
        <title>{post.title} | Abdulyekeen Maadan</title>
        <meta name="description" content={post.subtitle} />
        <meta property="og:title" content={`${post.title} | Abdulyekeen Maadan`} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:image" content={`https://www.maadan.dev${post.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`Preview of ${post.title}`} />
        <meta property="og:url" content={`https://www.maadan.dev/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content="Abdulyekeen Maadan" />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Abdulyekeen Maadan`} />
        <meta name="twitter:description" content={post.subtitle} />
        <meta name="twitter:image" content={`https://www.maadan.dev${post.ogImage}`} />
        <meta name="twitter:image:alt" content={`Preview of ${post.title}`} />
      </Helmet>
      <article className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/writing"
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
              <p className="text-xs text-text-secondary font-mono">{post.date} · {post.readTime}</p>
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
            to="/#contact"
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
