// Server-renders /blog with real post titles/excerpts in the initial HTML. The client SPA mounts fresh over
// this the moment JS loads (no hydration attempted), so this only has to carry real content for crawlers and
// the first paint.
import { fetchPosts, formatDate, getShell, page, breadcrumbSchema, stripUnsafe } from './_ssr';

const SITE = 'https://www.pizzascript.com';

export default async function handler(req: any, res: any) {
  try {
  const [posts, shell] = await Promise.all([fetchPosts(), getShell(req.headers.host)]);

  const cards = posts
    .map((p) => {
      const href = `${SITE}/blog/${p.slug}`;
      const img = p.cover_image_url ? `<img src="${stripUnsafe(p.cover_image_url)}" alt="${stripUnsafe(p.cover_image_alt ?? p.title)}" loading="lazy" />` : '';
      return `<article>
<a href="/blog/${p.slug}">
${img}
<h2>${stripUnsafe(p.title)}</h2>
</a>
<p>${stripUnsafe(p.excerpt)}</p>
<p>${p.category ? `${stripUnsafe(p.category)} · ` : ''}${formatDate(p.published_at)}${p.reading_minutes ? ` · ${p.reading_minutes} min read` : ''}</p>
</article>`;
    })
    .join('\n');

  const html = page({
    title: 'Blog',
    description: 'Insights on web development, SEO, and growing a software business, from the PizzaScript team.',
    canonical: `${SITE}/blog`,
    schema: [breadcrumbSchema([{ name: 'Home', url: SITE }, { name: 'Blog', url: `${SITE}/blog` }])],
    bodyHtml: `<main><h1>PizzaScript Blog</h1>${cards}</main>`,
    shellHead: shell.head,
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
  res.status(200).send(html);
  } catch (err) {
    console.error('[ssr-blog]', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(500).send(`<!doctype html><html><head><title>Blog | PizzaScript</title></head><body><main><h1>PizzaScript Blog</h1><p>Sorry, something went wrong loading this page.</p></main></body></html>`);
  }
}
