// Server-renders /blog with real post titles/excerpts in the initial HTML. The client SPA mounts fresh over
// this the moment JS loads (no hydration attempted), so this only has to carry real content for crawlers and
// the first paint. Self-contained (no local imports) to match the other working api/*.ts functions here.
const SITE = 'https://www.pizzascript.com';
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';
const SUMMARY_COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at';

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
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    const posts: any[] = url && key
      ? await fetch(`${url}/rest/v1/posts?select=${SUMMARY_COLUMNS}&workspace_id=eq.${DEFAULT_WORKSPACE}&order=published_at.desc`, { headers: { apikey: key, authorization: `Bearer ${key}` } })
          .then((r) => (r.ok ? r.json() : []))
      : [];
    const shellHead = await getShellHead(req.headers.host);

    const cards = posts
      .map((p) => {
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

    const description = 'Insights on web development, SEO, and growing a software business, from the PizzaScript team.';
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
    ] };

    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blog | PizzaScript</title>
<meta name="description" content="${escape(description)}" />
<link rel="canonical" href="${SITE}/blog" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Blog" />
<meta property="og:description" content="${escape(description)}" />
<meta property="og:image" content="${SITE}/assets/images/og_preview.png" />
<meta property="og:url" content="${SITE}/blog" />
<meta property="og:site_name" content="PizzaScript" />
<meta name="twitter:card" content="summary_large_image" />
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
<link rel="icon" href="/favicon.png" type="image/png">
${shellHead}
</head>
<body>
<div id="root"><main><h1>PizzaScript Blog</h1>${cards}</main></div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
    res.status(200).send(html);
  } catch (err) {
    console.error('[ssr-blog]', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(500).send(`<!doctype html><html><head><title>Blog | PizzaScript</title></head><body><main><h1>PizzaScript Blog</h1><p>Sorry, something went wrong loading this page.</p></main></body></html>`);
  }
}
