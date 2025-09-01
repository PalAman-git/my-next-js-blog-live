"use client";
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = "theme-mode";

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  // Hydrate theme on load, avoid flicker
  useEffect(() => {
    const root = window.document.documentElement;
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (stored === 'light' || (!stored && prefersLight)) {
      root.classList.add('light');
      setTheme('light');
    } else {
      root.classList.remove('light');
      setTheme('dark');
    }
  }, []);

  function toggleTheme() {
    setTheme((cur) => {
      const next = cur === 'light' ? 'dark' : 'light';
      const root = document.documentElement;
      if (next === 'light') {
        root.classList.add('light');
      } else {
        root.classList.remove('light');
      }
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <button
      aria-label="Toggle dark mode"
      className="ml-2 p-2 rounded-full border border-[var(--border)] text-[var(--accent)] bg-surface hover:bg-accent hover:text-white transition"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
    </button>
  );
}
