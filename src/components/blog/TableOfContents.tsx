"use client";

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('h2, h3, h4');
    const headingData: TOCItem[] = Array.from(elements).map((element) => {
      const level = parseInt(element.tagName.charAt(1));
      const text = element.textContent || '';
      const id = element.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      // Add id to element if it doesn't have one
      if (!element.id) {
        element.id = id;
      }

      return { id, text, level };
    });

    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [contentRef]);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-8 p-6 rounded-lg bg-surface border border-border/50">
      <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm hover:text-accent transition-colors ${
                activeId === heading.id
                  ? 'text-accent font-medium'
                  : 'text-text-secondary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}