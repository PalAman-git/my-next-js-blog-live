import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import { listPosts } from '../lib/posts';
import GSAPWrapper from '../components/GSAPWrapper'; // ✅ use wrapper

export const revalidate = 60;

export default async function Home() {
  const posts = await listPosts({ take: 4, featured: true });

  return (
    <GSAPWrapper>
      <section className="container max-w-3xl py-16 px-4 flex flex-col items-center text-center gap-8">
        <Image src="/logo.svg" alt="Logo" width={56} height={56} priority className="mb-2" />

        {/* Hero Split Text */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
          <span className="inline-block">
            Next.js <span className="text-[var(--accent)]">15</span> Blog Boilerplate
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-lg text-muted">
          Production-ready, animated, and developer-friendly.<br />
          MDX, GSAP, Tailwind 4.1, light/dark, and more.
        </p>

        <div className="flex gap-4 justify-center">
          <Link prefetch href="/daily">
            <button className="rounded-2xl bg-surface shadow-soft px-6 py-3 text-[var(--accent)] font-bold transition hover:scale-[1.05] border border-[var(--border)]">
              Daily Insights
            </button>
          </Link>
          <Link prefetch href="/technical">
            <button className="rounded-2xl bg-surface shadow-soft px-6 py-3 text-[var(--accent)] font-bold transition hover:scale-[1.05] border border-[var(--border)]">
              Technical Posts
            </button>
          </Link>
        </div>

        {/* Featured Posts */}
        <div className="mt-12 w-full flex flex-col gap-6">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">Featured</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </GSAPWrapper>
  );
}
