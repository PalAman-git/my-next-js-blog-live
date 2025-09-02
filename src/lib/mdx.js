import remarkSmartypants from 'remark-smartypants';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

// MDX compile utility for posts (SSR-safe)
export async function compileMDX(source, category, slug) {
  const { compile } = await import('@mdx-js/mdx');
  const jsx = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkSmartypants, remarkSlug, remarkAutolinkHeadings],
    rehypePlugins: [rehypePrismPlus],
  });

  const { default: React } = await import('react');

  // Return a component (not an element)
  const fn = new Function('React', `${jsx.value}; return MDXContent;`);
  const MDXContent = fn(React);

  // Wrap in a component to use in Prose
  return function MDXWrapper(props) {
    return React.createElement(MDXContent, props);
  };
}
