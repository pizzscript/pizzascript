import { useRef, useMemo, useState } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';

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

  return (
    <section
      id="aroma"
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
                 <p className="cin-eyebrow text-[9px] lg:text-xs">SEO & Visibility</p>
                 <h2 className="cin-heading text-base lg:text-3xl font-serif font-bold leading-tight lg:leading-none">
                   The Wafting <span className="italic text-oven-orange">Aroma</span>
                 </h2>
                 <p className="cin-text text-sm text-smoke-light hidden lg:block mt-3">
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
                     <h3 className="step-title text-sm">Metadata Recipe</h3>
                     <p className="step-desc text-xs">Crafting meta titles and tags to describe the delicious page to crawlers.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'schema' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                   <span className="step-number">2</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Structured Spices</h3>
                     <p className="step-desc text-xs">Adding structured JSON-LD recipe markup so Google can index details.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'og' ? 'active' : ''}`}>
                   <span className="step-number">3</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Social Wafting</h3>
                     <p className="step-desc text-xs">Configuring Open Graph preview cards to invite social clicks organically.</p>
                   </div>
                 </div>
               </div>

                {/* Mobile Content Card (Fixed Height h-[260px] to prevent cropping and shifting) */}
                <div className="flex lg:hidden w-full h-[260px] flex-col justify-center relative select-none">
                  {stage === 'meta' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card html-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-smoke-light font-mono text-[7.5px]">meta_tags.html</span>
                        </div>
                        <div className="blueprint-comment">
                          &lt;!-- Crafting meta titles and descriptions to describe the delicious page. --&gt;
                        </div>
                        <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                          <div>&lt;<span className="text-orange-400">title</span>&gt;PizzaScript - Hand-Crafted Web Design&lt;/<span className="text-orange-400">title</span>&gt;</div>
                          <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"description"</span> content=<span className="text-amber-200">"Served hot to the edge..."</span> /&gt;</div>
                        </div>
                        <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 font-mono text-[7.5px] leading-tight space-y-1">
                          <div className="flex justify-between items-center text-stone-500 text-[6.5px] border-b border-stone-900 pb-0.5 mb-0.5">
                            <span>GOOGLE SEARCH RESULT</span>
                            <span className="text-green-500 font-bold">100% SEO</span>
                          </div>
                          <div className="text-blue-400 font-serif text-[8.5px] font-bold leading-tight">PizzaScript — Hand-Crafted Web Design</div>
                          <div className="text-green-600 text-[7px]">https://pizzascript.com</div>
                          <div className="text-stone-400 text-[7.5px] leading-snug">Served hot to the edge. We build fast, high-converting websites using React and Tailwind CSS.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'schema' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card css-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-oven-orange font-mono text-[7.5px]">structured_data.json</span>
                        </div>
                        <div className="blueprint-comment">
                          /* Adding structured JSON-LD data so crawlers can digest our page recipes. */
                        </div>
                        <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                          <div>&#123;</div>
                          <div>&nbsp;&nbsp;<span className="text-blue-300">"@context"</span>: <span className="text-amber-200">"https://schema.org"</span>,</div>
                          <div>&nbsp;&nbsp;<span className="text-blue-300">"@type"</span>: <span className="text-amber-200">"Restaurant"</span>,</div>
                          <div>&nbsp;&nbsp;<span className="text-blue-300">"name"</span>: <span className="text-amber-200">"PizzaScript website"</span></div>
                          <div>&#125;</div>
                        </div>
                        <div className="mt-2 p-2 rounded bg-black/40 border border-amber-900/20 font-mono text-[7.5px] space-y-1">
                          <div className="flex justify-between items-center text-amber-100 border-b border-amber-950/20 pb-0.5 mb-0.5">
                            <span className="font-bold">SCHEMA VALIDATOR</span>
                            <span className="text-stone-600">JSON-LD</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 text-[7px] text-stone-400 leading-none">
                            <div>🔍 Type</div><div className="text-right">"Restaurant"</div>
                            <div>🍕 Rating</div><div className="text-right">"5.0 (48 reviews)"</div>
                            <div>📍 Area</div><div className="text-right">"Global Edge"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'og' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card js-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-cream font-mono text-[7.5px]">open_graph.html</span>
                        </div>
                        <div className="blueprint-comment">
                          &lt;!-- Configuring social preview cards so link shares attract organic visitors. --&gt;
                        </div>
                        <div className="font-mono text-stone-400 space-y-0.5 leading-none text-[8px]">
                          <div>&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:title"</span> content=<span className="text-amber-200">"PizzaScript Website"</span> /&gt;</div>
                          <div>&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:image"</span> content=<span className="text-amber-200">"aroma_preview.png"</span> /&gt;</div>
                        </div>
                        <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 font-mono text-[7.5px] space-y-1.5">
                          <div className="flex justify-between items-center text-stone-500 text-[6.5px] border-b border-stone-900 pb-0.5 mb-0.5">
                            <span>SOCIAL CARD PREVIEW</span>
                            <span>OpenGraph</span>
                          </div>
                          <div className="border border-stone-800 rounded bg-[#FFF8F0]/5 overflow-hidden flex">
                            <div className="w-12 h-9 bg-amber-950/20 border-r border-stone-800 flex items-center justify-center text-[7px] text-oven-orange">
                              IMAGE
                            </div>
                            <div className="p-1 flex-1 flex flex-col justify-center leading-tight">
                              <div className="text-stone-300 text-[8px] font-bold truncate">PizzaScript — Hand-Crafted Web</div>
                              <div className="text-stone-500 text-[7px] truncate">A delicious aroma of clean code...</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

               {/* Desktop Blueprint Cards (Desktop only) */}
               <div className="hidden lg:block">
                 {stage === 'meta' && (
                   <div className="blueprint-card html-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-smoke-light font-mono text-[10px]">meta_tags.html</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5 mb-3">
                       <div>&lt;<span className="text-orange-400">title</span>&gt;PizzaScript - Hand-Crafted Web Design&lt;/<span className="text-orange-400">title</span>&gt;</div>
                       <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"description"</span> content=<span className="text-amber-200">"Served hot to the edge..."</span> /&gt;</div>
                       <div>&lt;<span className="text-orange-400">meta</span> name=<span className="text-amber-200">"keywords"</span> content=<span className="text-amber-200">"react, vite, nextjs"</span> /&gt;</div>
                     </div>
                     <div className="mt-4 p-3 rounded-lg bg-black/40 border border-stone-850 font-mono text-[10px] space-y-1">
                       <div className="flex justify-between items-center text-stone-500 text-[8px] border-b border-stone-900 pb-1 mb-1">
                         <span>GOOGLE SEARCH RESULTS</span>
                         <span className="text-green-500 font-bold">100% SEO</span>
                       </div>
                       <div className="text-blue-400 hover:underline font-serif text-[11px] font-bold leading-tight">PizzaScript — Hand-Crafted Web Design</div>
                       <div className="text-green-600 text-[9px]">https://pizzascript.com</div>
                       <div className="text-stone-400 text-[9px] leading-tight">Served hot to the edge. We build fast, high-converting websites using React and Tailwind CSS.</div>
                     </div>
                   </div>
                 )}

                 {stage === 'schema' && (
                   <div className="blueprint-card css-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-oven-orange font-mono text-[10px]">structured_data.json</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5 mb-3">
                       <div>&#123;</div>
                       <div>&nbsp;&nbsp;<span className="text-blue-300">"@context"</span>: <span className="text-amber-200">"https://schema.org"</span>,</div>
                       <div>&nbsp;&nbsp;<span className="text-blue-300">"@type"</span>: <span className="text-amber-200">"Restaurant"</span>,</div>
                       <div>&nbsp;&nbsp;<span className="text-blue-300">"name"</span>: <span className="text-amber-200">"PizzaScript website"</span></div>
                       <div>&#125;</div>
                     </div>
                     <div className="mt-4 p-3 rounded-lg bg-black/40 border border-amber-900/20 font-mono text-[10px] space-y-2">
                       <div className="flex justify-between items-center text-amber-100 border-b border-amber-950/20 pb-1 mb-1">
                         <span className="font-bold">SCHEMA VALIDATOR</span>
                         <span className="text-stone-600">JSON-LD</span>
                       </div>
                       <div className="grid grid-cols-2 gap-1 text-[9px] text-stone-400">
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
                       <span className="text-cream font-mono text-[10px]">open_graph.html</span>
                     </div>
                     <div className="font-mono text-stone-400 space-y-0.5 mb-3">
                       <div>&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:title"</span> content=<span className="text-amber-200">"PizzaScript Website"</span> /&gt;</div>
                       <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:image"</span> content=<span className="text-amber-200">"aroma_preview.png"</span> /&gt;</div>
                       <div>&nbsp;&nbsp;&lt;<span className="text-orange-400">meta</span> property=<span className="text-amber-200">"og:type"</span> content=<span className="text-amber-200">"website"</span> /&gt;</div>
                     </div>
                     <div className="mt-4 p-3 rounded-lg bg-black/40 border border-stone-850 font-mono text-[10px] space-y-2">
                       <div className="flex justify-between items-center text-stone-500 text-[8px] border-b border-stone-900 pb-1 mb-1">
                         <span>SOCIAL CARD PREVIEW</span>
                         <span>OpenGraph</span>
                       </div>
                       <div className="border border-stone-800 rounded bg-[#FFF8F0]/5 overflow-hidden flex">
                         <div className="w-16 h-12 bg-amber-950/20 border-r border-stone-800 flex items-center justify-center text-[8px] text-oven-orange">
                           IMAGE
                         </div>
                         <div className="p-1.5 flex-1 flex flex-col justify-center leading-tight">
                           <div className="text-stone-300 text-[9px] font-bold">PizzaScript — Hand-Crafted Web</div>
                           <div className="text-stone-500 text-[8px] truncate">A delicious aroma of clean code...</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

             </div>

             {/* Right/Bottom Visual Column: exactly ONE canvas ref wrapper */}
             <div className="flex items-center justify-center order-1 lg:order-2 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
               <div className={`visual-container w-full ${stage === 'schema' ? 'css-active' : ''} ${stage === 'og' ? 'js-active' : ''}`}>
                 <canvas ref={canvasRef} className="w-full h-full object-cover" />
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
