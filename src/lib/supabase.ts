import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Public anon key, read-only. RLS on `posts` already restricts anonymous reads
// to rows where status = 'published' AND published_at <= now().
export const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

if (!supabase) {
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set; the blog will be empty.');
}
