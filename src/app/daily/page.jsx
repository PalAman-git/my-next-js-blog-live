import dynamic from 'next/dynamic';
import { listPosts } from '../../lib/posts';
import BlogCard from '../../components/BlogCard';
import TagPills from '../../components/TagPills';
import SearchBar from '../../components/SearchBar';
import GSAPPageTransition from '../../components/GSAPPageTransition';

// Dynamic tag search and fever animation on entry
export const revalidate = 60;

export default async function DailyPage({ searchParams }) {
  const { query = '', tags = '' } = searchParams || {};
  const posts = await listPosts({ category: 'daily', search: query, tag: tags, take: 100 });

  // Extract unique tags for filter pill display
  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  return (
    <GSAPPageTransition>
      <section className="container max-w-3xl py-10 px-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">Daily Insights</h1>
        <SearchBar placeholder="Search daily insights..." />
        {allTags.length > 0 && (
          <TagPills tags={allTags} category="daily" />
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
