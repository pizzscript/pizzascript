import { useRef, useMemo, useState, useEffect } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 100;

export default function BakingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/baking/frame_${String(index + 1).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'minify';
    if (progress < 0.70) return 'test';
    return 'lighthouse';
  }, [progress]);

  // Compute lighthouse score dynamically based on progress in third stage
  const lighthouseScore = useMemo(() => {
    if (progress < 0.70) return 0;
    const factor = (progress - 0.70) / 0.30; // 0 to 1
    return Math.min(100, Math.floor(80 + factor * 20));
  }, [progress]);

  // Detect desktop vs mobile for conditional rendering
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
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
      id="baking"
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
                <p className="cin-eyebrow sequence-mobile-eyebrow">Optimization & Testing</p>
                <h2 className="cin-heading sequence-mobile-heading font-serif font-bold">
                  Into the <span className="italic text-oven-glow">Oven</span>
                </h2>
              </div>

              {/* Image Sequence Canvas (Landscape 16:9 box) */}
              <div className={`sequence-mobile-canvas ${stage === 'test' ? 'stage2-active' : ''} ${stage === 'lighthouse' ? 'stage3-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>

              {/* Stage-Aware Paragraph with Title and Inline Icon */}
              <div className="sequence-mobile-stage-text">
                {stage === 'minify' && (
                  <div className="sequence-mobile-stage-block" key="minify-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5z" />
                      </svg>
                      <span>Bundle Compilation</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Shrinking asset size overheads and minifying client scripts. We run production compilers to compress asset footprints and speed up loading.
                    </p>
                  </div>
                )}
                {stage === 'test' && (
                  <div className="sequence-mobile-stage-block" key="test-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                      </svg>
                      <span>Automated Test Suites</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Simulating layout integrity, routing safety, and callback responses. Strict test coverage ensures every user interaction works flawlessly under stress.
                    </p>
                  </div>
                )}
                {stage === 'lighthouse' && (
                  <div className="sequence-mobile-stage-block" key="lighthouse-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25V5.25M12 18.75V21.75M5.25 12H2.25M21.75 12H18.75M18.894 5.106l-2.122 2.122M7.228 16.772l-2.122 2.122M18.894 18.894l-2.122-2.122M7.228 7.228l-2.122-2.122" />
                      </svg>
                      <span>Lighthouse Audits</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Fine-tuning indices to hit absolute 100/100 performance scores. Optimizing images, metadata, and scripts to achieve the perfect web audit rating.
                    </p>
                  </div>
                )}
              </div>

              {/* Blueprint Card — fixed-height wrapper to prevent card jump */}
              <div className="sequence-mobile-blueprint">
                {stage === 'minify' && (
                  <div className="blueprint-card html-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-smoke-light font-mono text-[9.5px]">vite-bundler.log</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Shrinking asset size overheads and minifying client scripts.
                    </div>
                    <div className="font-mono text-stone-400 text-[10px] space-y-1 leading-none text-left">
                      <div>vite v8.0.14 building client environment...</div>
                      <div className="flex justify-between text-stone-400"><span>style.css</span> <span>73.6KB → 33.1KB</span></div>
                      <div className="flex justify-between text-stone-400"><span>app.js</span> <span>2.4MB → 359KB</span></div>
                    </div>
                  </div>
                )}

                {stage === 'test' && (
                  <div className="blueprint-card css-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-oven-orange font-mono text-[9.5px]">vitest --run</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Simulating layout integrity, routing safety, and callback responses.
                    </div>
                    <div className="p-2 rounded bg-black/50 border border-stone-850 font-mono text-[9.5px] leading-none space-y-1.5 text-stone-400">
                      <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[9px] font-bold">PASS</span> <span>DoughSection.test.tsx</span></div>
                      <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[9px] font-bold">PASS</span> <span>Toppings.test.tsx</span></div>
                      <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[9px] font-bold">PASS</span> <span>Baking.test.tsx</span></div>
                    </div>
                  </div>
                )}

                {stage === 'lighthouse' && (
                  <div className="blueprint-card js-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-cream font-mono text-[9.5px]">lighthouse_audit.json</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      /* Fine-tuning indices to hit absolute 100/100 performance scores. */
                    </div>
                    <div className="flex items-center justify-between w-full flex-1 mt-1 p-1 bg-black/30 rounded border border-stone-900/20">
                      <div className="flex flex-col space-y-1 leading-none text-[9.5px] text-stone-400">
                        <div className="font-mono text-cream font-bold mb-0.5">Lighthouse score</div>
                        <div>Performance: <span className="text-green-400">{lighthouseScore}</span></div>
                        <div>Best Practices: <span className="text-green-400">100</span></div>
                        <div>SEO & Access: <span className="text-green-400">100</span></div>
                      </div>
                      <div className="lighthouse-gauge flex items-center justify-center relative w-12 h-12 mr-2">
                        <svg width="48" height="48" viewBox="0 0 90 90" className="transform -rotate-90">
                          <circle cx="45" cy="45" r="36" className="lighthouse-circle-bg" />
                          <circle cx="45" cy="45" r="36" className="lighthouse-circle-fill" style={{ strokeDasharray: '226', strokeDashoffset: String(226 - (226 * lighthouseScore) / 100) }} />
                        </svg>
                        <div className="lighthouse-value font-mono text-[10px] absolute">{lighthouseScore}</div>
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
                  <p className="cin-eyebrow text-[9px] lg:text-sm">Optimization & Testing</p>
                  <h2 className="cin-heading text-base lg:text-5xl xl:text-6xl font-serif font-bold leading-tight lg:leading-none">
                    Into the <span className="italic text-oven-glow">Oven</span>
                  </h2>
                  <p className="cin-text text-sm lg:text-base xl:text-lg text-smoke-light hidden lg:block mt-3">
                    The heat transforms raw elements. We run performance compilers, compress static bundle file sizes, run strict unit test pipelines, and optimize Lighthouse criteria until they are golden.
                  </p>
                </div>

                {/* Steps Progress Tracker */}
                <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                  <div className={`progress-step ${stage === 'minify' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Bundle Compilation</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Shrinking asset size overheads and minifying client scripts.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'test' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Automated Test Suites</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Simulating layout integrity, routing safety, and callback responses.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'lighthouse' ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Lighthouse Audits</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Fine-tuning indices to hit absolute 100/100 performance scores.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right/Bottom Visual Column: visual container + desktop blueprint card */}
              <div className="flex flex-col justify-center space-y-10 order-1 lg:order-2 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
                <div className={`visual-container w-full css-active js-active relative overflow-hidden`}>
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                  <div className="cin-oven-glow" />
                </div>

                {/* Desktop Blueprint Cards (Desktop only) */}
                <div className="hidden lg:block w-full blueprint-wrapper">
                  {stage === 'minify' && (
                    <div className="blueprint-card html-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-smoke-light font-mono text-[12px] lg:text-sm">vite-bundler.log</span>
                      </div>
                      <div className="font-mono text-stone-500 text-xs lg:text-[13px] space-y-2">
                        <div>vite v8.0.14 building client environment...</div>
                        <div className="flex justify-between text-stone-400">
                          <span>✓ index.html</span>
                          <span className="text-stone-500">2.3 kB</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-amber-200">
                            <span>style.css</span>
                            <span>73.6 KB → 33.1 KB</span>
                          </div>
                          <div className="w-full h-1 bg-stone-900 rounded-full overflow-hidden">
                            <div className="h-full bg-oven-orange w-[45%]" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-amber-200">
                            <span>app-bundle.js</span>
                            <span>2.4 MB → 359.0 KB</span>
                          </div>
                          <div className="w-full h-1 bg-stone-900 rounded-full overflow-hidden">
                            <div className="h-full bg-oven-orange w-[15%]" />
                          </div>
                        </div>
                        <div className="text-xs lg:text-[11px] text-green-500 pt-1 border-t border-stone-800/80">
                          Compression done. All assets generated successfully.
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'test' && (
                    <div className="blueprint-card css-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-oven-orange font-mono text-[12px] lg:text-sm">vitest --run</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/50 border border-stone-800 font-mono text-xs lg:text-[13px] space-y-1.5 text-stone-400">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[10px] lg:text-[11px] font-bold">PASS</span>
                          <span>src/sections/DoughSection.test.tsx</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[10px] lg:text-[11px] font-bold">PASS</span>
                          <span>src/sections/ToppingsSection.test.tsx</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[10px] lg:text-[11px] font-bold">PASS</span>
                          <span>src/hooks/useSequenceCanvas.test.ts</span>
                        </div>
                        <div className="pt-2 border-t border-stone-900 text-xs lg:text-[12px] text-stone-300">
                          Test Suites: <span className="text-green-400 font-bold">3 passed</span>, 3 total<br />
                          Tests: <span className="text-green-400 font-bold">12 passed</span>, 12 total
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'lighthouse' && (
                    <div className="blueprint-card js-state animate-fade-in flex items-center justify-between">
                      <div className="flex flex-col space-y-2">
                        <div className="font-mono text-cream text-xs lg:text-sm">Lighthouse Audit Report</div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs lg:text-[13px] text-stone-400 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Performance</span>
                          </div>
                          <span className="text-green-400 text-right">{lighthouseScore}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Accessibility</span>
                          </div>
                          <span className="text-green-400 text-right">100</span>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Best Practices</span>
                          </div>
                          <span className="text-green-400 text-right">100</span>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>SEO Index</span>
                          </div>
                          <span className="text-green-400 text-right">100</span>
                        </div>
                      </div>

                      {/* Lighthouse Radial gauge SVG */}
                      <div className="lighthouse-gauge flex items-center justify-center">
                        <svg width="90" height="90" viewBox="0 0 90 90" className="transform -rotate-90">
                          <circle cx="45" cy="45" r="36" className="lighthouse-circle-bg" />
                          <circle
                            cx="45"
                            cy="45"
                            r="36"
                            className="lighthouse-circle-fill"
                            style={{
                              strokeDasharray: '226',
                              strokeDashoffset: String(226 - (226 * lighthouseScore) / 100),
                            }}
                          />
                        </svg>
                        <div className="lighthouse-value font-mono">{lighthouseScore}</div>
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
