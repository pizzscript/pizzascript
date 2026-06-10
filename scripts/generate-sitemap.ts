import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://www.pizzascript.com';

const STATIC_ROUTES = [
  '/',
  '/services',
  '/services/custom-website-development',
  '/services/business-websites',
  '/services/landing-page-development',
  '/services/website-redesign',
  '/services/seo-friendly-websites',
  '/services/website-maintenance',
  '/services/website-speed-optimization',
  '/portfolio',
  '/portfolio/my-design-academia',
  '/portfolio/pizza-script',
  '/about'
];

function generateSitemap() {
  // Format current date/time in Asia/Kolkata timezone (IST) as YYYY-MM-DDThh:mm:ss+05:30
  const date = new Date();
  const offset = 5.5 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + offset);
  const currentDate = localDate.toISOString().substring(0, 19) + '+05:30';

  const mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_ROUTES.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/services/') || route.includes('/portfolio/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const indexSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://blog.pizzascript.com/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write Main Sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainSitemapContent, 'utf8');
  console.log('✔ sitemap-main.xml generated in public/');

  // Write Sitemap Index
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexSitemapContent, 'utf8');
  console.log('✔ sitemap.xml generated in public/');

  // Write Robots.txt
  const robotsContent = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8');
  console.log('✔ robots.txt generated in public/');
}

generateSitemap();
