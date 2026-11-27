// Cached list of published posts. Vercel's edge/CDN caches this response for every visitor; a fresh view never
// waits more than ~60s after a post is published or unpublished, and stays fast in between via stale-while-revalidate.
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';
const COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at';

export default async function handler(req: any, res: any) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Supabase is not configured' });

  const query = `${url}/rest/v1/posts?select=${COLUMNS}&workspace_id=eq.${DEFAULT_WORKSPACE}&order=published_at.desc`;
  const r = await fetch(query, { headers: { apikey: key, authorization: `Bearer ${key}` } });
  if (!r.ok) return res.status(502).json({ error: `Supabase answered ${r.status}` });

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=600');
  res.status(200).json(await r.json());
}
