'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-[var(--error)] mb-4">An Error Occurred</h1>
      <p className="mb-4 text-muted">{error?.message || 'Sorry, something went wrong.'}</p>
      <button
        className="rounded-2xl bg-accent px-6 py-2 font-semibold shadow-soft hover:bg-accent-hover transition text-white"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
