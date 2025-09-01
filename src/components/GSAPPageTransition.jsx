"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

// Wrap pages for GSAP-powered transitions (fade/slide), SSR-safe.
export default function GSAPPageTransition({ children }) {
  const ref = useRef();
  const pathname = usePathname();

  useEffect(() => {
    // Animate out on route change
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.58, ease: "power3.out", clearProps: "all" }
    );
  }, [pathname]);

  // On mount, animate hero split-effect if class found
  useEffect(() => {
    if (!ref.current) return;
    const h1 = ref.current.querySelector('h1');
    if (h1) {
      const text = h1.innerText;
      h1.innerHTML = text
        .split(' ')
        .map(
          (part, i) =>
            `<span style="display:inline-block;opacity:0;transform:translateY(30px);" data-split="1">${part} </span>`
        )
        .join('');
      const splitSpans = h1.querySelectorAll('[data-split="1"]');
      gsap.to(splitSpans, {
        opacity: 1,
        y: 0,
        stagger: 0.045,
        ease: 'power2.out',
        duration: 0.5,
        delay: 0.18
      });
    }
  }, [pathname]);

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  );
}
