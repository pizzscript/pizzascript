import { useRef, useMemo, useState, useEffect } from 'react';
import { useSequenceCanvas } from '../hooks/useSequenceCanvas';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_COUNT = 96;

export default function RemovingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const options = useMemo(() => ({
    frameCount: FRAME_COUNT,
    getFramePath: (index: number) =>
      `https://pub-60e443554d0643d5be3dba979f62b323.r2.dev/removing/frame_${String(index + 1).padStart(4, '0')}.webp`,
    onProgress: (p: number) => setProgress(p),
  }), []);

  useSequenceCanvas(canvasRef, sectionRef, options);

  const stage = useMemo(() => {
    if (progress < 0.35) return 'dns';
    if (progress < 0.70) return 'ssl';
    return 'cdn';
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
      id="removing"
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
                <p className="cin-eyebrow sequence-mobile-eyebrow">Deployment & Launch</p>
                <h2 className="cin-heading sequence-mobile-heading font-serif font-bold">
                  Fresh Out <span className="italic text-oven-orange">the Oven</span>
                </h2>
              </div>

              {/* Image Sequence Canvas (Landscape 16:9 box) */}
              <div className={`sequence-mobile-canvas ${stage === 'ssl' ? 'stage2-active' : ''} ${stage === 'cdn' ? 'stage3-active' : ''}`}>
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
              </div>

              {/* Stage-Aware Paragraph with Title and Inline Icon */}
              <div className="sequence-mobile-stage-text">
                {stage === 'dns' && (
                  <div className="sequence-mobile-stage-block" key="dns-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                      <span>DNS Configuration</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Mapping domain records to host names and server target IPs. Connecting your custom domain to edge platforms ensures instant global resolution.
                    </p>
                  </div>
                )}
                {stage === 'ssl' && (
                  <div className="sequence-mobile-stage-block" key="ssl-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
                      </svg>
                      <span>SSL Handshake</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Provisioning cryptographic keys and locking certificate authorities. Activating end-to-end TLS encryption keeps user data secure and builds trust.
                    </p>
                  </div>
                )}
                {stage === 'cdn' && (
                  <div className="sequence-mobile-stage-block" key="cdn-text">
                    <h3 className="sequence-mobile-stage-title flex items-center justify-center gap-1.5">
                      <svg className="w-4.5 h-4.5 text-oven-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0L21 9M19.5 6L15 15M9 15l-3-6m0 0L3 12m3-3L15 6M9 9V2.25m0 6.75L3.75 6.75M9 15H3.75M9 15v6.75M9 15l6.75-6.75M15 15l6.75 4.5M15 15v6.75" />
                      </svg>
                      <span>Edge CDN Delivery</span>
                    </h3>
                    <p className="sequence-mobile-paragraph">
                      Replicating sites globally to cache resources close to visitors. Serving assets from local edge nodes minimizes latency for global users.
                    </p>
                  </div>
                )}
              </div>

              {/* Blueprint Card — fixed-height wrapper to prevent card jump */}
              <div className="sequence-mobile-blueprint">
                {stage === 'dns' && (
                  <div className="blueprint-card html-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-smoke-light font-mono text-[9.5px]">dns_resolver.log</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Mapping domain records to host names and server target IPs.
                    </div>
                    <div className="mt-2 space-y-1 font-mono text-[9.5px] leading-none">
                      <div className={`dns-record flex justify-between p-1.5 rounded border border-stone-850 ${progress >= 0.15 ? 'resolved' : ''}`}>
                        <span className="text-stone-400">A pizzascript.com</span>
                        <span className={progress >= 0.15 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                          {progress >= 0.15 ? '✓ 76.76.21.21' : 'Resolving...'}
                        </span>
                      </div>
                      <div className={`dns-record flex justify-between p-1.5 rounded border border-stone-855 ${progress >= 0.28 ? 'resolved' : ''}`}>
                        <span className="text-stone-400">CNAME www.pizzascript.com</span>
                        <span className={progress >= 0.28 ? 'text-green-400 font-semibold' : 'text-stone-600'}>
                          {progress >= 0.28 ? '✓ cname.vercel-dns.com' : 'Resolving...'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 'ssl' && (
                  <div className="blueprint-card css-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-oven-orange font-mono text-[9.5px]">ssl_handshake.sh</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      // Provisioning cryptographic keys and locking certificate authorities.
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/40 border border-stone-850 flex items-center justify-between font-mono text-[9.5px]">
                      <div className="flex flex-col space-y-1 text-[9px]">
                        <div className="font-mono text-oven-orange font-bold mb-0.5">SSL Certificate</div>
                        <div>Issuer: Let's Encrypt</div>
                        <div>Protocol: TLS 1.3</div>
                        <div>Status: <span className="text-green-400 font-bold animate-pulse">SECURED</span></div>
                      </div>
                      <div className="flex items-center justify-center p-1.5 rounded-full bg-green-950/20 border border-green-800/30 text-green-400 w-8 h-8">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {stage === 'cdn' && (
                  <div className="blueprint-card js-state sequence-mobile-bp-card">
                    <div className="blueprint-header">
                      <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                      <span className="text-cream font-mono text-[9.5px]">cdn_status.json</span>
                    </div>
                    <div className="blueprint-comment text-[9.5px]">
                      /* Replicating sites globally to cache resources close to visitors. */
                    </div>
                    <div className="mt-2 p-2 rounded bg-black/50 border border-stone-855 font-mono text-[9.5px] space-y-1.5">
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-stone-400">
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />US-EAST-1</div>
                        <span className="text-green-400 text-right font-semibold">ACTIVE</span>
                        <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />AP-SOUTH-1</div>
                        <span className="text-green-400 text-right font-semibold">ACTIVE</span>
                      </div>
                      <div className="p-1 rounded bg-black/60 border border-stone-900 text-center font-mono text-[9.5px] text-green-500 font-bold uppercase tracking-wider relative overflow-hidden leading-none">
                        STATUS: ONLINE (100% HEALTH)
                        <span className="absolute inset-0 bg-green-500/5 animate-pulse" />
                      </div>
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
                  <p className="cin-eyebrow text-[9px] lg:text-sm">Deployment & Launch</p>
                  <h2 className="cin-heading text-base lg:text-5xl xl:text-6xl font-serif font-bold leading-tight lg:leading-none">
                    Fresh Out <span className="italic text-oven-orange">the Oven</span>
                  </h2>
                  <p className="cin-text text-sm lg:text-base xl:text-lg text-smoke-light hidden lg:block mt-3">
                    The moment of truth. Deployed to edge nodes and served hot to the globe. We map domain records, lock SSL encryption certificates, and load CDN servers to go live safely.
                  </p>
                </div>

                {/* Steps Progress Tracker */}
                <div className="progress-steps flex flex-col gap-1.5 lg:gap-3">
                  <div className={`progress-step ${stage === 'dns' ? 'active' : ''} ${progress >= 0.35 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">DNS Configuration</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Mapping domain records to host names and server target IPs.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'ssl' ? 'active' : ''} ${progress >= 0.70 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">SSL Handshake</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Provisioning cryptographic keys and locking certificate authorities.</p>
                    </div>
                  </div>

                  <div className={`progress-step ${stage === 'cdn' ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <div className="step-details">
                      <h3 className="step-title text-sm lg:text-base xl:text-lg">Edge CDN Delivery</h3>
                      <p className="step-desc text-xs lg:text-sm xl:text-base">Replicating sites globally to cache resources close to visitors.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Left/Bottom Visual Column: visual container + desktop blueprint card */}
              <div className="flex flex-col justify-center space-y-10 order-1 lg:order-1 mobile-canvas-top w-full max-w-[320px] lg:max-w-none">
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

                {/* Desktop Blueprint Cards (Desktop only) */}
                <div className="hidden lg:block w-full blueprint-wrapper">
                  {stage === 'dns' && (
                    <div className="blueprint-card html-state animate-fade-in">
                      <div className="blueprint-header">
                        <div className="blueprint-dots"><div className="blueprint-dot" /><div className="blueprint-dot" /><div className="blueprint-dot" /></div>
                        <span className="text-smoke-light font-mono text-[12px] lg:text-sm">dns_resolver.log</span>
                      </div>
                      <div className="space-y-1.5 font-mono text-xs lg:text-[13px]">
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
                    <div className="blueprint-card css-state animate-fade-in flex items-center justify-between">
                      <div className="flex flex-col space-y-1.5">
                        <div className="font-mono text-oven-orange text-[12px] lg:text-sm">SSL Certificate Authority</div>
                        <div className="font-mono text-xs lg:text-[12px] text-stone-400 space-y-0.5">
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
                        <span className="text-cream font-mono text-[12px] lg:text-sm">cdn_status.json</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-xs lg:text-[12px] text-stone-400 mb-2">
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
                      <div className="mt-3 p-2 rounded bg-black/60 border border-stone-800 text-center font-mono text-xs lg:text-[11px] text-green-500 font-bold uppercase tracking-wider relative overflow-hidden text-center">
                        STATUS: ONLINE (100% HEALTH)
                        <span className="absolute inset-0 bg-green-500/5 animate-pulse" />
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
