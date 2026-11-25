import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schema';
import { getPublishedPosts, formatPostDate, type PostSummary } from '../lib/blog';

export default function BlogHub() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('[blog]', err);
        setFailed(true);
      });
  }, []);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Blog', url: 'https://www.pizzascript.com/blog' },
  ]);

  return (
    <>
      <SEO
        title="Engineering Blog"
        description="Practical, code-first notes on React, Next.js, performance and SEO from the PizzaScript team."
        keywords="web development blog, react blog, next.js blog, frontend engineering notes"
        canonicalUrl="/blog"
        schema={breadcrumbSchema}
      />

      <div className="min-h-screen pt-40 lg:pt-52 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">

          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest text-center md:text-left">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link>
            {' / '}
            <span className="text-oven-orange">BLOG</span>
          </div>

          {/* Header */}
          <div className="text-center md:text-left mb-16 max-w-3xl">
            <span className="cin-eyebrow text-xs tracking-widest block uppercase mb-2">// Notes &amp; Writing</span>
            <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              The Engineering <span className="italic text-oven-orange">Blog</span>
            </h1>
            <p className="cin-text text-stone-400 text-base mt-6 leading-relaxed">
              Code-first notes on React, Next.js, performance and SEO — the same things we apply when building client sites.
            </p>
          </div>

          {failed && (
            <p className="text-stone-500 text-sm font-mono">Couldn't load posts right now. Try again shortly.</p>
          )}

          {!failed && posts === null && (
            <p className="text-stone-500 text-sm font-mono">Loading...</p>
          )}

          {posts !== null && posts.length === 0 && (
            <p className="text-stone-500 text-sm font-mono">No posts yet — check back soon.</p>
          )}

          {posts && posts.length > 0 && (
            <div className="portfolio-grid">
              {posts.map((post) => (
                <article key={post.slug} className="portfolio-card animate-in">
                  <Link to={`/blog/${post.slug}`} style={{ display: 'block', width: '100%' }}>
                    <div className="portfolio-card__image" style={{ aspectRatio: '1600 / 686' }}>
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.coverImageAlt ?? post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="portfolio-card__logo" />
                      )}
                    </div>
                  </Link>

                  <div className="portfolio-card__body">
                    <h2 className="portfolio-card__title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="portfolio-card__desc">{post.excerpt}</p>
                    <div className="portfolio-card__meta">
                      <span>{formatPostDate(post.publishedAt)}</span>
                      {post.readingMinutes && <span style={{ color: 'var(--color-oven-orange)' }}>{post.readingMinutes} min read</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
