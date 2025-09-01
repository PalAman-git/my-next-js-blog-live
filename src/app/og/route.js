// Example dynamic OG image endpoint (Vercel OG API)
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Next.js 15 Blog';
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a1a',
          color: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
          letterSpacing: '-1px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="12" fill="#8E8DFA"/>
            <path d="M14 30V14H30V30H14Z" stroke="#fff" strokeWidth="2"/>
            <circle cx="22" cy="22" r="4" fill="#fff"/>
          </svg>
          <span>{title}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
