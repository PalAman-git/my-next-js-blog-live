// next.config.mjs
import createMDX from '@next/mdx';
import rehypePrism from 'rehype-prism-plus';
import remarkSmartypants from 'remark-smartypants';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

// Create MDX wrapper
const  withMDX  = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSmartypants, remarkSlug, remarkAutolinkHeadings],
    rehypePlugins: [rehypePrism],
  },
});

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  reactStrictMode: true,
};

export default withMDX(nextConfig);
