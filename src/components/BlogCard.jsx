"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  useGSAP
} from '@gsap/react'
import { FolderMinus } from 'lucide-react';

export default function BlogCard({ post }) {
  
  function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`; // always dd/mm/yyyy
}


  return (
    <Link prefetch href={`/${post.category}/${post.slug}`} tabIndex="0" className="block">
      <article
        className="w-full bg-surface rounded-3xl shadow-soft border border-[var(--border)] p-6 flex flex-col gap-4
                   transform transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg-soft"
      >
        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-[var(--accent)]/20 text-[var(--accent)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-muted text-sm sm:text-base line-clamp-3">{post.summary}</p>

        {/* Date */}
        <div className="mt-auto text-right text-xs text-muted">{formatDate(post.date)}</div>
      </article>
    </Link>
  );
}
