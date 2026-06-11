import * as fs from 'fs';
import * as path from 'path';

interface RouteSEO {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  schema?: object;
}

const SITE_URL = 'https://www.pizzascript.com';

const SEO_DATA: Record<string, RouteSEO> = {
  '/': {
    title: 'PizzaScript - Hand-Crafted Websites, Made from Scratch',
    description: 'Freelance web developer cooking up custom-built websites, web apps, and creative UI/UX designs. High performance, zero shortcuts, 100% organic code.',
    keywords: 'freelance web developer, custom websites, react developer, performance optimization, Pune web design, technical SEO, frontend engineer',
    ogImage: '/assets/images/og_preview.png'
  },
  '/about': {
    title: 'About PizzaScript - Custom Web Engineering Studio in Pune',
    description: 'Learn more about our web engineering studio. Over 5 years of experience building high-performance React web applications and implementing technical JS SEO.',
    keywords: 'freelance developer Pune, custom web developer India, frontend engineering consultant, technical SEO expert',
    ogImage: '/assets/images/og_preview.png'
  },
  '/services': {
    title: 'Custom Web Development & Technical Services - PizzaScript',
    description: 'High-performance web development services: React frontend engineering, JavaScript SEO, Core Web Vitals optimization, Cloudedge hosting, and GSAP scroll animations.',
    keywords: 'react developer services, web performance optimization, technical javascript seo, custom website design pune',
    ogImage: '/assets/images/og_preview.png'
  },
  '/services/custom-website-development': {
    title: 'Custom Website Development & Bespoke Design Services - PizzaScript',
    description: 'Premium custom website developer Pune. Tailored website designs built from scratch with high-performance TSX. Zero template bloat, clean SEO code.',
    keywords: 'Custom Website Development, Custom Website Developer, Bespoke Website Design, Custom Business Website',
    ogImage: '/assets/images/service_react.png'
  },
  '/services/business-websites': {
    title: 'Professional Business Website Development Services - PizzaScript',
    description: 'Premium business website design Pune. Increase conversions and credibility with bespoke company website layouts, secure contact forms, and local SEO integrations.',
    keywords: 'Business Website Development, Professional Website Development, Company Website Design, Corporate Website Development',
    ogImage: '/assets/images/service_ai.png'
  },
  '/services/landing-page-development': {
    title: 'Custom Landing Page Development Services - PizzaScript',
    description: 'High-converting landing pages Pune. Boost your campaign ROI with fast, custom-coded landing page layouts, optimized CTA routing, and serverless form endpoints.',
    keywords: 'Landing Page Development, Custom Landing Page Design, Campaign Landing Page, Lead Generation Website',
    ogImage: '/assets/images/service_animation.png'
  },
  '/services/website-redesign': {
    title: 'Professional Website Redesign & Modernization Services - PizzaScript',
    description: 'Premium website revamp Pune. Modernize outdated websites with custom React interfaces. UX improvements, speed optimizations, and SEO preservation.',
    keywords: 'Website Redesign, Website Revamp, Website Modernization, Website Upgrade',
    ogImage: '/assets/images/case_study_mockup.png'
  },
  '/services/seo-friendly-websites': {
    title: 'SEO-Friendly Website Development & Technical SEO Services - PizzaScript',
    description: 'Premium SEO-friendly website design Pune. Increase organic search rankings with custom pre-rendered React pages, semantic schemas, and optimized crawl paths.',
    keywords: 'SEO-Friendly Website Development, SEO Friendly Web Design, Technical SEO Developer, Search Engine Optimized Website',
    ogImage: '/assets/images/service_seo.png'
  },
  '/services/website-maintenance': {
    title: 'Website Maintenance Services & Technical Support - PizzaScript',
    description: 'Premium website support Pune. Keep your custom web applications secure, fast, and up-to-date with 24/7 monitoring, backups, and staging deployments.',
    keywords: 'Website Maintenance Services, Website Support Service, WordPress to React Support, Website Security Maintenance',
    ogImage: '/assets/images/service_deployment.png'
  },
  '/services/website-speed-optimization': {
    title: 'Website Speed Optimization Services | Core Web Vitals - PizzaScript',
    description: 'Premium web performance optimization Pune. Boost loading speeds, achieve 100/100 Lighthouse scores, and optimize Core Web Vitals with custom code refactoring.',
    keywords: 'Website Speed Optimization, Speed Up Website, Core Web Vitals Optimization, Lighthouse Score Optimizer',
    ogImage: '/assets/images/service_performance.png'
  },
  '/portfolio': {
    title: 'Web Engineering Case Studies & Portfolio - PizzaScript',
    description: 'Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations.',
    keywords: 'web development case study, react developer portfolio, custom frontend development, Pune web engineer portfolio',
    ogImage: '/assets/images/case_study_mockup.png'
  },
  '/portfolio/my-design-academia': {
    title: 'My Design Academia - High-Converting Educational Portal Case Study',
    description: 'Case study on developing a responsive, SEO-optimized educational web portal built for student registration and conversions. Optimized paths and database queries.',
    keywords: 'design portal website case study, custom PHP development, higher education web design',
    ogImage: '/assets/images/case_study_mockup.png'
  },
  '/portfolio/orion-pharma-india': {
    title: 'Orion Pharma India - High-Performance Pharmaceutical Platform Case Study',
    description: 'Case study on developing a highly optimized corporate medical portal and international exporter directory. Built for global speed, compliance, and search visibility.',
    keywords: 'pharma exporter website case study, custom medical portal development, seo friendly pharma site',
    ogImage: '/assets/images/case_study_mockup.png'
  }
};

function prerender() {
  const distDir = path.resolve('dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ Build shell dist/index.html not found! Run npm run build first.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  Object.entries(SEO_DATA).forEach(([route, seo]) => {
    if (route === '/') return; // Home route uses base index.html

    const fullUrl = `${SITE_URL}${route}`;
    const fullOgImage = seo.ogImage.startsWith('http') ? seo.ogImage : `${SITE_URL}${seo.ogImage}`;

    // Replace basic SEO headers
    let renderedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${seo.title}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${seo.description}" />`)
      .replace(/<meta name="keywords" content=".*?"\s*\/?>/, `<meta name="keywords" content="${seo.keywords}" />`)
      .replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${seo.title}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${seo.description}" />`)
      .replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${fullOgImage}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${fullUrl}" />`)
      .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${seo.title}" />`)
      .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${seo.description}" />`)
      .replace(/<meta name="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${fullOgImage}" />`);

    // Ingest sitemap / canonical link
    renderedHtml = renderedHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${fullUrl}" />\n</head>`
    );

    const routeFolder = path.join(distDir, route);
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }

    fs.writeFileSync(path.join(routeFolder, 'index.html'), renderedHtml, 'utf8');
    console.log(`✔ Pre-rendered: ${routeFolder}/index.html`);
  });
}

prerender();
