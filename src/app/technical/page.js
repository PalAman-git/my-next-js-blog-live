import dynamic from 'next/dynamic';
import { listPosts } from '../../lib/posts';
import BlogCard from '../../components/BlogCard';
import TagPills from '../../components/TagPills';
import SearchBar from '../../components/SearchBar';
import GSAPPageTransition from '../../components/GSAPPageTransition';

export const revalidate = 60;

export default async function TechnicalPage({ searchParams }) {
  const params = await searchParams;   // wait for the whole searchParams object
  const { query = '', tags = '' } = params || {};

  const posts = await listPosts({ category: 'technical', search: query, tag: tags, take: 100 });

  // Unique tags
  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  return (
    <GSAPPageTransition>
      <section className="container flex flex-col items-center max-w-3xl py-10 px-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">Technical Posts</h1>
        <SearchBar placeholder="Search technical posts..." />
        {allTags.length > 0 && (
          <TagPills tags={allTags} category="technical" />
        )}
        <div className="grid gap-8 mt-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="text-center text-muted py-20">
              No posts found.
            </div>
          )}
        </div>
      </section>
    </GSAPPageTransition>
  );
}
