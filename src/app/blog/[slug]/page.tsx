import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '../../../data/blog';
import { BlogPost } from '../../../views/BlogPost';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const url = `https://www.maadan.dev/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.subtitle,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url,
      title: `${post.title} | Yekeen Maadan`,
      description: post.subtitle,
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Yekeen Maadan'],
      section: post.category,
      images: [
        {
          url: post.ogImage || '/og/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Preview of ${post.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Yekeen Maadan`,
      description: post.subtitle,
      images: [post.ogImage || '/og/og-image.jpg'],
      site: '@maadan_dev',
      creator: '@maadan_dev',
    },
  };
}

export default async function BlogPostRoute({ params }: RouteParams) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.subtitle,
            "url": `https://www.maadan.dev/blog/${post.slug}`,
            "datePublished": new Date(post.date).toISOString(),
            ...(post.lastUpdated
              ? { "dateModified": new Date(post.lastUpdated).toISOString() }
              : {}),
            "author": {
              "@type": "Person",
              "@id": "https://www.maadan.dev/#person",
              "name": "Yekeen Maadan",
              "url": "https://www.maadan.dev"
            },
            "publisher": {
              "@type": "Person",
              "@id": "https://www.maadan.dev/#person",
              "name": "Yekeen Maadan"
            },
            "image": post.ogImage || "/og/og-image.jpg",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.maadan.dev/blog/${post.slug}`
            }
          })
        }}
      />
      <BlogPost slug={slug} />
    </>
  );
}
