// import { listPosts } from '../lib/posts';

// export async function GET() {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
//   const posts = await listPosts({ take: 300 });
//   const urls = [
//     '',
//     '/daily',
//     '/technical',
//     ...posts.map((p) => `/${p.category}/${p.slug}`)
//   ];
//   return new Response(
//     `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${urls
//         .map(
//           (u) => `<url><loc>${baseUrl}${u}</loc><changefreq>weekly</changefreq></url>`
//         )
//         .join('\n')}
//     </urlset>`,
//     {
//       headers: {
//         'Content-Type': 'application/xml'
//       }
//     }
//   );
// }







//GIVEN BY CHAT GPT

import { listPosts } from '../lib/posts';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const posts = await listPosts({ take: 300 });

  return [
    {
      url: baseUrl,
      changefreq: 'weekly',
    },
    {
      url: `${baseUrl}/daily`,
      changefreq: 'weekly',
    },
    {
      url: `${baseUrl}/technical`,
      changefreq: 'weekly',
    },
    ...posts.map((p) => ({
      url: `${baseUrl}/${p.category}/${p.slug}`,
      changefreq: 'weekly',
    })),
  ];
}
