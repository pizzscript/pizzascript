import { useRef, useMemo, useState, useEffect } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 100;

export default function ToppingsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/toppings/frame_${String(index + 1).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'api';
    if (progress < 0.70) return 'db';
    return 'motion';
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
      id="toppings"
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
                <p className="cin-eyebrow sequence-mobile-eyebrow">Branding & Features</p>
                <h2 className="cin-heading sequence-mobile-heading font-serif font-bold">
                  Add the <span className="italic text-oven-orange">Flavours</span>
                </h2>
              </div>

              {/* Image Sequence Canvas (Landscape 16:9 box) */}
              <div className={`sequence-mobile-canvas ${stage === 'db' ? 'stage2-active' : ''} ${stage === 'motion' ? 'stage3-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>

              {/* Stage-Aware Paragraph with Title and Inline Icon */}
              <div className="sequence-mobile-stage-text">
                {stage === 'api' && (
                  <div className="sequence-mobile-stage-block" key="api-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                      <span>Dynamic APIs</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Fetching dynamic ingredients and content payloads in real time. We integrate server endpoints to deliver fresh database content instantly.
                    </p>
                  </div>
                )}
                {stage === 'db' && (
                  <div className="sequence-mobile-stage-block" key="db-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
                      </svg>
                      <span>Relational Schemas</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Mapping database records to structure ingredients correctly. Robust Prisma data modeling ensures fast queries and smooth relational data integrity.
                    </p>
                  </div>
                )}
                {stage === 'motion' && (
                  <div className="sequence-mobile-stage-block" key="motion-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      <span>Spring Animations</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Styling dynamic gestures and micro-transitions for premium feel. We apply fluid spring physics and hover states to hook users and elevate interface feel.
                    </p>
                  </div>
                )}
              </div>

              {/* Blueprint Card — fixed-height wrapper to prevent card jump */}
              <div className="sequence-mobile-blueprint">
                {stage === 'api' && (
                  <div className="blueprint-card html-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-smoke-light font-mono text-[9.5px]">api_fetcher.ts</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Fetching dynamic ingredients and content payloads in real time.
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> fetch(<span className="text-amber-200">'/api/toppings'</span>);</div>
                      <div><span className="text-purple-400">const</span> toppings = <span className="text-purple-400">await</span> res.json();</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/60 border border-stone-800 font-mono text-[9.5px] leading-none space-y-1">
                      <div className="flex justify-between border-b border-stone-900 pb-1.5 mb-1.5"><span className="text-green-500">[GET] /api/toppings</span><span className="text-stone-600">200ms</span></div>
                      <div className="text-stone-400 text-[9px] leading-none whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {`[{"id":"db_top_01","name":"Fresh Basil","quantity":12}]`}
                      </div>
                    </div>
                  </div>
                )}

                {stage === 'db' && (
                  <div className="blueprint-card css-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-oven-orange font-mono text-[9.5px]">schema.prisma</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Mapping database records to structure ingredients correctly.
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>model <span className="text-yellow-300">Topping</span> &#123;</div>
                      <div>&nbsp;&nbsp;id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">String</span>&nbsp;&nbsp;&nbsp;@id @default(uuid())</div>
                      <div>&nbsp;&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">String</span></div>
                      <div>&nbsp;&nbsp;quantity&nbsp;&nbsp;<span className="text-blue-300">Int</span></div>
                      <div>&#125;</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/40 border border-amber-900/20 font-mono text-[9.5px] space-y-1">
                      <div className="flex justify-between items-center text-amber-100 border-b border-amber-950/20 pb-1 mb-1">
                        <span className="font-bold">TABLE: toppings</span>
                        <span className="text-stone-600">PostgreSQL</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[9px] text-stone-400 leading-none">
                        <div>🔑 id [PK]</div><div className="text-right">"db_top_01"</div>
                        <div>🍕 name</div><div className="text-right">"Fresh Basil"</div>
                        <div>📦 quantity</div><div className="text-right">12</div>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 'motion' && (
                  <div className="blueprint-card js-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-cream font-mono text-[9.5px]">animation.ts</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Styling dynamic gestures and micro-transitions for premium feel.
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div><span className="text-orange-300">animate</span>(toppingElement, &#123;</div>
                      <div>&nbsp;&nbsp;y: [ -<span className="text-amber-200">200</span>, <span className="text-amber-200">0</span> ],</div>
                      <div>&nbsp;&nbsp;transition: &#123; type: <span className="text-amber-200">'spring'</span>, stiffness: <span className="text-amber-200">120</span> &#125;</div>
                      <div>&#125;);</div>
                    </div>
                    <div className="h-10 mt-2 relative bg-black/60 rounded border border-stone-800 flex items-end px-3 overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,248,240,0.05)" strokeDasharray="3,3" />
                        <path
                          d="M 0 35 Q 25 -10 50 25 T 75 20 T 100 20"
                          fill="none"
                          stroke="var(--color-oven-orange)"
                          strokeWidth="1.5"
                          className="animate-[dash_2s_infinite_linear]"
                        />
                      </svg>
                      <span className="absolute bottom-1 right-2 font-mono text-[8.5px] text-stone-500">bounce: 0.25</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ===== DESKTOP: Original 2-column grid layout ===== */
            <div className="container max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 lg:px-12 xl:px-16 w-full h-full py-0 flex flex-col lg:grid lg:grid-cols-[11fr_9fr] gap-3 lg:gap-16 justify-center items-center lg:items-center select-none overflow-hidden">

              {/* Left/Top Content Column */}
              <div className="flex flex-col space-y-3 lg:space-y-6 order-2 lg:order-2 w-full max-w-[320px] lg:max-w-none justify-start lg:justify-center py-1 lg:py-0">

                {/* Heading */}
                <div className="text-center lg:text-left">
                  <p className="cin-eyebrow text-[9px] lg:text-sm">Branding & Features</p>
                  <h2 className="cin-heading text-base lg:text-5xl xl:text-6xl font-serif font-bold leading-tight lg:leading-none">
                    Add the <span className="italic text-oven-orange">Flavours</span>
                  </h2>
                  <p className="cin-text text-sm lg:text-base xl:text-lg text-smoke-light hidden lg:block mt-3">
                    Layering key features onto your site. Custom API integrations, structured database schemas, and smooth spring physics animations placed with pinpoint precision.
                  </p>
                </div>

                {/* Desktop Steps Progress Tracker */}
                <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                  <div className={`progress-step ${stage === 'api' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Dynamic APIs</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Fetching dynamic ingredients and content payloads in real time.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'db' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Relational Schemas</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Mapping database records to structure ingredients correctly.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'motion' ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Spring Animations</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Styling dynamic gestures and micro-transitions for premium feel.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Left/Bottom Visual Column: visual container + desktop blueprint card */}
              <div className="flex flex-col justify-center space-y-4 lg:space-y-6 order-1 lg:order-1 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
                <div className={`visual-container w-full ${stage === 'db' ? 'css-active' : ''} ${stage === 'motion' ? 'js-active' : ''}`}>
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                </div>

                {/* Desktop Developer Cards (Desktop only) */}
                <div className="hidden lg:block w-full blueprint-wrapper">
                  {stage === 'api' && (
                    <div className="blueprint-card html-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-smoke-light font-mono text-[12px] lg:text-sm">api_fetcher.ts</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-orange-300">fetch</span>(<span className="text-amber-200">'/api/toppings'</span>);</div>
                        <div><span className="text-purple-400">const</span> toppings = <span className="text-purple-400">await res.json()</span>;</div>
                      </div>
                      {/* Mock API Terminal logs */}
                      <div className="p-3 rounded-lg bg-black/60 border border-stone-800/80 font-mono text-xs lg:text-[13px] space-y-1 text-stone-400">
                        <div className="flex justify-between">
                          <span className="text-green-500">[GET] /api/toppings/mozzarella</span>
                          <span className="text-stone-600">200ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-500">[GET] /api/toppings/pepperoni</span>
                          <span className="text-stone-600">180ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-500">[GET] /api/toppings/fresh_basil</span>
                          <span className="text-stone-600">120ms</span>
                        </div>
                        <div className="pt-1.5 border-t border-stone-900 text-stone-500 text-[11px] lg:text-[12px]">
                          Response payload loaded. Status: OK.
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'db' && (
                    <div className="blueprint-card css-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-oven-orange font-mono text-[12px] lg:text-sm">schema.prisma</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div>model <span className="text-yellow-300">Topping</span> &#123;</div>
                        <div>&nbsp;&nbsp;id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">String</span>&nbsp;&nbsp;&nbsp;@id @default(uuid())</div>
                        <div>&nbsp;&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">String</span></div>
                        <div>&nbsp;&nbsp;quantity&nbsp;&nbsp;<span className="text-blue-300">Int</span></div>
                        <div>&#125;</div>
                      </div>
                      {/* Database node layout */}
                      <div className="p-3 rounded-lg bg-black/40 border border-amber-900/20 font-mono text-xs lg:text-[13px] space-y-2">
                        <div className="flex justify-between items-center text-amber-100">
                          <span className="font-bold">TABLE: toppings</span>
                          <span className="text-stone-600">PostgreSQL</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[11px] lg:text-[12px] text-stone-400">
                          <div>🔑 id [PK]</div>
                          <div className="text-right">"db_top_01"</div>
                          <div>🍕 name</div>
                          <div className="text-right">"Fresh Basil"</div>
                          <div>📦 quantity</div>
                          <div className="text-right">12</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'motion' && (
                    <div className="blueprint-card js-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-cream font-mono text-[12px] lg:text-sm">animation.ts</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div><span className="text-orange-300">animate</span>(toppingElement, &#123;</div>
                        <div>&nbsp;&nbsp;y: [ -<span className="text-amber-200">200</span>, <span className="text-amber-200">0</span> ],</div>
                        <div>&nbsp;&nbsp;transition: &#123; type: <span className="text-amber-200">'spring'</span>, stiffness: <span className="text-amber-200">120</span> &#125;</div>
                        <div>&#125;);</div>
                      </div>
                      {/* Graph visualization */}
                      <div className="h-16 relative bg-black/60 rounded border border-stone-800 flex items-end px-4 overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          {/* Grid lines */}
                          <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,248,240,0.05)" strokeDasharray="3,3" />
                          {/* Easing spring curve */}
                          <path
                            d="M 0 35 Q 25 -10 50 25 T 75 20 T 100 20"
                            fill="none"
                            stroke="var(--color-oven-orange)"
                            strokeWidth="2"
                            className="animate-[dash_2s_infinite_linear]"
                          />
                        </svg>
                        <span className="absolute bottom-2 right-3 font-mono text-[10px] text-stone-500">bounce: 0.25</span>
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
