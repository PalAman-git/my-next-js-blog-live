import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-[var(--accent)] mb-4">404</h1>
      <p className="mb-6 text-muted">That page couldn&apos;t be found.</p>
      <Link href="/" className="rounded-2xl bg-accent px-6 py-2 font-semibold shadow-soft hover:bg-accent-hover transition text-white">
        Go Home
      </Link>
    </div>
  );
}
