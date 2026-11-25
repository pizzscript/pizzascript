import DOMPurify from 'dompurify';
import { supabase } from './supabase';

// Same workspace id the main app uses for PizzaScript's own posts.
const DEFAULT_WORKSPACE = '00000000-0000-4000-8000-000000000001';

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  category: string | null;
  readingMinutes: number | null;
  publishedAt: string;
  updatedAt: string;
}

export interface Post extends PostSummary {
  bodyHtml: string;
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string | null;
  tags: string[];
}

const SUMMARY_COLUMNS = 'slug,title,excerpt,cover_image_url,cover_image_alt,category,reading_minutes,published_at,updated_at';

type Row = Record<string, unknown>;

function toSummary(row: Row): PostSummary {
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    coverImageUrl: (row.cover_image_url as string | null) ?? null,
    coverImageAlt: (row.cover_image_alt as string | null) ?? null,
    category: (row.category as string | null) ?? null,
    readingMinutes: (row.reading_minutes as number | null) ?? null,
    publishedAt: row.published_at as string,
    updatedAt: row.updated_at as string,
  };
}

function toPost(row: Row): Post {
  return {
    ...toSummary(row),
    bodyHtml: DOMPurify.sanitize(row.body_html as string, {
      ALLOWED_TAGS: [
        'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'code', 'pre',
        'blockquote', 'figure', 'figcaption', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'hr', 'br', 'div', 'span', 'sup', 'sub',
      ],
      ALLOWED_ATTR: ['href', 'title', 'rel', 'target', 'src', 'alt', 'width', 'height', 'loading', 'decoding', 'class', 'scope'],
    }),
    seoTitle: (row.seo_title as string | null) ?? (row.title as string),
    seoDescription: (row.seo_description as string | null) ?? (row.excerpt as string),
    ogImageUrl: (row.og_image_url as string | null) ?? null,
    tags: (row.tags as string[]) ?? [],
  };
}

export async function getPublishedPosts(): Promise<PostSummary[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select(SUMMARY_COLUMNS)
    .eq('workspace_id', DEFAULT_WORKSPACE)
    .order('published_at', { ascending: false });
  if (error) throw new Error(`[blog] Failed to load posts: ${error.message}`);
  return (data ?? []).map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select(`${SUMMARY_COLUMNS},body_html,seo_title,seo_description,og_image_url,tags`)
    .eq('workspace_id', DEFAULT_WORKSPACE)
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw new Error(`[blog] Failed to load post "${slug}": ${error.message}`);
  return data ? toPost(data as Row) : null;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}
