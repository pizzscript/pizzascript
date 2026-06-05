import { useRef, useMemo, useState, useEffect } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 100;
const FRAME_OFFSET = 1; // frames start at frame_0001.webp

export default function DoughSection() {
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
    if (progress < 0.35) return 'html';
    if (progress < 0.70) return 'css';
    return 'js';
  }, [progress]);

  // Detect desktop vs mobile for conditional rendering (single canvas ref)
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
      id="dough"
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
                <p className="cin-eyebrow sequence-mobile-eyebrow">The Foundation</p>
                <h2 className="cin-heading sequence-mobile-heading font-serif font-bold">
                  Watch the <span className="italic text-oven-orange">Dough Rise</span>
                </h2>
              </div>

              {/* Image Sequence Canvas (Landscape 16:9 box) */}
              <div className={`sequence-mobile-canvas ${stage === 'css' ? 'stage2-active' : ''} ${stage === 'js' ? 'stage3-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>

              {/* Stage-Aware Paragraph with Title and Inline Icon */}
              <div className="sequence-mobile-stage-text">
                {stage === 'html' && (
                  <div className="sequence-mobile-stage-block" key="html-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                      </svg>
                      <span>HTML Structure</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Forming the raw, semantic bones and wireframe skeleton. Every great website starts
                      with a solid HTML foundation — structuring content with meaning and purpose.
                    </p>
                  </div>
                )}
                {stage === 'css' && (
                  <div className="sequence-mobile-stage-block" key="css-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122A3 3 0 0 0 12.879 17l4.99-4.997a3 3 0 0 0 0-4.244L12.88 2.77a3 3 0 0 0-4.243 0L3.647 7.763a3 3 0 0 0 0 4.244l1.282 1.283A16.2 16.2 0 0 0 9.53 16.12Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.5 11.5 3 3L17 19l-3-3" />
                      </svg>
                      <span>CSS Styling</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Styling layouts, adding warm ambient themes and aesthetics. We layer color, spacing,
                      and typography to transform bare markup into a visual masterpiece.
                    </p>
                  </div>
                )}
                {stage === 'js' && (
                  <div className="sequence-mobile-stage-block" key="js-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      <span>JavaScript Interactivity</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Breathing dynamic life and reactive pulses into the website. Interactions, animations,
                      and real-time behavior bring every element to life.
                    </p>
                  </div>
                )}
              </div>

              {/* Blueprint Card — fixed-height wrapper to prevent card jump */}
              <div className="sequence-mobile-blueprint">
                {stage === 'html' && (
                  <div className="blueprint-card html-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-smoke-light font-mono text-[9.5px]">index.html</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      &lt;!-- Forming the raw, semantic bones and wireframe skeleton. --&gt;
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>&lt;<span className="text-orange-400">div</span> class=<span className="text-amber-200">"pizza-box"</span>&gt;</div>
                      <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">h1</span>&gt;PizzaScript&lt;/<span className="text-orange-400">h1</span>&gt;</div>
                      <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">button</span>&gt;Order&lt;/<span className="text-orange-400">button</span>&gt;</div>
                      <div>&lt;/<span className="text-orange-400">div</span>&gt;</div>
                    </div>
                    <div className="mt-2 border border-dashed border-stone-800 p-2 text-center rounded text-stone-500 font-bold uppercase tracking-wider text-[9.5px] leading-none">
                      [ Raw Wireframe Skeleton ]
                    </div>
                  </div>
                )}

                {stage === 'css' && (
                  <div className="blueprint-card css-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-oven-orange font-mono text-[9.5px]">style.css</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      /* Styling layouts, adding warm ambient themes and aesthetics. */
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div><span className="text-amber-200">.pizza-box</span> &#123;</div>
                      <div>&nbsp;&nbsp;<span className="text-orange-400">background</span>: var(--cream);</div>
                      <div>&nbsp;&nbsp;<span className="text-orange-400">border-radius</span>: 24px;</div>
                      <div>&nbsp;&nbsp;<span className="text-orange-400">color</span>: var(--charcoal);</div>
                      <div>&#125;</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-[#FFF8F0] text-stone-900 border border-amber-200/50 flex flex-col justify-between items-center transition-all duration-300 leading-none">
                      <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                        <span className="font-serif font-bold text-stone-800 text-[11px] leading-none">PizzaScript</span>
                        <span className="text-stone-500 text-[10px] leading-none">Menu</span>
                      </div>
                      <span className="text-[9.5px] text-stone-500 uppercase tracking-widest leading-none">Handcrafted Polish Applied</span>
                      <button className="mt-1.5 px-2 py-0.5 text-[9.5px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider leading-none">Order</button>
                    </div>
                  </div>
                )}

                {stage === 'js' && (
                  <div className="blueprint-card js-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-cream font-mono text-[9.5px]">app.js</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Breathing dynamic life and reactive pulses into the website.
                    </div>
                    <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[10px]">
                      <div>btn.addEventListener(<span className="text-amber-200">'click'</span>, () =&gt; &#123;</div>
                      <div>&nbsp;&nbsp;<span className="text-blue-300">oven</span>.ignite();</div>
                      <div>&nbsp;&nbsp;<span className="text-orange-300">animateDough</span>();</div>
                      <div>&#125;);</div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-[#FFF8F0] text-stone-900 border-2 border-[#E87040] flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300 leading-none">
                      <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                        <span className="font-serif font-bold text-stone-800 text-[11px] leading-none">PizzaScript</span>
                        <span className="text-stone-500 text-[10px] leading-none">Menu</span>
                      </div>
                      <span className="text-[9.5px] text-stone-500 uppercase tracking-widest font-semibold text-orange-600 leading-none">Interactivity Active</span>
                      <button className="mt-1.5 px-2 py-0.5 text-[9.5px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider relative overflow-hidden leading-none">
                        Order
                        <span className="absolute inset-0 bg-white/20 animate-ping rounded" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ===== DESKTOP: Original 2-column grid layout ===== */
            <div className="container max-w-7xl lg:max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 lg:px-12 xl:px-16 w-full h-full py-0 grid grid-cols-[9fr_11fr] gap-16 items-center select-none overflow-hidden">

              {/* Left Content Column */}
              <div className="flex flex-col space-y-6 justify-center">

                {/* Heading */}
                <div className="text-left">
                  <p className="cin-eyebrow text-sm">The Foundation</p>
                  <h2 className="cin-heading text-5xl xl:text-6xl font-serif font-bold leading-none">
                    Watch the <span className="italic text-oven-orange">Dough Rise</span>
                  </h2>
                  <p className="cin-text text-base xl:text-lg text-smoke-light block mt-3">
                    Every great website starts with a solid foundation. We knead each layer with care,
                    letting the HTML, CSS, and JavaScript elements rise naturally into an interactive masterpiece.
                  </p>
                </div>

                {/* Steps Progress Tracker */}
                <div className="progress-steps flex flex-col gap-3">
                  <div className={`progress-step ${stage === 'html' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <div className="step-details">
                      <h3 className="step-title text-base xl:text-lg">HTML Structure</h3>
                      <p className="step-desc text-sm xl:text-base">Forming the raw, semantic bones and wireframe skeleton.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'css' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <div className="step-details">
                      <h3 className="step-title text-base xl:text-lg">CSS Styling</h3>
                      <p className="step-desc text-sm xl:text-base">Styling layouts, adding warm ambient themes and aesthetics.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'js' ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <div className="step-details">
                      <h3 className="step-title text-base xl:text-lg">JavaScript Interactivity</h3>
                      <p className="step-desc text-sm xl:text-base">Breathing dynamic life and reactive pulses into the website.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Visual Column */}
              <div className="flex flex-col justify-center space-y-10 mobile-canvas-top w-full">
                <div className={`visual-container w-full ${stage === 'css' ? 'css-active' : ''} ${stage === 'js' ? 'js-active' : ''}`}>
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                </div>

                {/* Desktop Blueprint Cards */}
                <div className="w-full blueprint-wrapper">
                  {stage === 'html' && (
                    <div className="blueprint-card html-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-smoke-light font-mono text-[12px] lg:text-sm">index.html</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div><span className="text-orange-400">&lt;div</span> class=<span className="text-amber-200">"pizza-box"</span><span className="text-orange-400">&gt;</span></div>
                        <div>&nbsp;&nbsp;<span className="text-orange-400">&lt;h1&gt;</span>PizzaScript<span className="text-orange-400">&lt;/h1&gt;</span></div>
                        <div>&nbsp;&nbsp;<span className="text-orange-400">&lt;button&gt;</span>Order<span className="text-orange-400">&lt;/button&gt;</span></div>
                        <div><span className="text-orange-400">&lt;/div&gt;</span></div>
                      </div>
                      <div className="mt-4 border border-dashed border-stone-800 p-4 text-center rounded text-stone-500 font-bold uppercase tracking-wider text-xs lg:text-sm">
                        [ Raw Wireframe Skeleton ]
                      </div>
                    </div>
                  )}

                  {stage === 'css' && (
                    <div className="blueprint-card css-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-oven-orange font-mono text-[12px] lg:text-sm">style.css</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div><span className="text-amber-200">.pizza-box</span> &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-orange-400">background</span>: var(--color-cream);</div>
                        <div>&nbsp;&nbsp;<span className="text-orange-400">border-radius</span>: 24px;</div>
                        <div>&nbsp;&nbsp;<span className="text-orange-400">color</span>: var(--color-charcoal);</div>
                        <div>&#125;</div>
                      </div>
                      <div className="mt-4 p-4 rounded-xl bg-[#FFF8F0] text-stone-900 border border-amber-200/50 flex flex-col justify-between items-center transition-all duration-300">
                        <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                          <span className="font-serif font-bold text-stone-800 text-[13px] lg:text-[15px]">PizzaScript</span>
                          <span className="text-stone-500 text-[11px] lg:text-[12px]">Menu</span>
                        </div>
                        <span className="text-[11px] lg:text-[12px] text-stone-500 uppercase tracking-widest">Handcrafted Polish Applied</span>
                        <button className="mt-2.5 px-3 py-1 text-[11px] lg:text-[12px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider">Order</button>
                      </div>
                    </div>
                  )}

                  {stage === 'js' && (
                    <div className="blueprint-card js-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-cream font-mono text-[12px] lg:text-sm">app.js</span>
                      </div>
                      <div className="font-mono text-stone-400 space-y-0.5 mb-3 text-xs lg:text-[13px]">
                        <div>btn.<span className="text-orange-300">addEventListener</span>(<span className="text-amber-200">'click'</span>, () =&gt; &#123;</div>
                        <div>&nbsp;&nbsp;<span className="text-blue-300">oven</span>.<span className="text-orange-300">ignite</span>();</div>
                        <div>&nbsp;&nbsp;<span className="text-orange-300">animateDough</span>();</div>
                        <div>&#125;);</div>
                      </div>
                      <div className="mt-4 p-4 rounded-xl bg-[#FFF8F0] text-stone-900 border-2 border-[#E87040] flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300">
                        <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                          <span className="font-serif font-bold text-stone-800 text-[13px] lg:text-[15px]">PizzaScript</span>
                          <span className="text-stone-500 text-[11px] lg:text-[12px]">Menu</span>
                        </div>
                        <span className="text-[11px] lg:text-[12px] text-stone-500 uppercase tracking-widest font-semibold text-orange-600">Interactivity Active</span>
                        <button className="mt-2.5 px-3 py-1 text-[11px] lg:text-[12px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider relative overflow-hidden">
                          Order
                          <span className="absolute inset-0 bg-white/20 animate-ping rounded" />
                        </button>
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
