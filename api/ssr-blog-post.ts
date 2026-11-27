// Server-renders /blog/:slug with the real article text in the initial HTML — the fix for pages that were
// previously shipping an empty <div id="root"></div> to crawlers. The client SPA mounts fresh over this once
// JS loads; no hydration is attempted.
import { fetchPost, formatDate, getShell, page, breadcrumbSchema, articleSchema, stripUnsafe } from './_ssr.ts';

const SITE = 'https://www.pizzascript.com';

export default async function handler(req: any, res: any) {
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : '';
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return res.status(400).send('Invalid slug');

  const [post, shell] = await Promise.all([fetchPost(slug), getShell(req.headers.host)]);

  if (!post) {
    const html = page({
      title: 'Post not found',
      description: 'This article could not be found.',
      canonical: `${SITE}/blog/${slug}`,
      bodyHtml: '<main><h1>Post not found</h1></main>',
      shellHead: shell.head,
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex');
    return res.status(404).send(html);
  }

  const canonical = `${SITE}/blog/${post.slug}`;
  const img = post.cover_image_url
    ? `<img src="${stripUnsafe(post.cover_image_url)}" alt="${stripUnsafe(post.cover_image_alt ?? post.title)}" />`
    : '';
  const bodyHtml = `<main>
<h1>${stripUnsafe(post.title)}</h1>
<p>${post.category ? `${stripUnsafe(post.category)} · ` : ''}${formatDate(post.published_at)}${post.reading_minutes ? ` · ${post.reading_minutes} min read` : ''}</p>
${img}
<div>${stripUnsafe(post.body_html ?? '')}</div>
</main>`;

  const html = page({
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
    canonical,
    ogType: 'article',
    ogImage: post.og_image_url ?? post.cover_image_url ?? undefined,
    schema: [
      breadcrumbSchema([{ name: 'Home', url: SITE }, { name: 'Blog', url: `${SITE}/blog` }, { name: post.title, url: canonical }]),
      articleSchema({
        title: post.title,
        description: post.excerpt,
        url: canonical,
        image: post.og_image_url ?? post.cover_image_url ?? null,
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
      }),
    ],
    bodyHtml,
    shellHead: shell.head,
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
  res.status(200).send(html);
}
