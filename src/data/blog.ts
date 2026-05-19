export interface PostMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  category: string;
  ogImage?: string;
}

export const posts: PostMeta[] = [
  {
    slug: "hallucination-architecture",
    title: "How I Stopped My CV Tool From Lying to Users",
    subtitle: "The hallucination problem in AI CV tools isn't a prompt problem. It's an architecture problem.",
    date: "April 20, 2026",
    lastUpdated: "May 19, 2026",
    readTime: "6 min read",
    category: "Engineering Deep Dive",
    ogImage: "/og/blog/hallucination-architecture.jpg"
  },
  {
    slug: "motivation-is-a-bug",
    title: "Motivation Is a Bug. Peer Pressure Is the Fix.",
    subtitle: "Why you don't build serious systems on top of something as unstable as 'feeling like it'.",
    date: "April 27, 2026",
    readTime: "4 min read",
    category: "Philosophy",
    ogImage: "/og/blog/motivation-is-a-bug.jpg"
  }
];
