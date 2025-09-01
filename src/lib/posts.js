import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from './mdx';

// List all .mdx files in content
export async function listPosts({ category, search, tag, take = 100, featured } = {}) {
  const categories = category ? [category] : ['daily', 'technical'];
  let posts = [];

  for (const cat of categories) {
    const dir = path.join(process.cwd(),'src','content', cat);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      if (data.draft) continue;
      const slug = file.replace(/\.mdx$/, '');
      posts.push({
        ...data,
        slug,
        category: cat,
        featured: !!data.featured,
        excerpt: data.summary,
      });
    }
  }

  // Filters
  if (featured) posts = posts.filter((p) => p.featured);
  if (tag) posts = posts.filter((p) => (p.tags || []).includes(tag));
  if (search)
    posts = posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase())
    );
  posts = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, take);

  return posts;
}

// Get all slugs for static generation
export async function getAllSlugs() {
  return [
    ...(await listPosts({ category: 'daily', take: 100 })).map((p) => ({
      category: 'daily',
      slug: p.slug,
    })),
    ...(await listPosts({ category: 'technical', take: 100 })).map((p) => ({
      category: 'technical',
      slug: p.slug,
    })),
  ];
}

// Get post content and frontmatter
export async function getPostBySlug(category, slug) {
  const filePath = path.join(process.cwd(), 'content', category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const src = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(src);
  if (data.draft) return null;
  const compiled = await compileMDX(content, category, slug);
  return {
    ...data,
    content: compiled,
    slug,
    category,
  };
}
