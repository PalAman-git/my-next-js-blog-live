export function GET() {
  return new Response(
    `User-agent: *
Disallow:

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml
`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
