import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://pizzascript.dev';

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
  // Format current date in Asia/Kolkata timezone (IST) as YYYY-MM-DD
  const currentDate = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Kolkata' });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_ROUTES.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/services/') || route.includes('/portfolio/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write Sitemap
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent, 'utf8');
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
