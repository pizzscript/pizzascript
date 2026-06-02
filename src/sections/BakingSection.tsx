import { useRef, useMemo, useState } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';

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

  return (
    <section
      id="baking"
      className="sequence-scroll-driver cin-bg-dark border-t border-brown-800/10"
      ref={sectionRef}
    >
      <div className="sequence-sticky">
        <div className="w-full h-full flex items-center justify-center">
          
          {/* Unified Layout Container */}
          <div className="container max-w-7xl mx-auto px-4 lg:px-6 w-full h-full py-0 flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-16 justify-center items-center lg:items-center select-none overflow-hidden">
             
             {/* Left/Top Content Column */}
             <div className="flex flex-col space-y-3 lg:space-y-6 order-2 lg:order-1 w-full max-w-[320px] lg:max-w-none justify-start lg:justify-center py-1 lg:py-0">
               
               {/* Heading */}
               <div className="text-center lg:text-left">
                 <p className="cin-eyebrow text-[9px] lg:text-xs">Optimization & Testing</p>
                 <h2 className="cin-heading text-base lg:text-3xl font-serif font-bold leading-tight lg:leading-none">
                   Into the <span className="italic text-oven-glow">Oven</span>
                 </h2>
                 <p className="cin-text text-sm text-smoke-light hidden lg:block mt-3">
                   The heat transforms raw elements. We run performance compilers, compress static bundle file sizes, run strict unit test pipelines, and optimize Lighthouse criteria until they are golden.
                 </p>
               </div>

               {/* Steps Progress Tracker */}
               <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                 <div className={`progress-step ${stage === 'minify' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                   <span className="step-number">1</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Bundle Compilation</h3>
                     <p className="step-desc text-xs">Shrinking asset size overheads and minifying client scripts.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'test' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                   <span className="step-number">2</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Automated Test Suites</h3>
                     <p className="step-desc text-xs">Simulating layout integrity, routing safety, and callback responses.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'lighthouse' ? 'active' : ''}`}>
                   <span className="step-number">3</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Lighthouse Audits</h3>
                     <p className="step-desc text-xs">Fine-tuning indices to hit absolute 100/100 performance scores.</p>
                   </div>
                 </div>
               </div>

                  {/* Mobile Content Card (Fixed Height h-[260px] to prevent cropping and shifting) */}
                  <div className="flex lg:hidden w-full h-[260px] flex-col justify-center relative select-none">
                    {stage === 'minify' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card html-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-smoke-light font-mono text-[7.5px]">vite-bundler.log</span>
                          </div>
                          <div className="blueprint-comment">
                            // Shrinking asset size overheads and minifying client scripts.
                          </div>
                          <div className="font-mono text-stone-500 text-[8px] space-y-1 leading-none text-left">
                            <div>vite v8.0.14 building client environment...</div>
                            <div className="flex justify-between text-stone-400"><span>style.css</span> <span>73.6KB → 33.1KB</span></div>
                            <div className="flex justify-between text-stone-400"><span>app.js</span> <span>2.4MB → 359KB</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage === 'test' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card css-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-oven-orange font-mono text-[7.5px]">vitest --run</span>
                          </div>
                          <div className="blueprint-comment">
                            // Simulating layout integrity, routing safety, and callback responses.
                          </div>
                          <div className="p-2 rounded bg-black/50 border border-stone-850 font-mono text-[7.5px] leading-none space-y-1.5 text-stone-400">
                            <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[7px] font-bold">PASS</span> <span>DoughSection.test.tsx</span></div>
                            <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[7px] font-bold">PASS</span> <span>Toppings.test.tsx</span></div>
                            <div className="flex items-center gap-1.5"><span className="px-1 py-0.2 bg-green-900/60 text-green-400 rounded text-[7px] font-bold">PASS</span> <span>Baking.test.tsx</span></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage === 'lighthouse' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card js-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-cream font-mono text-[7.5px]">lighthouse_audit.json</span>
                          </div>
                          <div className="blueprint-comment">
                            /* Fine-tuning indices to hit absolute 100/100 performance scores. */
                          </div>
                          <div className="flex items-center justify-between w-full flex-1 mt-1 p-1 bg-black/30 rounded border border-stone-900/20">
                            <div className="flex flex-col space-y-1 leading-none text-[8px] text-stone-400">
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
                      </div>
                    )}
                  </div>

               {/* Desktop Blueprint Cards (Desktop only) */}
               <div className="hidden lg:block">
                 {stage === 'minify' && (
                   <div className="blueprint-card html-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-smoke-light font-mono text-[10px]">vite-bundler.log</span>
                     </div>
                     <div className="font-mono text-stone-500 text-[10px] space-y-2">
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
                       <div className="text-[9px] text-green-500 pt-1 border-t border-stone-800/80">
                         Compression done. All assets generated successfully.
                       </div>
                     </div>
                   </div>
                 )}

                 {stage === 'test' && (
                   <div className="blueprint-card css-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-oven-orange font-mono text-[10px]">vitest --run</span>
                     </div>
                     <div className="p-3 rounded-lg bg-black/50 border border-stone-800 font-mono text-[9px] space-y-1.5 text-stone-400">
                       <div className="flex items-center gap-2">
                         <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[8px] font-bold">PASS</span>
                         <span>src/sections/DoughSection.test.tsx</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[8px] font-bold">PASS</span>
                         <span>src/sections/ToppingsSection.test.tsx</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <span className="px-1.5 py-0.5 bg-green-900/60 text-green-400 rounded text-[8px] font-bold">PASS</span>
                         <span>src/hooks/useSequenceCanvas.test.ts</span>
                       </div>
                       <div className="pt-2 border-t border-stone-900 text-[10px] text-stone-300">
                         Test Suites: <span className="text-green-400 font-bold">3 passed</span>, 3 total<br />
                         Tests: <span className="text-green-400 font-bold">12 passed</span>, 12 total
                       </div>
                     </div>
                   </div>
                 )}

                 {stage === 'lighthouse' && (
                   <div className="blueprint-card js-state animate-fade-in flex items-center justify-between p-5">
                     <div className="flex flex-col space-y-2">
                       <div className="font-mono text-cream text-[10px]">Lighthouse Audit Report</div>
                       <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-stone-400 font-mono">
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

             {/* Right/Bottom Visual Column: exactly ONE canvas ref wrapper */}
             <div className="flex items-center justify-center order-1 lg:order-2 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
               <div className={`visual-container w-full css-active js-active relative overflow-hidden`}>
                 <canvas ref={canvasRef} className="w-full h-full object-cover" />
                 <div className="cin-oven-glow" />
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
