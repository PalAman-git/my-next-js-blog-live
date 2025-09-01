'use client'

import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';

// Typography and code highlighting for MDX pages
const components = {
  img: (props) => (
    <Image
      {...props}
      alt={props.alt || ''}
      width={800}
      height={400}
      className="rounded-xl mx-auto my-6"
      style={{ maxHeight: 380, objectFit: 'cover' }}
    />
  ),
  // Add more overrides if desired
};

export default function Prose({ children }) {
  return (
    <div className="prose prose-invert max-w-none prose-img:rounded-xl prose-pre:bg-surface prose-a:underline text-[var(--text)]">
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}
