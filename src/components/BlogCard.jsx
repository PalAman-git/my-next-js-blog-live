"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function BlogCard({ post }) {
  const ref = useRef();

  // Staggered fade/tilt-in on mount/scroll
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 32, rotateZ: -2, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.49,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true
        }
      }
    );
  }, []);

  // Tilt/parallax on hover
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, { rotateY: x * 8, rotateX: -y * 8, scale: 1.03, duration: 0.18 });
    }
    function reset() {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.21 });
    }
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <Link
      prefetch
      href={`/${post.category}/${post.slug}`}
      tabIndex="0"
      className="block group"
    >
      <article
        ref={ref}
        className="w-full bg-surface rounded-2xl shadow-soft border border-[var(--border)] p-5 flex flex-col gap-2 transition duration-150 hover:shadow-lg-soft focus:ring-2 ring-[var(--ring)] outline-none"
        style={{ willChange: 'transform' }}
      >
        <div className="w-full aspect-[2/1] rounded-xl overflow-hidden bg-[var(--border)] relative">
          <Image
            src={post.cover || '/cover-default.jpg'}
            alt={post.title}
            fill
            sizes="400px"
            className="object-cover rounded-xl group-hover:scale-105 transition"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {post.tags &&
            post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-[var(--accent)]/15 text-[var(--accent)] mr-1"
              >
                {tag}
              </span>
            ))}
        </div>
        <h3 className="text-lg font-semibold mt-1 group-hover:text-[var(--accent)] transition">{post.title}</h3>
        <div className="text-muted text-sm">{post.summary}</div>
        <div className="text-right text-xs text-muted">{new Date(post.date).toLocaleDateString()}</div>
      </article>
    </Link>
  );
}
