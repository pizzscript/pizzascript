import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { portfolioItems } from '../data/portfolio';
import { getBreadcrumbSchema } from '../utils/schema';

// We map the items to add slugs for internal routing
const CASE_STUDIES = portfolioItems.map(item => {
  const slug = item.realName.trim().toLowerCase().replace(/\s+/g, '-');
  return {
    ...item,
    slug,
    title: item.realName.trim(),
    category: item.tags.slice(0, 3).join(' / '),
    metrics: item.tags.includes('SEO') ? '99% SEO Index Rate' : '60 FPS Transitions',
  };
});

export default function PortfolioHub() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Portfolio', url: 'https://www.pizzascript.com/portfolio' }
  ]);

  return (
    <>
      <SEO
        title="Web Engineering Case Studies & Portfolio"
        description="Explore our web development and engineering case studies. High-performance React applications, custom layouts, technical SEO audits, and speed optimizations."
        keywords="web development case study, react developer portfolio, custom frontend development, Pune web engineer portfolio"
        canonicalUrl="/portfolio"
        schema={breadcrumbSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest text-center md:text-left">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <span className="text-oven-orange">PORTFOLIO</span>
          </div>

          {/* Header */}
          <div className="text-center md:text-left mb-16 max-w-3xl">
            <span className="cin-eyebrow text-xs tracking-widest block uppercase mb-2">// Case Studies</span>
            <h1 className="cin-heading text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Our Web <span className="italic text-oven-orange">Engineering</span> Portfolio
            </h1>
            <p className="cin-text text-stone-400 text-base mt-6 leading-relaxed">
              Explore the technical implementation reports for our projects. We detail our architectural decisions, Core Web Vitals optimization curves, and client conversion results.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CASE_STUDIES.map((study) => (
              <div 
                key={study.slug}
                className="portfolio-card flex flex-col justify-between"
              >
                {/* Visual Cover */}
                <div className="portfolio-card__image">
                  <img 
                    src="/assets/images/case_study_mockup.png" 
                    alt={study.imageAlt} 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 border border-stone-800 text-[10px] font-mono tracking-widest text-cream uppercase px-2.5 py-1 rounded">
                    {study.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="portfolio-card__body flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">Project Report</span>
                    <h2 className="portfolio-card__title mt-2">
                      <Link to={`/portfolio/${study.slug}`}>{study.title}</Link>
                    </h2>
                    <span className="portfolio-card__subtitle block mt-1">{study.category}</span>
                    <p className="portfolio-card__desc mt-3">
                      {study.description}
                    </p>
                  </div>

                  <div className="portfolio-card__meta mt-6 pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-stone-500 uppercase">Duration</span>
                      <span className="text-xs font-mono text-stone-300 mt-1">{study.duration}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-mono text-stone-500 uppercase">Primary Metric</span>
                      <span className="text-xs font-mono text-oven-orange mt-1">{study.metrics}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link 
                      to={`/portfolio/${study.slug}`} 
                      className="w-full text-center block bg-oven-orange hover:bg-oven-orange/95 text-black font-semibold font-mono text-xs py-3.5 rounded-lg transition-colors uppercase tracking-wider"
                    >
                      READ CASE STUDY
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
