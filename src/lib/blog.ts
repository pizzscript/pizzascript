import DOMPurify from 'dompurify';

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

// Goes through /api/posts*, a cached serverless function (see api/posts.ts), instead of calling Supabase directly
// from the browser. Vercel's CDN caches the response for every visitor; a published change shows within ~60s.
export async function getPublishedPosts(): Promise<PostSummary[]> {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error(`[blog] Failed to load posts: HTTP ${res.status}`);
  return ((await res.json()) as Row[]).map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`[blog] Failed to load post "${slug}": HTTP ${res.status}`);
  const row = (await res.json()) as Row | null;
  return row ? toPost(row) : null;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
}
