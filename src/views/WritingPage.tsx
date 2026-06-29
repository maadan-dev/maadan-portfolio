"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { posts } from '../data/blog';

export function WritingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(posts.map(post => post.category)));
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory) 
    : posts;

  return (
    <>
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-text-secondary uppercase mb-6 block">
            Archive // Writing
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter uppercase leading-[0.9]">
            Thoughts on <br /> Systems & <br /> <span className="text-text-secondary">Growth.</span>
          </h1>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
              selectedCategory === null 
                ? 'border-text-primary text-background bg-text-primary' 
                : 'border-border/50 text-text-secondary hover:border-text-primary/50 hover:text-text-primary'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                selectedCategory === category 
                  ? 'border-text-primary text-background bg-text-primary' 
                  : 'border-border/50 text-text-secondary hover:border-text-primary/50 hover:text-text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group border-b border-border/50 pb-12"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent shrink-0">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-text-secondary/50 uppercase tracking-widest">
                      {post.date}
                    </span>
                    <span className="text-text-secondary/30">•</span>
                    <span className="font-mono text-[10px] text-text-secondary/50 uppercase tracking-widest">
                      {post.readTime}
                    </span>
                  </div>
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
