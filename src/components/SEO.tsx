import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string | null;
  schema?: object | object[];
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/assets/images/og_preview.png',
  schema
}: SEOProps) {
  const defaultTitle = 'PizzaScript - Custom High-Performance Web Development';
  const siteUrl = 'https://www.pizzascript.com';
  
  // Format urls absolute
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const resolvedOgImage = ogImage ?? '/assets/images/og_preview.png';
  const fullOgImage = resolvedOgImage.startsWith('http') ? resolvedOgImage : `${siteUrl}${resolvedOgImage}`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title ? `${title} | PizzaScript` : defaultTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="PizzaScript" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Schema Markup */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
