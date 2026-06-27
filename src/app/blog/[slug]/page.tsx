import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
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
  if (!post) return {};

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
      title: `${post.title} | Abdulyekeen Maadan`,
      description: post.subtitle,
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Abdulyekeen Maadan'],
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
      title: `${post.title} | Abdulyekeen Maadan`,
      description: post.subtitle,
      images: [post.ogImage || '/og/og-image.jpg'],
    },
  };
}

export default async function BlogPostRoute({ params }: RouteParams) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    redirect('/writing');
  }

  return <BlogPost slug={slug} />;
}
