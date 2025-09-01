"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function TagPills({ tags, category }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get('tags');
  const router = useRouter();

  function toggle(tag) {
    if (selected === tag) {
      router.replace(pathname, { scroll: false });
    } else {
      const params = new URLSearchParams([...searchParams.entries()]);
      params.set('tags', tag);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-3 py-1 rounded-full border font-medium shadow-sm text-sm cursor-pointer
            ${selected === tag
              ? 'bg-[var(--accent)] text-white'
              : 'border-[var(--border)] bg-surface text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}
          `}
          aria-pressed={selected === tag}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
