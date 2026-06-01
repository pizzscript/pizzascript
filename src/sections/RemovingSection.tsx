import { useRef, useMemo, useState } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';

const FRAME_COUNT = 96;

export default function RemovingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `/assets/images/removing/frame_${String(index + 1).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'dns';
    if (progress < 0.70) return 'ssl';
    return 'cdn';
  }, [progress]);

  return (
    <section
      id="removing"
      className="sequence-scroll-driver cin-bg-dark border-t border-brown-800/10"
      ref={sectionRef}
    >
      <div className="sequence-sticky">
        <div className="w-full h-full flex items-center justify-center">
          
          {/* Unified Layout Container */}
          <div className="container max-w-7xl mx-auto px-4 lg:px-6 w-full h-full py-0 flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-16 justify-center items-center lg:items-center select-none overflow-hidden">
             
             {/* Left/Top Content Column */}
             <div className="flex flex-col space-y-3 lg:space-y-6 order-2 lg:order-2 w-full max-w-[320px] lg:max-w-none justify-start lg:justify-center py-1 lg:py-0">
               
               {/* Heading */}
               <div className="text-center lg:text-left">
                 <p className="cin-eyebrow text-[9px] lg:text-xs">Deployment & Launch</p>
                 <h2 className="cin-heading text-base lg:text-3xl font-serif font-bold leading-tight lg:leading-none">
                   Fresh Out <span className="italic text-oven-orange">the Oven</span>
                 </h2>
                 <p className="cin-text text-sm text-smoke-light hidden lg:block mt-3">
                   The moment of truth. Deployed to edge nodes and served hot to the globe. We map domain records, lock SSL encryption certificates, and load CDN servers to go live safely.
                 </p>
               </div>

               {/* Steps Progress Tracker */}
               <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                 <div className={`progress-step ${stage === 'dns' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                   <span className="step-number">1</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">DNS Configuration</h3>
                     <p className="step-desc text-xs">Mapping domain records to host names and server target IPs.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'ssl' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                   <span className="step-number">2</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">SSL Handshake</h3>
                     <p className="step-desc text-xs">Provisioning cryptographic keys and locking certificate authorities.</p>
                   </div>
                 </div>

                 <div className={`progress-step ${stage === 'cdn' ? 'active' : ''}`}>
                   <span className="step-number">3</span>
                   <div className="step-details">
                     <h3 className="step-title text-sm">Edge CDN Delivery</h3>
                     <p className="step-desc text-xs">Replicating sites globally to cache resources close to visitors.</p>
                   </div>
                 </div>
               </div>

                {/* Mobile Content Card (Fixed Height h-[260px] to prevent cropping and shifting) */}
                <div className="flex lg:hidden w-full h-[260px] flex-col justify-center relative select-none">
                  {stage === 'dns' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card html-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-smoke-light font-mono text-[7.5px]">dns_resolver.log</span>
                        </div>
                        <div className="blueprint-comment">
                          // Mapping domain records to host names and server target IPs.
                        </div>
                        <div className="mt-2 space-y-1 font-mono text-[7.5px] leading-none">
                          <div className={`dns-record flex justify-between p-1.5 rounded border border-stone-850 ${progress >= 0.15 ? 'resolved' : ''}`}>
                            <span className="text-stone-400">A pizzascript.com</span>
                            <span className={progress >= 0.15 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                              {progress >= 0.15 ? '✓ 76.76.21.21' : 'Resolving...'}
                            </span>
                          </div>
                          <div className={`dns-record flex justify-between p-1.5 rounded border border-stone-850 ${progress >= 0.28 ? 'resolved' : ''}`}>
                            <span className="text-stone-400">CNAME www.pizzascript.com</span>
                            <span className={progress >= 0.28 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                              {progress >= 0.28 ? '✓ cname.vercel-dns.com' : 'Resolving...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'ssl' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card css-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-oven-orange font-mono text-[7.5px]">ssl_handshake.sh</span>
                        </div>
                        <div className="blueprint-comment">
                          // Provisioning cryptographic keys and locking certificate authorities.
                        </div>
                        <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 flex items-center justify-between font-mono text-[7.5px]">
                          <div className="flex flex-col space-y-1">
                            <div className="font-mono text-oven-orange font-bold mb-0.5">SSL Certificate</div>
                            <div>Issuer: Let's Encrypt</div>
                            <div>Protocol: TLS 1.3</div>
                            <div>Status: <span className="text-green-400 font-bold animate-pulse">SECURED</span></div>
                          </div>
                          <div className="flex items-center justify-center p-2 rounded-full bg-green-950/20 border border-green-800/30 text-green-400 w-8 h-8">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {stage === 'cdn' && (
                    <div className="flex flex-col h-full justify-center animate-fade-in w-full">
                      <div className="blueprint-card js-state w-full flex-1 flex flex-col justify-between p-2 font-mono text-[8.5px] min-h-[240px] max-h-[240px] overflow-hidden leading-tight">
                        <div className="blueprint-header flex justify-between items-center border-b border-brown-900/15 pb-0.5 mb-1">
                          <div className="blueprint-dots flex gap-0.5"><div className="blueprint-dot w-1 h-1 rounded-full bg-red-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-yellow-500/60" /><div className="blueprint-dot w-1 h-1 rounded-full bg-green-500/60" /></div>
                          <span className="text-cream font-mono text-[7.5px]">cdn_status.json</span>
                        </div>
                        <div className="blueprint-comment">
                          /* Replicating sites globally to cache resources close to visitors. */
                        </div>
                        <div className="mt-2 p-2 rounded bg-black/50 border border-stone-850 font-mono text-[7.5px] space-y-1.5">
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-stone-400">
                            <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />US-EAST-1</div>
                            <span className="text-green-400 text-right font-semibold">ACTIVE</span>
                            <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />AP-SOUTH-1</div>
                            <span className="text-green-400 text-right font-semibold">ACTIVE</span>
                          </div>
                          <div className="p-1 rounded bg-black/60 border border-stone-900 text-center font-mono text-[7.5px] text-green-500 font-bold uppercase tracking-wider relative overflow-hidden">
                            STATUS: ONLINE (100% HEALTH)
                            <span className="absolute inset-0 bg-green-500/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

               {/* Desktop Developer Cards (Desktop only) */}
               <div className="hidden lg:block">
                 {stage === 'dns' && (
                   <div className="blueprint-card html-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-smoke-light font-mono text-[10px]">dns_resolver.log</span>
                     </div>
                     <div className="space-y-1.5 font-mono text-[10px]">
                       <div className={`dns-record ${progress >= 0.15 ? 'resolved' : ''}`}>
                         <span className="text-stone-400">A pizzascript.com</span>
                         <span className={progress >= 0.15 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                           {progress >= 0.15 ? '✓ 76.76.21.21' : 'Resolving...'}
                         </span>
                       </div>
                       <div className={`dns-record ${progress >= 0.28 ? 'resolved' : ''}`}>
                         <span className="text-stone-400">CNAME www.pizzascript.com</span>
                         <span className={progress >= 0.28 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                           {progress >= 0.28 ? '✓ cname.vercel-dns.com' : 'Resolving...'}
                         </span>
                       </div>
                     </div>
                   </div>
                 )}

                 {stage === 'ssl' && (
                   <div className="blueprint-card css-state animate-fade-in flex items-center justify-between p-4">
                     <div className="flex flex-col space-y-1.5">
                       <div className="font-mono text-oven-orange text-[10px]">SSL Certificate Authority</div>
                       <div className="font-mono text-[9px] text-stone-400 space-y-0.5">
                         <div>Issuer: Let's Encrypt Authority</div>
                         <div>Protocol: TLS 1.3 Handshake</div>
                         <div>Key Strength: RSA-2048</div>
                         <div>Status: <span className="text-green-400 font-bold">SECURED</span></div>
                       </div>
                     </div>
                     {/* Closed Lock Icon */}
                     <div className="flex items-center justify-center p-3 rounded-full bg-green-950/20 border border-green-800/30 text-green-400">
                       <svg className={`w-8 h-8 ${progress >= 0.52 ? 'scale-110 opacity-100' : 'scale-95 opacity-60'} transition-all duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                         {progress >= 0.52 ? (
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                         ) : (
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                         )}
                       </svg>
                     </div>
                   </div>
                 )}

                 {stage === 'cdn' && (
                   <div className="blueprint-card js-state animate-fade-in">
                     <div className="blueprint-header">
                       <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                       <span className="text-cream font-mono text-[10px]">cdn_status.json</span>
                     </div>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[9px] text-stone-400 mb-2">
                       <div className="flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span>US-EAST-1</span>
                       </div>
                       <span className="text-green-400 text-right">ACTIVE</span>
                       <div className="flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span>EU-CENTRAL-1</span>
                       </div>
                       <span className="text-green-400 text-right">ACTIVE</span>
                       <div className="flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span>AP-SOUTH-1</span>
                       </div>
                       <span className="text-green-400 text-right">ACTIVE</span>
                     </div>
                     <div className="mt-3 p-2 rounded bg-black/60 border border-stone-800 text-center font-mono text-[10px] text-green-500 font-bold uppercase tracking-wider relative overflow-hidden">
                       STATUS: ONLINE (100% HEALTH)
                       <span className="absolute inset-0 bg-green-500/5 animate-pulse" />
                     </div>
                   </div>
                 )}
               </div>

             </div>

             {/* Right/Bottom Visual Column: exactly ONE canvas ref wrapper */}
             <div className="flex items-center justify-center order-1 lg:order-1 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
               <div className={`visual-container w-full css-active js-active relative overflow-hidden`}>
                 <canvas ref={canvasRef} className="w-full h-full object-cover" />
                 
                 {/* Steam particles visual representation for the fresh out look */}
                 <div style={{
                   position: 'absolute',
                   bottom: 0,
                   left: 0,
                   right: 0,
                   height: '25%',
                   background: 'linear-gradient(to top, rgba(26,15,8,0.7), transparent)',
                   zIndex: 2,
                   pointerEvents: 'none',
                 }} />
                 
                 {/* Rising steam lines */}
                 <div className="divider-steam absolute bottom-4 left-0 right-0 z-3">
                   <div className="steam-particle" />
                   <div className="steam-particle" style={{ animationDelay: '0.3s' }} />
                   <div className="steam-particle" style={{ animationDelay: '0.6s' }} />
                   <div className="steam-particle" style={{ animationDelay: '0.9s' }} />
                   <div className="steam-particle" style={{ animationDelay: '1.2s' }} />
                 </div>
               </div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}
