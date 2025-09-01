import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto mt-16 px-4 py-10 flex flex-col md:flex-row items-center justify-between border-t border-[var(--border)] gap-2 text-muted text-sm">
      <div>
        © {new Date().getFullYear()} Next.js 15 Blog. Built with
        <span className="mx-1 text-[var(--accent)] font-bold">Next.js</span> & <span className="font-bold">Tailwind</span>.
      </div>
      <div>
        <Link
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
        >GitHub</Link>
      </div>
    </footer>
  );
}
