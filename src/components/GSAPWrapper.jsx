'use client';

import dynamic from 'next/dynamic';

// Dynamically load GSAP transitions only on client
const GSAPPageTransition = dynamic(() => import('./GSAPPageTransition'), {
  ssr: false,
});

export default function GSAPWrapper({ children }) {
  return <GSAPPageTransition>{children}</GSAPPageTransition>;
}
