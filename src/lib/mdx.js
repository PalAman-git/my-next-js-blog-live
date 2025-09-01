import remarkSmartypants from 'remark-smartypants';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

// MDX compile utility for posts (SSR-safe)
export async function compileMDX(source, category, slug) {
  // Use dynamic import to avoid evaluating client code on server
  const { compile } = await import('@mdx-js/mdx');
  const jsx = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkSmartypants, remarkSlug, remarkAutolinkHeadings],
    rehypePlugins: [rehypePrismPlus],
  });

  // Dynamic import of React needed in some edge cases
  const { default: React } = await import('react');

  // Function to render MDX as React node
  // eslint-disable-next-line no-new-func
  const fn = new Function('React', `${jsx.value}; return MDXContent;`);
  const MDXContent = fn(React);

  return React.createElement(MDXContent, {});
}
