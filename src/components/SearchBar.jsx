"use client";
import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  function handleInput(e) {
    setQuery(e.target.value);
    const params = new URLSearchParams([...searchParams.entries()]);
    params.set('query', e.target.value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="relative max-w-lg w-full mb-3">
      <input
        type="text"
        className="w-full rounded-2xl border border-[var(--border)] bg-surface px-4 py-2 pr-10 shadow-soft text-[var(--text)]"
        placeholder={placeholder}
        value={query}
        onChange={handleInput}
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
    </div>
  );
}
