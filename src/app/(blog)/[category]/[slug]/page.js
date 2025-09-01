import { notFound } from 'next/navigation';
import { getPostBySlug,getAllSlugs } from '../../../../lib/posts';
import Prose from '../../../../components/Prose';
import TagPills from '../../../../components/TagPills';
import Image from 'next/image';
import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.category, params.slug);
  if (!post) return {};
  // OpenGraph, Twitter Card, JSON-LD, etc.
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.cover || '/cover-default.jpg' }]
    },
    twitter: {
      title: post.title,
      card: 'summary_large_image',
      description: post.summary,
      images: [post.cover || '/cover-default.jpg']
    }
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.category, params.slug);
  if (!post) return notFound();

  return (
    <article className="container max-w-3xl py-12 px-4">
      {/* JSON-LD Article schema for SEO */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            datePublished: post.date,
            image: post.cover || '/cover-default.jpg',
            author: { '@type': 'Person', name: 'Admin' }
          })
        }}
      />
      <div className="mb-8">
        <TagPills tags={post.tags || []} category={params.category} />
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-1">{post.title}</h1>
        <div className="text-muted text-sm mb-2">{new Date(post.date).toLocaleDateString()}</div>
        {post.cover &&
          <div className="w-full aspect-[2/1] relative mb-6">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              className="rounded-2xl object-cover border border-[var(--border)] shadow-lg-soft"
              sizes="100vw"
            />
          </div>
        }
      </div>
      <Prose>{post.content}</Prose>
    </article>
  );
}
