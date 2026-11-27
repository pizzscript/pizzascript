// Shared helpers for server-rendering /blog and /blog/:slug at request time: real text in the first response (so
// crawlers and no-JS clients see it immediately), while JS-enabled visitors still get the full interactive SPA —
// the client app mounts fresh over this content the moment it loads, exactly as if these were static pages.
const SITE = 'https://www.pizzascript.com';
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';
const SUMMARY_COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at';

export interface Row {
  slug: string; title: string; excerpt: string; cover_image_url: string | null; cover_image_alt: string | null;
  category: string | null; reading_minutes: number | null; published_at: string; updated_at: string;
  body_html?: string; seo_title?: string | null; seo_description?: string | null; og_image_url?: string | null;
}

export async function fetchPosts(): Promise<Row[]> {
  const url = process.env.VITE_SUPABASE_URL, key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const r = await fetch(`${url}/rest/v1/posts?select=${SUMMARY_COLUMNS}&workspace_id=eq.${DEFAULT_WORKSPACE}&order=published_at.desc`, { headers: { apikey: key, authorization: `Bearer ${key}` } });
  return r.ok ? ((await r.json()) as Row[]) : [];
}

export async function fetchPost(slug: string): Promise<Row | null> {
  const url = process.env.VITE_SUPABASE_URL, key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const cols = `${SUMMARY_COLUMNS},body_html,seo_title,seo_description,og_image_url`;
  const r = await fetch(`${url}/rest/v1/posts?select=${cols}&workspace_id=eq.${DEFAULT_WORKSPACE}&slug=eq.${encodeURIComponent(slug)}&limit=1`, { headers: { apikey: key, authorization: `Bearer ${key}` } });
  if (!r.ok) return null;
  const rows = (await r.json()) as Row[];
  return rows[0] ?? null;
}

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

/** Strips anything that could execute script before this reaches a response. The client re-renders with the
 * fuller DOMPurify pass anyway; this only has to be safe for the brief window before JS takes over. */
export function stripUnsafe(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(href|src)\s*=\s*("javascript:[^"]*"|'javascript:[^']*')/gi, '');
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The page's <head> tags and asset links, extracted once from the already-built static site and cached in memory
 * for the life of this function instance (a Vercel function stays warm across requests for a while). */
let shellCache: { head: string } | null = null;
export async function getShell(host: string): Promise<{ head: string }> {
  if (shellCache) return shellCache;
  const res = await fetch(`https://${host}/index.html`);
  const html = await res.text();
  const viteScript = html.match(/<script type="module" crossorigin src="\/assets\/[^"]+\.js"><\/script>/)?.[0] ?? '';
  const viteCSS = html.match(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+\.css">/)?.[0] ?? '';
  const inlineStyles = html.match(/<style>[\s\S]*?<\/style>/)?.[0] ?? '';
  const fonts = [...html.matchAll(/<link[^>]+(?:fonts\.googleapis|fonts\.gstatic|fontsource|jetbrains-mono)[^>]*>/gi)].map((m) => m[0]).join('\n');
  shellCache = { head: `${fonts}\n${inlineStyles}\n${viteCSS}\n${viteScript}` };
  return shellCache;
}

export function page(opts: { title: string; description: string; canonical: string; ogType?: string; ogImage?: string; schema?: object[]; bodyHtml: string; shellHead: string }) {
  const fullTitle = `${opts.title} | PizzaScript`;
  const ogImage = opts.ogImage?.startsWith('http') ? opts.ogImage : `${SITE}${opts.ogImage ?? '/assets/images/og_preview.png'}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(fullTitle)}</title>
<meta name="description" content="${escape(opts.description)}" />
<link rel="canonical" href="${escape(opts.canonical)}" />
<meta property="og:type" content="${opts.ogType ?? 'website'}" />
<meta property="og:title" content="${escape(opts.title)}" />
<meta property="og:description" content="${escape(opts.description)}" />
<meta property="og:image" content="${escape(ogImage)}" />
<meta property="og:url" content="${escape(opts.canonical)}" />
<meta property="og:site_name" content="PizzaScript" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(opts.title)}" />
<meta name="twitter:description" content="${escape(opts.description)}" />
<meta name="twitter:image" content="${escape(ogImage)}" />
${(opts.schema ?? []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
<link rel="icon" href="/favicon.png" type="image/png">
${opts.shellHead}
</head>
<body>
<div id="root">${opts.bodyHtml}</div>
</body>
</html>`;
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
});

export const articleSchema = (p: { title: string; description: string; url: string; image: string | null; publishedAt: string; updatedAt: string }) => ({
  '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
  ...(p.image ? { image: [p.image] } : {}), datePublished: p.publishedAt, dateModified: p.updatedAt,
  mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
  author: { '@type': 'Organization', name: 'PizzaScript', url: SITE },
  publisher: { '@type': 'Organization', name: 'PizzaScript', url: SITE },
});
