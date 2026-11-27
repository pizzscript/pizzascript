// Server-renders /blog/:slug with the real article text in the initial HTML — the fix for pages that were
// previously shipping an empty <div id="root"></div> to crawlers. The client SPA mounts fresh over this once
// JS loads; no hydration is attempted. Self-contained (no local imports) to match the other working api/*.ts
// functions here.
const SITE = 'https://www.pizzascript.com';
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';
const COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at,body_html,seo_title,seo_description,og_image_url';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

function stripUnsafe(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi, '');
}

let shellCache: string | null = null;
async function getShellHead(host: string): Promise<string> {
  if (shellCache !== null) return shellCache;
  try {
    const res = await fetch(`https://${host}/index.html`);
    const html = await res.text();
    const viteScript = html.match(/<script type="module" crossorigin src="\/assets\/[^"]+\.js"><\/script>/)?.[0] ?? '';
    const viteCSS = html.match(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+\.css">/)?.[0] ?? '';
    const inlineStyles = html.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? '';
    const fonts = [...html.matchAll(/<link[^>]+(?:fonts\.googleapis|fonts\.gstatic|fontsource|jetbrains-mono)[^>]*>/gi)].map((m) => m[0]).join('\n');
    shellCache = `${fonts}\n${inlineStyles}\n${viteCSS}\n${viteScript}`;
  } catch {
    shellCache = '';
  }
  return shellCache;
}

export default async function handler(req: any, res: any) {
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : '';
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return res.status(400).send('Invalid slug');

  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    let post: any = null;
    if (url && key) {
      const r = await fetch(`${url}/rest/v1/posts?select=${COLUMNS}&workspace_id=eq.${DEFAULT_WORKSPACE}&slug=eq.${encodeURIComponent(slug)}&limit=1`, { headers: { apikey: key, authorization: `Bearer ${key}` } });
      if (r.ok) {
        const rows = await r.json();
        post = rows[0] ?? null;
      }
    }
    const shellHead = await getShellHead(req.headers.host);

    if (!post) {
      const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Post not found | PizzaScript</title>
<meta name="robots" content="noindex" />
${shellHead}
</head>
<body>
<div id="root"><main><h1>Post not found</h1></main></div>
</body>
</html>`;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'noindex');
      return res.status(404).send(html);
    }

    const canonical = `${SITE}/blog/${post.slug}`;
    const title = post.seo_title ?? post.title;
    const description = post.seo_description ?? post.excerpt;
    const ogImage = post.og_image_url ?? post.cover_image_url ?? `${SITE}/assets/images/og_preview.png`;
    const img = post.cover_image_url
      ? `<img src="${stripUnsafe(post.cover_image_url)}" alt="${stripUnsafe(post.cover_image_alt ?? post.title)}" />`
      : '';

    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ] };
    const article = {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.excerpt,
      ...(post.og_image_url || post.cover_image_url ? { image: [post.og_image_url ?? post.cover_image_url] } : {}),
      datePublished: post.published_at, dateModified: post.updated_at,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      author: { '@type': 'Organization', name: 'PizzaScript', url: SITE },
      publisher: { '@type': 'Organization', name: 'PizzaScript', url: SITE },
    };

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(title)} | PizzaScript</title>
<meta name="description" content="${escape(description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escape(post.title)}" />
<meta property="og:description" content="${escape(description)}" />
<meta property="og:image" content="${escape(ogImage)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="PizzaScript" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(article)}</script>
<link rel="icon" href="/favicon.png" type="image/png">
${shellHead}
</head>
<body>
<div id="root"><main>
<h1>${stripUnsafe(post.title)}</h1>
<p>${post.category ? `${stripUnsafe(post.category)} · ` : ''}${formatDate(post.published_at)}${post.reading_minutes ? ` · ${post.reading_minutes} min read` : ''}</p>
${img}
<div>${stripUnsafe(post.body_html ?? '')}</div>
</main></div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
    res.status(200).send(html);
  } catch (err) {
    console.error('[ssr-blog-post]', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(500).send(`<!doctype html><html><head><title>PizzaScript</title></head><body><main><h1>Sorry, something went wrong loading this page.</h1></main></body></html>`);
  }
}
