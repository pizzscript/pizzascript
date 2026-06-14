import { useRef, useMemo, useState, useEffect } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 100;
const FRAME_OFFSET = 1; // Reuse the dough rising image sequence

export default function AromaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/dough/frame_${String(index + FRAME_OFFSET).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'meta';
    if (progress < 0.70) return 'schema';
    return 'og';
  }, [progress]);

  // Detect desktop vs mobile for conditional rendering
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Recalculate ScrollTrigger positions on desktop/mobile layout switch
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  return (
    <section
      id="aroma"
      className="sequence-scroll-driver cin-bg-dark border-t border-brown-800/10"
      ref={sectionRef}
    >
      <div className="sequence-sticky">
        <div className="w-full h-full flex items-center justify-center">

          {!isDesktop ? (
            /* ===== MOBILE: Single Unified Card ===== */
            <div className="sequence-mobile-card">
              {/* Eyebrow + Heading */}
              <div className="sequence-mobile-header">
                <p className="cin-eyebrow sequence-mobile-eyebrow">SEO & Visibility</p>
                <h2 className="cin-heading sequence-mobile-heading font-serif font-bold">
                  The Wafting <span className="italic text-oven-orange">Aroma!</span>
                </h2>
              </div>

              {/* Image Sequence Canvas (Landscape 16:9 box) */}
              <div className={`sequence-mobile-canvas ${stage === 'schema' ? 'stage2-active' : ''} ${stage === 'og' ? 'stage3-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>

              {/* Stage-Aware Paragraph with Title and Inline Icon */}
              <div className="sequence-mobile-stage-text">
                {stage === 'meta' && (
                  <div className="sequence-mobile-stage-block" key="meta-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      </svg>
                      <span>Metadata Recipe</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Crafting meta titles and tags to describe the delicious page to crawlers. Precise meta tags improve search rankings and indexability.
                    </p>
                  </div>
                )}
                {stage === 'schema' && (
                  <div className="sequence-mobile-stage-block" key="schema-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6zM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25z" />
                      </svg>
                      <span>Structured Spices</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Adding structured JSON-LD recipe markup so Google can index details. Rich search snippets display stars, prices, and status directly in search results.
                    </p>
                  </div>
                )}
                {stage === 'og' && (
                  <div className="sequence-mobile-stage-block" key="og-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185z" />
                      </svg>
                      <span>Social Wafting</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Configuring Open Graph preview cards to invite social clicks organically. Eye-catching titles and thumbnail images make shares stand out on social feeds.
                    </p>
                  </div>
                )}
              </div>

              {/* Blueprint Card — fixed-height wrapper to prevent card jump */}
              <div className="sequence-mobile-blueprint">
                {stage === 'meta' && (
                  <div className="blueprint-card html-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-smoke-light font-mono text-[9.5px]">meta_tags.html</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      &lt;!-- Crafting meta titles and descriptions to describe the delicious page. --&gt;
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>&lt;<span className="text-orange-400">title</span>&gt;PizzaScript - Hand-Crafted Web Design&lt;/<span className="text-orange-400">title</span>&gt;</div>
                      <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"description"</span> content=<span className="text-amber-200">"Served hot..."</span> /&gt;</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 font-mono text-[9.5px] leading-tight space-y-1">
                      <div className="flex justify-between items-center text-stone-500 text-[8px] border-b border-stone-900 pb-0.5 mb-0.5">
                        <span>GOOGLE RESULT</span>
                        <span className="text-green-500 font-bold">100% SEO</span>
                      </div>
                      <div className="text-blue-400 font-serif text-[10px] font-bold leading-tight">PizzaScript — Hand-Crafted Web</div>
                      <div className="text-green-600 text-[8px]">https://www.pizzascript.com</div>
                    </div>
                  </div>
                )}

                {stage === 'schema' && (
                  <div className="blueprint-card css-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-oven-orange font-mono text-[9.5px]">structured_data.json</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      /* Adding structured JSON-LD data so crawlers can digest our page recipes. */
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>&#123;</div>
                      <div>&nbsp;&nbsp;<span className="text-blue-300">"@context"</span>: <span className="text-amber-200">"https://schema.org"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="text-blue-300">"@type"</span>: <span className="text-amber-200">"Restaurant"</span></div>
                      <div>&#125;</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/40 border border-amber-900/20 font-mono text-[9.5px] space-y-1">
                      <div className="flex justify-between items-center text-amber-100 border-b border-amber-950/20 pb-0.5 mb-0.5">
                        <span className="font-bold">SCHEMA VALIDATOR</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[8.5px] text-stone-400 leading-none">
                        <div>🔍 Type</div><div className="text-right">"Restaurant"</div>
                        <div>🍕 Rating</div><div className="text-right">"5.0 (48 reviews)"</div>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 'og' && (
                  <div className="blueprint-card js-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-cream font-mono text-[9.5px]">open_graph.html</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      &lt;!-- Configuring social preview cards so link shares attract organic visitors. --&gt;
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:title"</span> content=<span className="text-amber-200">"PizzaScript..."</span> /&gt;</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 font-mono text-[9.5px] space-y-1.5">
                      <div className="border border-stone-800 rounded bg-[#FFF8F0]/5 overflow-hidden flex">
                        <div className="w-10 h-8 bg-amber-950/20 border-r border-stone-800 flex items-center justify-center text-[8px] text-oven-orange">
                          IMG
                        </div>
                        <div className="p-1 flex-1 flex flex-col justify-center leading-tight">
                          <div className="text-stone-300 text-[9px] font-bold truncate">PizzaScript — Hand-Crafted Web</div>
                          <div className="text-stone-500 text-[8px] truncate">A delicious aroma of clean code...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ===== DESKTOP: Original 2-column grid layout ===== */
            <div className="container max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 lg:px-12 xl:px-16 w-full h-full py-0 flex flex-col lg:grid lg:grid-cols-[9fr_11fr] gap-3 lg:gap-16 justify-center items-center lg:items-center select-none overflow-hidden">

              {/* Left/Top Content Column */}
              <div className="flex flex-col space-y-3 lg:space-y-6 order-2 lg:order-1 w-full max-w-[320px] lg:max-w-none justify-start lg:justify-center py-1 lg:py-0">

                {/* Heading */}
                <div className="text-center lg:text-left">
                  <p className="cin-eyebrow text-[9px] lg:text-sm">SEO & Visibility</p>
                  <h2 className="cin-heading text-base lg:text-5xl xl:text-6xl font-serif font-bold leading-tight lg:leading-none">
                    The Wafting <span className="italic text-oven-orange">Aroma!</span>
                  </h2>
                  <p className="cin-text text-sm lg:text-base xl:text-lg text-smoke-light hidden lg:block mt-3">
                    The best pizza in town means nothing if nobody knows the kitchen exists.
                    Search engine optimization is the aroma after we serve the pizza, spreading
                    clean metadata, rich snippets, and open-graph cards to attract hungry clicks naturally.
                  </p>
                </div>

                {/* Steps Progress Tracker */}
                <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                  <div className={`progress-step ${stage === 'meta' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Metadata Recipe</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Crafting meta titles and tags to describe the delicious page to crawlers.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'schema' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Structured Spices</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Adding structured JSON-LD recipe markup so Google can index details.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'og' ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Social Wafting</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Configuring Open Graph preview cards to invite social clicks organically.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right/Bottom Visual Column: visual container + desktop blueprint card */}
              <div className="flex flex-col justify-center space-y-10 order-1 lg:order-2 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
                <div className={`visual-container w-full ${stage === 'schema' ? 'css-active' : ''} ${stage === 'og' ? 'js-active' : ''}`}>
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                </div>

                {/* Desktop Blueprint Cards (Desktop only) */}
                <div className="hidden lg:block w-full blueprint-wrapper">
                  {stage === 'meta' && (
                    <div className="blueprint-card html-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-smoke-light font-mono text-[12px] lg:text-sm">meta_tags.html</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div>&lt;<span className="text-orange-400">title</span>&gt;PizzaScript - Hand-Crafted Web Design&lt;/<span className="text-orange-400">title</span>&gt;</div>
                        <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"description"</span> content=<span className="text-amber-200">"Served hot to the edge..."</span> /&gt;</div>
                        <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"keywords"</span> content=<span className="text-amber-200">"react, vite, nextjs"</span> /&gt;</div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-black/40 border border-stone-855 font-mono text-xs lg:text-[13px] space-y-1">
                        <div className="flex justify-between items-center text-stone-500 text-xs lg:text-[11px] border-b border-stone-900 pb-1 mb-1">
                          <span>GOOGLE SEARCH RESULTS</span>
                          <span className="text-green-500 font-bold">100% SEO</span>
                        </div>
                        <div className="text-blue-400 hover:underline font-serif text-xs lg:text-[13px] font-bold leading-tight">PizzaScript — Hand-Crafted Web Design</div>
                        <div className="text-green-600 text-xs lg:text-[11px]">https://www.pizzascript.com</div>
                        <div className="text-stone-400 text-xs lg:text-[11px] leading-tight">Served hot to the edge. We build fast, high-converting websites using React and Tailwind CSS.</div>
                      </div>
                    </div>
                  )}

                  {stage === 'schema' && (
                    <div className="blueprint-card css-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-oven-orange font-mono text-[12px] lg:text-sm">structured_data.json</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div>&#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-300">"@context"</span>: <span className="text-amber-200">"https://schema.org"</span>,</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-300">"@type"</span>: <span className="text-amber-200">"Restaurant"</span>,</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-300">"name"</span>: <span className="text-amber-200">"PizzaScript website"</span></div>
                        <div>&#125;</div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-black/40 border border-amber-900/20 font-mono text-xs lg:text-[13px] space-y-2">
                        <div className="flex justify-between items-center text-amber-100 border-b border-amber-950/20 pb-1 mb-1">
                          <span className="font-bold">SCHEMA VALIDATOR</span>
                          <span className="text-stone-600">JSON-LD</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs lg:text-[12px] text-stone-400">
                          <div>🔍 Type</div><div className="text-right">"Restaurant"</div>
                          <div>🍕 Rating</div><div className="text-right">"5.0 (48 reviews)"</div>
                          <div>📍 AreaServed</div><div className="text-right">"Global Edge"</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'og' && (
                    <div className="blueprint-card js-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-cream font-mono text-[12px] lg:text-sm">open_graph.html</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div>&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:title"</span> content=<span className="text-amber-200">"PizzaScript Website"</span> /&gt;</div>
                        <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:image"</span> content=<span className="text-amber-200">"aroma_preview.png"</span> /&gt;</div>
                        <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:type"</span> content=<span className="text-amber-200">"website"</span> /&gt;</div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-black/40 border border-stone-850 font-mono text-xs lg:text-[13px] space-y-2">
                        <div className="flex justify-between items-center text-stone-500 text-xs lg:text-[11px] border-b border-stone-900 pb-1 mb-1">
                          <span>SOCIAL CARD PREVIEW</span>
                          <span>OpenGraph</span>
                        </div>
                        <div className="border border-stone-800 rounded bg-[#FFF8F0]/5 overflow-hidden flex">
                          <div className="w-16 h-12 bg-amber-950/20 border-r border-stone-800 flex items-center justify-center text-xs lg:text-[10px] text-oven-orange">
                            IMAGE
                          </div>
                          <div className="p-1.5 flex-1 flex flex-col justify-center leading-tight">
                            <div className="text-stone-300 text-xs lg:text-[12px] font-bold">PizzaScript — Hand-Crafted Web</div>
                            <div className="text-stone-500 text-xs lg:text-[10px] truncate">A delicious aroma of clean code...</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
