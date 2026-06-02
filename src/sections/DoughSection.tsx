import { useRef, useMemo, useState } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';

const FRAME_COUNT = 100;
const FRAME_OFFSET = 62; // frames start at frame_0062.webp

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

  return (
    <section
      id="dough"
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
                 <p className="cin-eyebrow text-[9px] lg:text-xs">The Foundation</p>
                 <h2 className="cin-heading text-base lg:text-3xl font-serif font-bold leading-tight lg:leading-none">
                   Watch the <span className="italic text-oven-orange">Dough Rise</span>
                 </h2>
                 <p className="cin-text text-sm text-smoke-light hidden lg:block mt-3">
                   Every great website starts with a solid foundation. We knead each layer with care,
                   letting the HTML, CSS, and JavaScript elements rise naturally into an interactive masterpiece.
                 </p>
               </div>

               {/* Steps Progress Tracker */}
               <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                 <div className={`progress-step ${stage === 'html' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                   <span className="step-number">1</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">HTML Structure</h3>
                     <p className="step-desc text-xs">Forming the raw, semantic bones and wireframe skeleton.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'css' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                   <span className="step-number">2</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">CSS Styling</h3>
                     <p className="step-desc text-xs">Styling layouts, adding warm ambient themes and aesthetics.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'js' ? 'active' : ''}`}>
                   <span className="step-number">3</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">JavaScript Interactivity</h3>
                     <p className="step-desc text-xs">Breathing dynamic life and reactive pulses into the website.</p>
                   </div>
                 </div>
               </div>

                  {/* Mobile Content Card (Fixed Height h-[260px] to prevent cropping and shifting) */}
                  <div className="flex lg:hidden w-full h-[260px] flex-col justify-center relative select-none">
                    {stage === 'html' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card html-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-smoke-light font-mono text-[7.5px]">index.html</span>
                          </div>
                          <div className="blueprint-comment">
                            &lt;!-- Forming the raw, semantic bones and wireframe skeleton. --&gt;
                          </div>
                          <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                            <div>&lt;<span className="text-orange-400">div</span> class=<span className="text-amber-200">"pizza-box"</span>&gt;</div>
                            <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">h1</span>&gt;PizzaScript&lt;/<span className="text-orange-400">h1</span>&gt;</div>
                            <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">button</span>&gt;Order&lt;/<span className="text-orange-400">button</span>&gt;</div>
                            <div>&lt;/<span className="text-orange-400">div</span>&gt;</div>
                          </div>
                          <div className="mt-2 border border-dashed border-stone-855 p-2 text-center rounded text-stone-500 font-bold uppercase tracking-wider text-[8px] leading-none">
                            [ Raw Wireframe Skeleton ]
                          </div>
                        </div>
                      </div>
                    )}

                    {stage === 'css' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card css-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-oven-orange font-mono text-[7.5px]">style.css</span>
                          </div>
                          <div className="blueprint-comment">
                            /* Styling layouts, adding warm ambient themes and aesthetics. */
                          </div>
                          <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                            <div><span className="text-amber-200">.pizza-box</span> &#123;</div>
                            <div>&nbsp;&nbsp;<span className="text-orange-400">background</span>: var(--cream);</div>
                            <div>&nbsp;&nbsp;<span className="text-orange-400">border-radius</span>: 24px;</div>
                            <div>&nbsp;&nbsp;<span className="text-orange-400">color</span>: var(--charcoal);</div>
                            <div>&#125;</div>
                          </div>
                          <div className="mt-2 p-2 rounded bg-[#FFF8F0] text-stone-900 border border-amber-200/50 flex flex-col justify-between items-center transition-all duration-300 leading-none">
                            <div className="flex justify-between w-full border-b border-amber-100 pb-1 mb-1">
                              <span className="font-serif font-bold text-stone-800 text-[9px] leading-none">PizzaScript</span>
                              <span className="text-stone-500 text-[8px] leading-none">Menu</span>
                            </div>
                            <span className="text-[7.5px] text-stone-500 uppercase tracking-widest leading-none">Handcrafted Polish Applied</span>
                            <button className="mt-1.5 px-2 py-0.5 text-[7.5px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider leading-none">Order</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage === 'js' && (
                      <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                        <div className="blueprint-card js-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                          <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                            <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                            <span className="text-cream font-mono text-[7.5px]">app.js</span>
                          </div>
                          <div className="blueprint-comment">
                            // Breathing dynamic life and reactive pulses into the website.
                          </div>
                          <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                            <div>btn.addEventListener(<span className="text-amber-200">'click'</span>, () =&gt; &#123;</div>
                            <div>&nbsp;&nbsp;<span className="text-blue-300">oven</span>.ignite();</div>
                            <div>&nbsp;&nbsp;<span className="text-orange-300">animateDough</span>();</div>
                            <div>&#125;);</div>
                          </div>
                          <div className="mt-2 p-2 rounded bg-[#FFF8F0] text-stone-900 border-2 border-[#E87040] flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300 leading-none">
                            <div className="flex justify-between w-full border-b border-amber-100 pb-1 mb-1">
                              <span className="font-serif font-bold text-stone-800 text-[9px] leading-none">PizzaScript</span>
                              <span className="text-stone-500 text-[8px] leading-none">Menu</span>
                            </div>
                            <span className="text-[7.5px] text-stone-500 uppercase tracking-widest font-semibold text-orange-600 leading-none">Interactivity Active</span>
                            <button className="mt-1.5 px-2 py-0.5 text-[7.5px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider relative overflow-hidden leading-none">
                              Order
                              <span className="absolute inset-0 bg-white/20 animate-ping rounded" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

               {/* Desktop Blueprint Cards (Desktop only) */}
               <div className="hidden lg:block">
                 {stage === 'html' && (
                   <div className="blueprint-card html-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-smoke-light font-mono text-[10px]">index.html</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5">
                       <div><span className="text-orange-400">&lt;div</span> class=<span className="text-amber-200">"pizza-box"</span><span className="text-orange-400">&gt;</span></div>
                       <div>&nbsp;&nbsp;<span className="text-orange-400">&lt;h1&gt;</span>PizzaScript<span className="text-orange-400">&lt;/h1&gt;</span></div>
                       <div>&nbsp;&nbsp;<span className="text-orange-400">&lt;button&gt;</span>Order<span className="text-orange-400">&lt;/button&gt;</span></div>
                       <div><span className="text-orange-400">&lt;/div&gt;</span></div>
                     </div>
                     <div className="mt-4 border border-dashed border-stone-800 p-4 text-center rounded text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                       [ Raw Wireframe Skeleton ]
                     </div>
                   </div>
                 )}

                 {stage === 'css' && (
                   <div className="blueprint-card css-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-oven-orange font-mono text-[10px]">style.css</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5">
                       <div><span className="text-amber-200">.pizza-box</span> &#123;</div>
                       <div>&nbsp;&nbsp;<span className="text-orange-400">background</span>: var(--color-cream);</div>
                       <div>&nbsp;&nbsp;<span className="text-orange-400">border-radius</span>: 24px;</div>
                       <div>&nbsp;&nbsp;<span className="text-orange-400">color</span>: var(--color-charcoal);</div>
                       <div>&#125;</div>
                     </div>
                     <div className="mt-4 p-4 rounded-xl bg-[#FFF8F0] text-stone-900 border border-amber-200/50 flex flex-col justify-between items-center transition-all duration-300">
                       <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                         <span className="font-serif font-bold text-stone-800 text-[11px]">PizzaScript</span>
                         <span className="text-stone-500 text-[9px]">Menu</span>
                       </div>
                       <span className="text-[9px] text-stone-500 uppercase tracking-widest">Handcrafted Polish Applied</span>
                       <button className="mt-2.5 px-3 py-1 text-[9px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider">Order</button>
                     </div>
                   </div>
                 )}

                 {stage === 'js' && (
                   <div className="blueprint-card js-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-cream font-mono text-[10px]">app.js</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5">
                       <div>btn.<span className="text-orange-300">addEventListener</span>(<span className="text-amber-200">'click'</span>, () =&gt; &#123;</div>
                       <div>&nbsp;&nbsp;<span className="text-blue-300">oven</span>.<span className="text-orange-300">ignite</span>();</div>
                       <div>&nbsp;&nbsp;<span className="text-orange-300">animateDough</span>();</div>
                       <div>&#125;);</div>
                     </div>
                     <div className="mt-4 p-4 rounded-xl bg-[#FFF8F0] text-stone-900 border-2 border-[#E87040] flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300">
                       <div className="flex justify-between w-full border-b border-amber-100 pb-1.5 mb-1.5">
                         <span className="font-serif font-bold text-stone-800 text-[11px]">PizzaScript</span>
                         <span className="text-stone-500 text-[9px]">Menu</span>
                       </div>
                       <span className="text-[9px] text-stone-500 uppercase tracking-widest font-semibold text-orange-600">Interactivity Active</span>
                       <button className="mt-2.5 px-3 py-1 text-[9px] bg-[#E87040] text-white font-bold rounded uppercase tracking-wider relative overflow-hidden">
                         Order
                         <span className="absolute inset-0 bg-white/20 animate-ping rounded" />
                       </button>
                     </div>
                   </div>
                 )}
               </div>

             </div>

             {/* Right/Bottom Visual Column: exactly ONE canvas ref wrapper */}
             <div className="flex items-center justify-center order-1 lg:order-2 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
               <div className={`visual-container w-full ${stage === 'css' ? 'css-active' : ''} ${stage === 'js' ? 'js-active' : ''}`}>
                 <canvas ref={canvasRef} className="w-full h-full object-cover" />
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
