import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/schema';

interface StudyData {
  title: string;
  desc: string;
  keywords: string;
  category: string;
  duration: string;
  metric: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  liveUrl?: string;
}

const DATA: Record<string, StudyData> = {
  'my-design-academia': {
    title: 'My Design Academia - High-Converting Educational Portal',
    desc: 'Case study on developing a responsive, SEO-optimized educational web portal built for student registration and conversions. Optimized paths and database queries.',
    keywords: 'design portal website case study, custom PHP development, higher education web design',
    category: 'Full-Stack Development / SEO',
    duration: '5 Weeks',
    metric: '99% SEO Index Rate',
    client: 'Design Academia Institute',
    challenge: 'The client needed an accessible portal to drive admissions. The existing WordPress site suffered from slow load times (>4.5s), rendering failures on mobile screens, and a complex enrollment checkout route.',
    solution: 'We engineered a bespoke, lightweight system using optimized code pathways and semantic templates. We restructured the registration form into a multi-step component, cleaned up asset requests, and wrote strict canonical markup.',
    results: [
      'Largest Contentful Paint reduced from 4.5s to 1.1s.',
      'Mobile conversion rates increased by 42% in the first 60 days.',
      '100% of target service pages indexed on the first search engine crawl wave.',
      'Eliminated layout shift (CLS score reduced to 0.01).'
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SEO', 'MySQL'],
    liveUrl: 'https://mydesignacademia.com/'
  },
  'orion-pharma-india': {
    title: 'Orion Pharma India - High-Performance Pharmaceutical Platform',
    desc: 'Case study on developing a highly optimized corporate medical portal and international exporter directory. Built for global speed, compliance, and search visibility.',
    keywords: 'pharma exporter website case study, custom medical portal development, seo friendly pharma site',
    category: 'Corporate Website / SEO',
    duration: '4 Weeks',
    metric: '100% Mobile Responsiveness',
    client: 'Orion Pharma India',
    challenge: 'The existing corporate website suffered from outdated templates, non-responsive layouts on mobile viewports, slow loading speeds across global networks, and poor SEO indexing of critical pharma catalogs.',
    solution: 'We redesigned the website into a modern, lightning-fast responsive interface. We optimized catalog tables, added high-performance metadata tags, and simplified inquiry pathways for international clients.',
    results: [
      'Page load times reduced globally by 65%.',
      'Achieved 100% responsive test completion across all major mobile/tablet devices.',
      'Streamlined catalog layout leading to a 35% increase in international inquiries.',
      'All key drug category landing pages successfully indexed on major search engines.'
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Responsive'],
    liveUrl: 'https://www.orionpharmaindia.org/'
  }
};

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? DATA[slug] : null;

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0604] text-cream relative z-10 font-mono">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">CASE STUDY NOT FOUND</h1>
          <Link to="/portfolio" className="text-oven-orange hover:underline">&larr; Return to Portfolio</Link>
        </div>
      </div>
    );
  }

  const studyUrl = `https://www.pizzascript.com/portfolio/${slug}`;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pizzascript.com' },
    { name: 'Portfolio', url: 'https://www.pizzascript.com/portfolio' },
    { name: study.title, url: studyUrl }
  ]);

  return (
    <>
      <SEO
        title={study.title}
        description={study.desc}
        keywords={study.keywords}
        canonicalUrl={`/portfolio/${slug}`}
        ogImage="/assets/images/case_study_mockup.png"
        schema={breadcrumbSchema}
      />

      <div className="min-h-screen pt-36 lg:pt-44 pb-16 px-4 md:px-12 lg:px-24 text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[10px] font-mono text-stone-500 uppercase mb-8 tracking-widest">
            <Link to="/" className="hover:text-oven-orange transition-colors">HOME</Link> / <Link to="/portfolio" className="hover:text-oven-orange transition-colors">PORTFOLIO</Link> / <span className="text-oven-orange">{slug?.toUpperCase()}</span>
          </div>

          {/* Split Hero Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Heading & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <span className="cin-eyebrow text-xs tracking-widest block uppercase">// {study.category}</span>
              <h1 className="cin-heading text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {study.title}
              </h1>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-white/5 font-mono text-xs">
                <div>
                  <span className="text-stone-500 block uppercase">Client</span>
                  <span className="text-stone-300 font-bold mt-1 block">{study.client}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">Duration</span>
                  <span className="text-stone-300 font-bold mt-1 block">{study.duration}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">Key Metric</span>
                  <span className="text-oven-orange font-bold mt-1 block">{study.metric}</span>
                </div>
                <div>
                  <span className="text-stone-500 block uppercase">Live Status</span>
                  {study.liveUrl ? (
                    <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold mt-1 block hover:underline">
                      Active Link &nearr;
                    </a>
                  ) : (
                    <span className="text-stone-400 font-bold mt-1 block">Local Build</span>
                  )}
                </div>
              </div>

              {/* Tags block */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block mb-3">Technologies Deployed</span>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span key={tag} className="portfolio-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Container */}
            <div className="lg:col-span-5">
              <div className="visual-container">
                <img 
                  src="/assets/images/case_study_mockup.png" 
                  alt={`${study.title} Laptop Mockup`} 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Description Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t border-white/5 pt-12">
            <div className="blueprint-card p-8">
              <h2 className="text-2xl font-serif font-bold text-cream mb-4">
                The Engineering Challenge
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="blueprint-card p-8">
              <h2 className="text-2xl font-serif font-bold text-cream mb-4">
                Our Solution Strategy
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Results block */}
          <div className="mt-16 blueprint-card p-8">
            <h2 className="text-2xl font-serif font-bold text-cream mb-6">
              Measurable Performance Results
            </h2>
            <ul className="space-y-4">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-300">
                  <span className="text-oven-orange font-mono font-bold mt-0.5">//</span>
                  <span className="text-sm leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Back link */}
          <div className="mt-24 pt-8 border-t border-white/5 flex justify-between items-center">
            <Link to="/portfolio" className="text-stone-400 hover:text-cream font-mono text-xs">
              &larr; BACK TO PORTFOLIO
            </Link>
            <Link to="/#order" className="bg-oven-orange hover:bg-oven-orange/95 text-black font-semibold font-mono text-xs px-6 py-3.5 rounded-lg transition-colors uppercase tracking-wider">
              Start A Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
