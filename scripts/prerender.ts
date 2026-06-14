import * as fs from 'fs';
import * as path from 'path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// These three values are build-time dynamic (hashed filenames + extracted inline styles)
const viteScript = baseHtml.match(/<script type="module" crossorigin src="\/assets\/[^"]+\.js"><\/script>/)?.[0] ?? '';
const viteCSS    = baseHtml.match(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+\.css">/)?.[0] ?? '';
const inlineStyles = baseHtml.match(/(<style>[\s\S]*?<\/style>)/)?.[0] ?? '';

// Shared body markup — identical on every page (preloader UI + React root + lottie init)
const sharedBody = baseHtml.slice(baseHtml.indexOf('<body'));

function write(filePath: string, html: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✔ Pre-rendered: ${filePath}`);
}

// =============================================================================
// HARDCODED SCHEMAS (JSON-LD)
// =============================================================================
const homeSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PizzaScript",
    "image": "https://www.pizzascript.com/assets/images/og_preview.png",
    "@id": "https://www.pizzascript.com/#organization",
    "url": "https://www.pizzascript.com",
    "telephone": "",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/pizzascript"
    ]
  }
  </script>`;

const aboutSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://www.pizzascript.com/about"
          }
        ]
      },
      {
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "LocalBusiness",
          "name": "PizzaScript",
          "description": "High-performance custom web engineering studio based in Pune, India. Hand-crafted responsive React layouts, technical SEO, and edge deployment.",
          "url": "https://www.pizzascript.com",
          "image": "https://www.pizzascript.com/assets/images/og_preview.png"
        }
      }
    ]
  }
  </script>`;

const servicesHubSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pizzascript.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.pizzascript.com/services"
      }
    ]
  }
  </script>`;

const customWebsiteSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Custom Website Development",
        "description": "Bespoke website design and development services built from scratch. High performance, unique branding, and modern architecture.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/custom-website-development",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Custom Website Development",
            "item": "https://www.pizzascript.com/services/custom-website-development"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why should I choose custom website development over templates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Templates come with heavy stylesheet bloat, redundant JavaScript layers, and persistent plugin vulnerabilities. Bespoke websites are coded from scratch with optimized assets, resulting in faster loading speeds, superior technical SEO crawlers discoverability, and custom designs that fit your brand."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a custom business website build take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A typical custom design and development cycle spans 4 to 8 weeks. This structured process covers research architecture modeling, modular interface prototyping, clean TSX coding, and edge performance optimization before launch."
            }
          },
          {
            "@type": "Question",
            "name": "Are custom websites secure and easily scalable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. By avoiding standard open-source CMS databases and vulnerable third-party plugins, custom edge-rendered static sites have virtually zero server-side exploit vectors. They scale infinitely without database memory overload."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const businessWebsitesSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Business Website Development",
        "description": "Professional website development for companies. Features lead generation tools, custom contact forms, WhatsApp and Google Maps integrations.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/business-websites",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Business Website Development",
            "item": "https://www.pizzascript.com/services/business-websites"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does a custom business website generate more customer leads?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We design conversion-focused forms, direct click-to-chat WhatsApp hooks, and clear, prominent action buttons. When combined with sub-second paint times and optimized mobile layouts, this friction-free experience substantially increases visitor inquiry rates."
            }
          },
          {
            "@type": "Question",
            "name": "Can you sync contact form leads into our CRM software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We construct secure API bridge functions to route customer inquiries directly into platforms like HubSpot, Salesforce, or Zoho, as well as Slack channels for real-time sales team alerts."
            }
          },
          {
            "@type": "Question",
            "name": "Do you manage domain configuration and hosting setups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We configure DNS routing, secure SSL certificate layers, and hook up your custom domain to edge server networks on Vercel or Cloudflare CDN nodes for permanent uptime."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const landingPagesSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Landing Page Development",
        "description": "High-converting landing page development for marketing campaigns. Features CTA optimizations, lead capturing systems, and sub-second loading speeds.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/landing-page-development",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Landing Page Development",
            "item": "https://www.pizzascript.com/services/landing-page-development"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What structural features make a landing page high-converting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A high-converting landing page eliminates normal website headers to prevent navigation leaks, loads in less than 1.0 second to retain paid mobile traffic, and houses a single high-contrast Call to Action (CTA) backed by trust-building testimonials."
            }
          },
          {
            "@type": "Question",
            "name": "Are these custom landing pages compatible with Google and Meta ads?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Because they load instantly and have clean semantic HTML elements, search engine crawlers rate them with high Quality Scores. This lowers your advertising Cost-Per-Click (CPC) and increases conversion percentages."
            }
          },
          {
            "@type": "Question",
            "name": "How do you configure split A/B testing variables?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We build modular, structured component layouts. This allows us to compile alternative variations (like trying different headings or button colors) and link them to conversion-tracking systems easily."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const websiteRedesignSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Redesign Services",
        "description": "Modernize outdated websites. Visual upgrades, mobile responsive redesigns, Core Web Vitals optimization, and 301 redirect management.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/website-redesign",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Website Redesign",
            "item": "https://www.pizzascript.com/services/website-redesign"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the main indicators that my website needs a redesign?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Outdated visual styles, poor mobile responsiveness, slow load speeds, and high visitor bounce rates are clear indicators. Modernizing your website addresses these issues to rebuild user trust and capture more inquiries."
            }
          },
          {
            "@type": "Question",
            "name": "Will redirecting pages during a redesign impact our current search rankings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We create comprehensive URL rewrite maps and configure server-side 301 redirects, ensuring search engines crawl and transfer authority to the new paths without ranking loss."
            }
          },
          {
            "@type": "Question",
            "name": "Can we retain our current website copy and assets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We preserve your existing text, branding assets, and articles, but import them into optimized React layout structures for improved reading comfort and speed."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const seoFriendlySchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "SEO-Friendly Website Development",
        "description": "Technical search engine optimization built into the core structure of custom websites. Pre-rendered HTML, meta tag hooks, and JSON-LD schema integrations.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/seo-friendly-websites",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "SEO-Friendly Website Development",
            "item": "https://www.pizzascript.com/services/seo-friendly-websites"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What makes a custom website more SEO-friendly than builder websites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generic builders include messy JS payloads, bloated CSS DOM nodes, and bad semantic structure. Custom React builds are compiled into clean static HTML with nested meta tags, fast execution times, and automated structural schema mappings that allow Google bots to parse and index pages easily."
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle schema markup for local businesses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We write customized JSON-LD schema trees incorporating LocalBusiness, Service, and BreadcrumbList metadata. This directly informs search engines about your services, locations, and pricing packages, generating rich snippet display items in results."
            }
          },
          {
            "@type": "Question",
            "name": "Will my current search ranking fall during a migration to React?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We carefully build 301 URL redirect maps, match original meta elements, register XML sitemaps, and test performance scores to preserve your existing search footprint while improving core crawlers access."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const websiteMaintenanceSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Maintenance & Support",
        "description": "Professional support and maintenance services for custom websites and legacy platforms. Real-time uptime monitoring, security patching, and fast content updates.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/website-maintenance",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Website Maintenance & Support",
            "item": "https://www.pizzascript.com/services/website-maintenance"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does your website maintenance service cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We monitor your application 24/7 for security alerts, execute package and library updates, run automated backups, and handle content updates, copy edits, or layout adjustments as your brand grows."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly do you resolve website issues or execute updates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We guarantee a response time of less than 2 hours for critical site outages and complete standard copy or content update requests within 24 to 48 hours in a clean staging space."
            }
          },
          {
            "@type": "Question",
            "name": "Can you help maintain our legacy WordPress website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We execute server updates, database optimization, and plugin audit checks on WordPress platforms, while offering high-performance migration pipelines to React."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const speedOptimizationSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Speed Optimization",
        "description": "Performance optimization services to boost website speeds and pass Core Web Vitals checks. Image compression, asset cache routing, and Lighthouse score fixes.",
        "provider": {
          "@type": "ProfessionalService",
          "name": "PizzaScript",
          "url": "https://www.pizzascript.com"
        },
        "url": "https://www.pizzascript.com/services/website-speed-optimization",
        "serviceType": "Web Development Service",
        "areaServed": {
          "@type": "Country",
          "name": "Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pizzascript.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.pizzascript.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Website Speed Optimization",
            "item": "https://www.pizzascript.com/services/website-speed-optimization"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is website speed so important for my business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Slow websites lose customers. Studies show that a 1-second delay in page load times reduces conversion rates by up to 20%. Fast loading speed also directly impacts your Google SEO rankings, since page speed is a core search ranking factor."
            }
          },
          {
            "@type": "Question",
            "name": "How do you achieve a 100/100 Lighthouse speed score?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We minify and compile styles, compress images, leverage browser cache directories, defer non-critical script files, and structure clean DOM branches to pass Google Core Web Vitals checks instantly."
            }
          },
          {
            "@type": "Question",
            "name": "Will optimizing my site speed break existing website features?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We perform optimizations within staging branches first, verifying that all script hooks, contact systems, and interactive tools function properly before going live."
            }
          }
        ]
      }
    ]
  }
  </script>`;

const portfolioSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pizzascript.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.pizzascript.com/portfolio"
      }
    ]
  }
  </script>`;

const myDesignAcademiaSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pizzascript.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.pizzascript.com/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "My Design Academia - High-Converting Educational Portal",
        "item": "https://www.pizzascript.com/portfolio/my-design-academia"
      }
    ]
  }
  </script>`;

const orionPharmaSchema = `  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.pizzascript.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://www.pizzascript.com/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Orion Pharma India - High-Performance Pharmaceutical Platform",
        "item": "https://www.pizzascript.com/portfolio/orion-pharma-india"
      }
    ]
  }
  </script>`;



// =============================================================================
// HOME — https://www.pizzascript.com/
// =============================================================================
write(indexHtmlPath, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>PizzaScript - Hand-Crafted Websites, Made from Scratch</title>
  <meta name="description" content="Freelance web developer cooking up custom-built websites, web apps, and creative UI/UX designs. High performance, zero shortcuts, 100% organic code." />
  <meta name="keywords" content="freelance web developer, custom websites, react developer, performance optimization, Pune web design, technical SEO, frontend engineer" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="PizzaScript - Hand-Crafted Websites, Made from Scratch" />
  <meta property="og:description" content="Freelance web developer cooking up custom-built websites, web apps, and creative UI/UX designs. High performance, zero shortcuts, 100% organic code." />
  <meta property="og:url" content="https://www.pizzascript.com/" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PizzaScript - Hand-Crafted Websites, Made from Scratch" />
  <meta name="twitter:description" content="Freelance web developer cooking up custom-built websites, web apps, and creative UI/UX designs. High performance, zero shortcuts, 100% organic code." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${homeSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// ABOUT — https://www.pizzascript.com/about
// =============================================================================
write(path.join(distDir, 'about/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>About PizzaScript - Custom Web Engineering Studio in Pune</title>
  <meta name="description" content="Learn more about our web engineering studio. Over 5 years of experience building high-performance React web applications and implementing technical JS SEO." />
  <meta name="keywords" content="freelance developer Pune, custom web developer India, frontend engineering consultant, technical SEO expert" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/about" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="About PizzaScript - Custom Web Engineering Studio in Pune" />
  <meta property="og:description" content="Learn more about our web engineering studio. Over 5 years of experience building high-performance React web applications and implementing technical JS SEO." />
  <meta property="og:url" content="https://www.pizzascript.com/about" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About PizzaScript - Custom Web Engineering Studio in Pune" />
  <meta name="twitter:description" content="Learn more about our web engineering studio. Over 5 years of experience building high-performance React web applications and implementing technical JS SEO." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${aboutSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICES HUB — https://www.pizzascript.com/services
// =============================================================================
write(path.join(distDir, 'services/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Custom Web Development &amp; Technical Services - PizzaScript</title>
  <meta name="description" content="High-performance web development services: React frontend engineering, JavaScript SEO, Core Web Vitals optimization, Cloudedge hosting, and GSAP scroll animations." />
  <meta name="keywords" content="react developer services, web performance optimization, technical javascript seo, custom website design pune" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Custom Web Development &amp; Technical Services - PizzaScript" />
  <meta property="og:description" content="High-performance web development services: React frontend engineering, JavaScript SEO, Core Web Vitals optimization, Cloudedge hosting, and GSAP scroll animations." />
  <meta property="og:url" content="https://www.pizzascript.com/services" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Custom Web Development &amp; Technical Services - PizzaScript" />
  <meta name="twitter:description" content="High-performance web development services: React frontend engineering, JavaScript SEO, Core Web Vitals optimization, Cloudedge hosting, and GSAP scroll animations." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/og_preview.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${servicesHubSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/custom-website-development
// =============================================================================
write(path.join(distDir, 'services/custom-website-development/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Custom Website Development &amp; Bespoke Design Services - PizzaScript</title>
  <meta name="description" content="Premium custom website developer Pune. Tailored website designs built from scratch with high-performance TSX. Zero template bloat, clean SEO code." />
  <meta name="keywords" content="Custom Website Development, Custom Website Developer, Bespoke Website Design, Custom Business Website" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/custom-website-development" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Custom Website Development &amp; Bespoke Design Services - PizzaScript" />
  <meta property="og:description" content="Premium custom website developer Pune. Tailored website designs built from scratch with high-performance TSX. Zero template bloat, clean SEO code." />
  <meta property="og:url" content="https://www.pizzascript.com/services/custom-website-development" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_react.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Custom Website Development &amp; Bespoke Design Services - PizzaScript" />
  <meta name="twitter:description" content="Premium custom website developer Pune. Tailored website designs built from scratch with high-performance TSX. Zero template bloat, clean SEO code." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_react.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${customWebsiteSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/business-websites
// =============================================================================
write(path.join(distDir, 'services/business-websites/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Professional Business Website Development Services - PizzaScript</title>
  <meta name="description" content="Premium business website design Pune. Increase conversions and credibility with bespoke company website layouts, secure contact forms, and local SEO integrations." />
  <meta name="keywords" content="Business Website Development, Professional Website Development, Company Website Design, Corporate Website Development" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/business-websites" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Professional Business Website Development Services - PizzaScript" />
  <meta property="og:description" content="Premium business website design Pune. Increase conversions and credibility with bespoke company website layouts, secure contact forms, and local SEO integrations." />
  <meta property="og:url" content="https://www.pizzascript.com/services/business-websites" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_ai.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Professional Business Website Development Services - PizzaScript" />
  <meta name="twitter:description" content="Premium business website design Pune. Increase conversions and credibility with bespoke company website layouts, secure contact forms, and local SEO integrations." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_ai.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${businessWebsitesSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/landing-page-development
// =============================================================================
write(path.join(distDir, 'services/landing-page-development/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Custom Landing Page Development Services - PizzaScript</title>
  <meta name="description" content="High-converting landing pages Pune. Boost your campaign ROI with fast, custom-coded landing page layouts, optimized CTA routing, and serverless form endpoints." />
  <meta name="keywords" content="Landing Page Development, Custom Landing Page Design, Campaign Landing Page, Lead Generation Website" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/landing-page-development" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Custom Landing Page Development Services - PizzaScript" />
  <meta property="og:description" content="High-converting landing pages Pune. Boost your campaign ROI with fast, custom-coded landing page layouts, optimized CTA routing, and serverless form endpoints." />
  <meta property="og:url" content="https://www.pizzascript.com/services/landing-page-development" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_animation.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Custom Landing Page Development Services - PizzaScript" />
  <meta name="twitter:description" content="High-converting landing pages Pune. Boost your campaign ROI with fast, custom-coded landing page layouts, optimized CTA routing, and serverless form endpoints." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_animation.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${landingPagesSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/website-redesign
// =============================================================================
write(path.join(distDir, 'services/website-redesign/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Professional Website Redesign &amp; Modernization Services - PizzaScript</title>
  <meta name="description" content="Premium website revamp Pune. Modernize outdated websites with custom React interfaces. UX improvements, speed optimizations, and SEO preservation." />
  <meta name="keywords" content="Website Redesign, Website Revamp, Website Modernization, Website Upgrade" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/website-redesign" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Professional Website Redesign &amp; Modernization Services - PizzaScript" />
  <meta property="og:description" content="Premium website revamp Pune. Modernize outdated websites with custom React interfaces. UX improvements, speed optimizations, and SEO preservation." />
  <meta property="og:url" content="https://www.pizzascript.com/services/website-redesign" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Professional Website Redesign &amp; Modernization Services - PizzaScript" />
  <meta name="twitter:description" content="Premium website revamp Pune. Modernize outdated websites with custom React interfaces. UX improvements, speed optimizations, and SEO preservation." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${websiteRedesignSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/seo-friendly-websites
// =============================================================================
write(path.join(distDir, 'services/seo-friendly-websites/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>SEO-Friendly Website Development &amp; Technical SEO Services - PizzaScript</title>
  <meta name="description" content="Premium SEO-friendly website design Pune. Increase organic search rankings with custom pre-rendered React pages, semantic schemas, and optimized crawl paths." />
  <meta name="keywords" content="SEO-Friendly Website Development, SEO Friendly Web Design, Technical SEO Developer, Search Engine Optimized Website" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/seo-friendly-websites" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="SEO-Friendly Website Development &amp; Technical SEO Services - PizzaScript" />
  <meta property="og:description" content="Premium SEO-friendly website design Pune. Increase organic search rankings with custom pre-rendered React pages, semantic schemas, and optimized crawl paths." />
  <meta property="og:url" content="https://www.pizzascript.com/services/seo-friendly-websites" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_seo.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="SEO-Friendly Website Development &amp; Technical SEO Services - PizzaScript" />
  <meta name="twitter:description" content="Premium SEO-friendly website design Pune. Increase organic search rankings with custom pre-rendered React pages, semantic schemas, and optimized crawl paths." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_seo.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${seoFriendlySchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/website-maintenance
// =============================================================================
write(path.join(distDir, 'services/website-maintenance/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Website Maintenance Services &amp; Technical Support - PizzaScript</title>
  <meta name="description" content="Premium website support Pune. Keep your custom web applications secure, fast, and up-to-date with 24/7 monitoring, backups, and staging deployments." />
  <meta name="keywords" content="Website Maintenance Services, Website Support Service, WordPress to React Support, Website Security Maintenance" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/website-maintenance" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Website Maintenance Services &amp; Technical Support - PizzaScript" />
  <meta property="og:description" content="Premium website support Pune. Keep your custom web applications secure, fast, and up-to-date with 24/7 monitoring, backups, and staging deployments." />
  <meta property="og:url" content="https://www.pizzascript.com/services/website-maintenance" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_deployment.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Website Maintenance Services &amp; Technical Support - PizzaScript" />
  <meta name="twitter:description" content="Premium website support Pune. Keep your custom web applications secure, fast, and up-to-date with 24/7 monitoring, backups, and staging deployments." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_deployment.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${websiteMaintenanceSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// SERVICE — https://www.pizzascript.com/services/website-speed-optimization
// =============================================================================
write(path.join(distDir, 'services/website-speed-optimization/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Website Speed Optimization Services | Core Web Vitals - PizzaScript</title>
  <meta name="description" content="Premium web performance optimization Pune. Boost loading speeds, achieve 100/100 Lighthouse scores, and optimize Core Web Vitals with custom code refactoring." />
  <meta name="keywords" content="Website Speed Optimization, Speed Up Website, Core Web Vitals Optimization, Lighthouse Score Optimizer" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/services/website-speed-optimization" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Website Speed Optimization Services | Core Web Vitals - PizzaScript" />
  <meta property="og:description" content="Premium web performance optimization Pune. Boost loading speeds, achieve 100/100 Lighthouse scores, and optimize Core Web Vitals with custom code refactoring." />
  <meta property="og:url" content="https://www.pizzascript.com/services/website-speed-optimization" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/service_performance.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Website Speed Optimization Services | Core Web Vitals - PizzaScript" />
  <meta name="twitter:description" content="Premium web performance optimization Pune. Boost loading speeds, achieve 100/100 Lighthouse scores, and optimize Core Web Vitals with custom code refactoring." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/service_performance.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${speedOptimizationSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// PORTFOLIO HUB — https://www.pizzascript.com/portfolio
// =============================================================================
write(path.join(distDir, 'portfolio/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Web Engineering Case Studies &amp; Portfolio - PizzaScript</title>
  <meta name="description" content="Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations." />
  <meta name="keywords" content="web development case study, react developer portfolio, custom frontend development, Pune web engineer portfolio" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/portfolio" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Web Engineering Case Studies &amp; Portfolio - PizzaScript" />
  <meta property="og:description" content="Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations." />
  <meta property="og:url" content="https://www.pizzascript.com/portfolio" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Web Engineering Case Studies &amp; Portfolio - PizzaScript" />
  <meta name="twitter:description" content="Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${portfolioSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// CASE STUDY — https://www.pizzascript.com/portfolio/my-design-academia
// =============================================================================
write(path.join(distDir, 'portfolio/my-design-academia/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>My Design Academia - High-Converting Educational Portal Case Study</title>
  <meta name="description" content="Case study on developing a responsive, SEO-optimized educational web portal built for student registration and conversions. Optimized paths and database queries." />
  <meta name="keywords" content="design portal website case study, custom PHP development, higher education web design" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/portfolio/my-design-academia" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="My Design Academia - High-Converting Educational Portal Case Study" />
  <meta property="og:description" content="Case study on developing a responsive, SEO-optimized educational web portal built for student registration and conversions. Optimized paths and database queries." />
  <meta property="og:url" content="https://www.pizzascript.com/portfolio/my-design-academia" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="My Design Academia - High-Converting Educational Portal Case Study" />
  <meta name="twitter:description" content="Case study on developing a responsive, SEO-optimized educational web portal built for student registration and conversions. Optimized paths and database queries." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${myDesignAcademiaSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);


// =============================================================================
// CASE STUDY — https://www.pizzascript.com/portfolio/orion-pharma-india
// =============================================================================
write(path.join(distDir, 'portfolio/orion-pharma-india/index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta -->
  <title>Orion Pharma India - High-Performance Pharmaceutical Platform Case Study</title>
  <meta name="description" content="Case study on developing a highly optimized corporate medical portal and international exporter directory. Built for global speed, compliance, and search visibility." />
  <meta name="keywords" content="pharma exporter website case study, custom medical portal development, seo friendly pharma site" />
  <meta name="author" content="Pizza Script">
  <meta name="theme-color" content="#1A0F08">

  <!-- Canonical -->
  <link rel="canonical" href="https://www.pizzascript.com/portfolio/orion-pharma-india" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Orion Pharma India - High-Performance Pharmaceutical Platform Case Study" />
  <meta property="og:description" content="Case study on developing a highly optimized corporate medical portal and international exporter directory. Built for global speed, compliance, and search visibility." />
  <meta property="og:url" content="https://www.pizzascript.com/portfolio/orion-pharma-india" />
  <meta property="og:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />
  <meta property="og:site_name" content="PizzaScript">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Orion Pharma India - High-Performance Pharmaceutical Platform Case Study" />
  <meta name="twitter:description" content="Case study on developing a highly optimized corporate medical portal and international exporter directory. Built for global speed, compliance, and search visibility." />
  <meta name="twitter:image" content="https://www.pizzascript.com/assets/images/case_study_mockup.png" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&amp;display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.css" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/jetbrains-mono@1.0.6/css/jetbrains-mono.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>

  <!-- Preconnect to CDN -->
  <link rel="preconnect" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev" crossorigin>

  <!-- Preload Critical Assets -->
  <link rel="preload" href="/assets/animations/pizza-glitch-animation.json" as="fetch" crossorigin="anonymous">
  <link rel="preload" href="https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/entry/frame_0001.webp" as="image">

  <!-- Critical Inline Styles for Preloader -->
  
  ${orionPharmaSchema}

  ${inlineStyles}
  ${viteScript}
  ${viteCSS}
</head>

${sharedBody}`);
