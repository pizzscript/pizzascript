import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { getBreadcrumbSchema, getArticleSchema } from '../utils/schema';
import { getPostBySlug, getPublishedPosts, formatPostDate, type Post, type PostSummary } from '../lib/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null | undefined>(undefined); // undefined = loading
  const [related, setRelated] = useState<PostSummary[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setPost(undefined);
    setFailed(false);
    Promise.all([getPostBySlug(slug), getPublishedPosts()])
      .then(([p, all]) => {
        setPost(p);
        setRelated(all.filter((item) => item.slug !== slug).slice(0, 3));
      })
      .catch((err) => {
        console.error('[blog]', err);
        setFailed(true);
      });
  }, [slug]);

  if (failed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0604] text-cream relative z-10 font-mono">
        <Helmet><meta name="robots" content="noindex" /></Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">COULDN'T LOAD THIS POST</h1>
          <Link to="/blog" className="text-oven-orange hover:underline">&larr; Back to Blog</Link>
        </div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0604] text-cream relative z-10 font-mono">
        <Helmet><meta name="robots" content="noindex" /></Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">POST NOT FOUND</h1>
          <Link to="/blog" className="text-oven-orange hover:underline">&larr; Back to Blog</Link>
        </div>
      </div>
    );
  }

  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0604] text-cream relative z-10 font-mono">
        <p className="text-stone-500 text-sm">Loading...</p>
      </div>
    );
  }

  const postUrl = `https://www.pizzascript.com/blog/${post.slug}`;
  const schema = [
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.pizzascript.com' },
      { name: 'Blog', url: 'https://www.pizzascript.com/blog' },
      { name: post.title, url: postUrl },
    ]),
    getArticleSchema({
      title: post.title,
      description: post.seoDescription,
      url: postUrl,
      imageUrl: post.ogImageUrl ?? post.coverImageUrl,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    }),
  ];

  return (
    <>
      <SEO
        title={post.seoTitle}
        description={post.seoDescription}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.ogImageUrl ?? post.coverImageUrl ?? undefined}
        schema={schema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <article className="max-w-6xl mx-auto">
          <header className="mb-12">
            <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
              <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/blog" className="hover:text-oven-orange transition-colors">BLOG</Link> / <span className="text-oven-orange">{post.title}</span>
            </div>

            <h1 className="cin-heading text-3xl md:text-5xl font-serif font-bold leading-tight max-w-4xl">{post.title}</h1>

            <ul className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-oven-orange mt-6">
              <li className="flex items-center gap-2">
                <Calendar size={16} aria-hidden="true" />
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              </li>
              {post.readingMinutes && (
                <li className="flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  {post.readingMinutes} min read
                </li>
              )}
              {post.category && (
                <li className="flex items-center gap-2">
                  <Tag size={16} aria-hidden="true" />
                  {post.category}
                </li>
              )}
            </ul>

            {post.coverImageUrl && (
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 mt-10" style={{ aspectRatio: '1600 / 686' }}>
                <img
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt ?? ''}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div
              className="prose-blog lg:col-span-8 svc-panel"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />

            <aside className="lg:col-span-4 space-y-8" aria-label="More from PizzaScript">
              <div className="glass-card p-6 rounded-lg">
                <h2 className="font-headline-sm text-xl text-cream mb-3">Need custom web engineering?</h2>
                <p className="text-sm text-stone-300 mb-6">
                  We build fast, secure websites and applications that load instantly and rank.
                </p>
                <Link
                  to="/#order"
                  className="block w-full text-center bg-oven-orange text-black py-3 rounded-lg font-bold hover:bg-oven-amber transition-colors"
                >
                  Start a project
                </Link>
              </div>

              {related.length > 0 && (
                <nav aria-label="Related articles" className="border-t border-white/10 pt-6">
                  <h2 className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-4">Related articles</h2>
                  <ul className="space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link to={`/blog/${item.slug}`} className="group block">
                          <span className="block font-semibold text-cream group-hover:text-oven-orange transition-colors">
                            {item.title}
                          </span>
                          {item.category && <span className="text-xs text-stone-400">{item.category}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
