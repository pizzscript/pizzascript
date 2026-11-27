// Cached single post by slug. Same caching as api/posts.ts: fast for every visitor, never more than ~60s stale.
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';
const COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at,body_html,seo_title,seo_description,og_image_url,tags';

export default async function handler(req: any, res: any) {
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : '';
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) return res.status(400).json({ error: 'Invalid slug' });

  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Supabase is not configured' });

  const query = `${url}/rest/v1/posts?select=${COLUMNS}&workspace_id=eq.${DEFAULT_WORKSPACE}&slug=eq.${slug}&limit=1`;
  const r = await fetch(query, { headers: { apikey: key, authorization: `Bearer ${key}` } });
  if (!r.ok) return res.status(502).json({ error: `Supabase answered ${r.status}` });
  const rows = (await r.json()) as unknown[];

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
  res.status(200).json(rows[0] ?? null);
}
