import { useEffect, useRef, useState } from 'react';

const WORD = 'PIZZASCRIPT'.split('');
const WL = WORD.length;
const PER_LETTER_STEP = 0.12;

interface CellConfig {
  char: string;
  isWord: boolean;
  row: number;
  col: number;
  dur: number; // in seconds
  del: number; // in seconds
  wdel: number; // in seconds
  cycle: number; // in  seconds
  ddel: number; // in seconds
  brightness: 'dim' | 'mid' | 'bright';
  _lastStyle: string;
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<{ cols: number; rows: number; cells: CellConfig[] } | null>(null);
  const cacheRef = useRef<Record<string, HTMLCanvasElement>>({});
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [resizeTrigger, setResizeTrigger] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const isScrollingRef = useRef(false);

  // ── Defer initialization on all viewports to avoid blocking the mount/load phase ──
  useEffect(() => {
    // Defer grid math and canvas pre-rendering until page is fully loaded and idle
    let active = true;

    const performInit = () => {
      if (!active) return;

      const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 50));
      idleCallback(() => {
        if (active) {
          setIsInitialized(true);
        }
      });
    };

    const checkPreloader = () => {
      if (!active) return;
      if (!document.body.classList.contains('loading')) {
        performInit();
      } else {
        setTimeout(checkPreloader, 100);
      }
    };

    if (document.readyState === 'complete') {
      checkPreloader();
    } else {
      const handleLoad = () => {
        window.removeEventListener('load', handleLoad);
        checkPreloader();
      };
      window.addEventListener('load', handleLoad);

      // Safety timeout fallback (absolute limit 2.5s)
      const fallbackTimer = setTimeout(() => {
        window.removeEventListener('load', handleLoad);
        performInit();
      }, 2500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
        active = false;
      };
    }

    return () => {
      active = false;
    };
  }, []);

  // ── Detect mobile device viewport width ────────────────────────────────────
  useEffect(() => {
    const handleCheck = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleCheck);
    return () => window.removeEventListener('resize', handleCheck);
  }, []);

  // ── Track if the window is currently scrolling to freeze matrix animations ──
  useEffect(() => {
    let scrollTimeout: number;

    const handleScrollStartStop = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 120); // Debounce timeout of 120ms to detect scroll completion
    };

    window.addEventListener('scroll', handleScrollStartStop, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollStartStop);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ── Track mouse hover position for desktop spotlight effect ────────────────
  useEffect(() => {
    if (!isInitialized || isMobile) {
      mouseRef.current = null;
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Hero section sets this flag to disable the spotlight in its area
      if ((window as any).__disableMatrixSpotlight) {
        mouseRef.current = null;
        return;
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isInitialized, isMobile]);

  // ── Explicit font load detection with 800ms safety timeout ────────────────
  useEffect(() => {
    if (!isInitialized) return;
    let active = true;

    const timer = setTimeout(() => {
      if (active) {
        console.warn('Press Start 2P font load timed out, falling back.');
        setFontLoaded(true);
      }
    }, 800);

    if (document.fonts) {
      document.fonts.load('13px "Press Start 2P"').then(() => {
        clearTimeout(timer);
        if (active) setFontLoaded(true);
      }).catch((err) => {
        clearTimeout(timer);
        console.warn('Failed to load Press Start 2P font:', err);
        if (active) setFontLoaded(true);
      });
    } else {
      clearTimeout(timer);
      setTimeout(() => {
        if (active) setFontLoaded(true);
      }, 500);
    }

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isInitialized]);

  // ── Glyphs Stamp Pre-render Cache ──────────────────────────────────────────
  useEffect(() => {
    if (!isInitialized || !fontLoaded) return;

    const cache: Record<string, HTMLCanvasElement> = {};
    const styles = [
      { id: 'dim_noise', color: '#3a1800', glow: 0, glowColor: '', alpha: 0.18 },
      { id: 'mid_noise', color: '#993300', glow: 4, glowColor: '#993300', alpha: 0.75 },
      { id: 'bright_noise', color: '#FF6A00', glow: 8, glowColor: '#FF6A00', alpha: 1.0 },
      { id: 'spotlight_glow', color: '#FFCC00', glow: 24, glowColor: '#FF6A00', alpha: 1.0 },
      { id: 'word_white', color: '#ffffff', glow: 22, glowColor: '#FF6A00', alpha: 1.0 },
      { id: 'word_gold', color: '#ffcc77', glow: 14, glowColor: '#FF6A00', alpha: 1.0 },
      { id: 'word_orange', color: '#FF6A00', glow: 6, glowColor: '#FF6A00', alpha: 1.0 },
      { id: 'word_dim', color: '#3a1800', glow: 0, glowColor: '', alpha: 0.15 },
    ];

    const charsSet = Array.from(new Set([...WORD, ...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]));

    charsSet.forEach(char => {
      styles.forEach(style => {
        const offscreen = document.createElement('canvas');
        offscreen.width = 64;
        offscreen.height = 64;
        const octx = offscreen.getContext('2d');
        if (octx) {
          octx.font = '13px "Press Start 2P", monospace';
          octx.textAlign = 'center';
          octx.textBaseline = 'middle';
          octx.globalAlpha = style.alpha;
          octx.fillStyle = style.color;
          if (style.glow > 0) {
            octx.shadowBlur = style.glow;
            octx.shadowColor = style.glowColor;
          }
          octx.fillText(char, 32, 32);
        }
        cache[`${char}_${style.id}`] = offscreen;
      });
    });

    cacheRef.current = cache;
  }, [isInitialized, fontLoaded]);

  // ── Grid generation — seamless repeating on desktop and mobile ─────────────
  useEffect(() => {
    if (!isInitialized) return;
    let lastWidth = window.innerWidth;

    function generateGrid() {
      const W = window.innerWidth;
      const VH = window.innerHeight;
      const mobile = W < 768;

      const currentCellSize = mobile ? 16 : 26;
      const WRAP_ROWS = 40; // Loop pattern every 40 rows (e.g. 1040px on desktop, 640px on mobile)
      const wrapHeight = WRAP_ROWS * currentCellSize;

      const logicalH = Math.ceil((VH + wrapHeight) / currentCellSize) * currentCellSize;
      const COLS = Math.floor(W / currentCellSize) || 1;
      const ROWS = Math.floor(logicalH / currentCellSize) || 1;

      // Generate the base repeating grid of WRAP_ROWS rows
      const letters: string[][] = Array.from({ length: WRAP_ROWS }, () =>
        Array.from({ length: COLS }, () => WORD[Math.floor(Math.random() * WL)])
      );
      const isWordCell: boolean[][] = Array.from({ length: WRAP_ROWS }, () => Array(COLS).fill(false));
      const wordMeta: ({ wordId: number; idx: number } | null)[][] = Array.from({ length: WRAP_ROWS }, () =>
        Array(COLS).fill(null)
      );

      const colRanges: [number, number][][] = Array.from({ length: COLS }, () => []);
      const rowRanges: [number, number][][] = Array.from({ length: WRAP_ROWS }, () => []);
      let wordIdCounter = 0;

      function rangeBlocked(ranges: [number, number][], start: number, end: number) {
        const GAP = 2;
        for (const [s, e] of ranges) {
          if (start <= e + GAP && end >= s - GAP) return true;
        }
        return false;
      }

      function placeVertical(col: number, startRow: number) {
        const id = wordIdCounter++;
        colRanges[col].push([startRow, startRow + WL - 1]);
        for (let i = 0; i < WL; i++) {
          const r = (startRow + i) % WRAP_ROWS;
          letters[r][col] = WORD[i];
          isWordCell[r][col] = true;
          wordMeta[r][col] = { wordId: id, idx: i };
        }
      }

      function placeHorizontal(row: number, startCol: number) {
        const id = wordIdCounter++;
        rowRanges[row].push([startCol, startCol + WL - 1]);
        for (let i = 0; i < WL; i++) {
          const c = (startCol + i) % COLS;
          letters[row][c] = WORD[i];
          isWordCell[row][c] = true;
          wordMeta[row][c] = { wordId: id, idx: i };
        }
      }

      const V_BAND = 5;
      const H_BAND = 4;

      for (let bandStart = 0; bandStart < COLS; bandStart += V_BAND) {
        const bandEnd = Math.min(bandStart + V_BAND - 1, COLS - 1);
        const col = bandStart + Math.floor(Math.random() * (bandEnd - bandStart + 1));
        for (let a = 0; a < 20; a++) {
          const startRow = Math.floor(Math.random() * (WRAP_ROWS - WL));
          if (!rangeBlocked(colRanges[col], startRow, startRow + WL - 1)) {
            placeVertical(col, startRow);
            break;
          }
        }
      }

      for (let bandStart = 0; bandStart < WRAP_ROWS; bandStart += H_BAND) {
        const bandEnd = Math.min(bandStart + H_BAND - 1, WRAP_ROWS - 1);
        const row = bandStart + Math.floor(Math.random() * (bandEnd - bandStart + 1));
        for (let a = 0; a < 20; a++) {
          const startCol = Math.floor(Math.random() * (COLS - WL));
          if (!rangeBlocked(rowRanges[row], startCol, startCol + WL - 1)) {
            placeHorizontal(row, startCol);
            break;
          }
        }
      }

      const wordCycles: Record<number, number> = {};
      const wordBaseTimes: Record<number, number> = {};
      for (let id = 0; id < wordIdCounter; id++) {
        wordCycles[id] = 5 + Math.random() * 5; // Reduced cycle duration for faster occurrences (5-10s instead of 14-24s)
        wordBaseTimes[id] = Math.random() * 5;
      }

      const cells: CellConfig[] = [];
      for (let r = 0; r < ROWS; r++) {
        const srcR = r % WRAP_ROWS;
        for (let c = 0; c < COLS; c++) {
          const char = letters[srcR][c];
          const isWord = isWordCell[srcR][c];
          const b = Math.random();
          let brightness: 'dim' | 'mid' | 'bright' = 'bright';
          if (b < 0.28) brightness = 'dim';
          else if (b < 0.48) brightness = 'mid';

          const seed = (srcR * 73 + c * 37) % 100;
          const dur = 3 + (seed % 8);
          const del = (seed * 0.07) % 7;

          if (isWord) {
            const meta = wordMeta[srcR][c]!;
            const dropDelay = parseFloat(wordBaseTimes[meta.wordId].toFixed(2)) + meta.idx * PER_LETTER_STEP;
            cells.push({
              char, isWord, row: r, col: c,
              dur, del, wdel: Math.random() * 4,
              cycle: wordCycles[meta.wordId],
              ddel: dropDelay,
              brightness,
              _lastStyle: '',
            });
          } else {
            cells.push({
              char, isWord, row: r, col: c,
              dur, del, wdel: 0, cycle: 0, ddel: 0,
              brightness,
              _lastStyle: '',
            });
          }
        }
      }

      gridRef.current = { cols: COLS, rows: ROWS, cells };

      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = mobile ? 1 : (window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(logicalH * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${logicalH}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      (canvas as HTMLCanvasElement & { _logicalH: number })._logicalH = logicalH;
      setResizeTrigger(prev => prev + 1);
    }

    generateGrid();

    let resizeTimeout: number;
    function handleResize() {
      const currentWidth = window.innerWidth;
      if (window.innerWidth < 768 && currentWidth === lastWidth) {
        return;
      }
      lastWidth = currentWidth;
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(generateGrid, 250);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isInitialized, isMobile]);

  // ── High-performance grid rendering engine ──────────────────────────────────
  const drawCanvas = (rawTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !gridRef.current || !cacheRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = window.innerWidth;
    const logicalH = (canvas as any)._logicalH ?? window.innerHeight;
    const cellW = W / gridRef.current.cols;
    const cellH = logicalH / gridRef.current.rows;

    ctx.clearRect(0, 0, W, logicalH);

    const cells = gridRef.current.cells;
    const len = cells.length;

    // Spotlight parameters
    const mouse = mouseRef.current;
    const isDesktop = !isMobile;
    const currentCellSize = isMobile ? 16 : 26;
    const wrapHeight = 40 * currentCellSize;
    const shift = window.scrollY % wrapHeight;
    const spotlightRadius = 220; // Expanded radius for a wider, softer fade-out

    for (let i = 0; i < len; i++) {
      const cell = cells[i];
      // Slow-motion background rain at 0.125x, but pizzascript word flares at 2.0x (16x faster)!
      const evalTime = cell.isWord ? (rawTime * 2.0) : (rawTime * 0.125);

      const styleId = computeStyleId(cell, evalTime);
      let drawX = cell.col * cellW + cellW / 2;
      let drawY = cell.row * cellH + cellH / 2;

      let scale = 1.0;
      let spotlightFactor = 0;

      // Spotlight displacement and highlight (Desktop only)
      if (mouse && isDesktop) {
        const dx = drawX - mouse.x;
        if (Math.abs(dx) < spotlightRadius) {
          const screenY = drawY - shift;
          const dy = screenY - mouse.y;
          if (Math.abs(dy) < spotlightRadius) {
            const dist = Math.hypot(dx, dy);
            if (dist < spotlightRadius) {
              const ratio = dist / spotlightRadius;
              // Cosine interpolation for perfectly smooth boundaries (derivative = 0 at r=0 and r=1)
              spotlightFactor = (1 + Math.cos(Math.PI * ratio)) / 2;

              // 1. Subtle 3D Bulge (softer, premium lift instead of heavy fisheye magnifying glass)
              scale = 1 + 0.18 * spotlightFactor; // Grows up to 18% larger under cursor

              // 2. Subtle Radial Pushing (delicate nudge instead of heavy warp)
              // No displacement at center (spotlightFactor = 1) and no displacement at edge (spotlightFactor = 0)
              // Maximum displacement at midpoint (spotlightFactor = 0.5)
              if (dist > 0) {
                const pushFactor = spotlightFactor * (1 - spotlightFactor) * 4; // peaks at 1.0 when spotlightFactor = 0.5
                const pushDistance = pushFactor * 6; // Displace up to 6px away
                drawX += (dx / dist) * pushDistance;
                drawY += (dy / dist) * pushDistance;
              }
            }
          }
        }
      }

      const baseScale = isMobile ? (16 / 26) : 1.0;
      const size = 64 * scale * baseScale;

      // Pass 1: Draw standard base character at scaled/displaced position
      const baseStamp = cacheRef.current[`${cell.char}_${styleId}`];
      if (baseStamp) {
        ctx.drawImage(baseStamp, drawX - size / 2, drawY - size / 2, size, size);
      }

      // Pass 2: Draw spotlight overlay with smooth alpha gradient (no sharp borders)
      if (spotlightFactor > 0) {
        const spotlightStamp = cacheRef.current[`${cell.char}_spotlight_glow`];
        if (spotlightStamp) {
          ctx.save();
          // Gradual decrease of brightness/glow outside using smooth cosine-derived alpha blending
          ctx.globalAlpha = Math.pow(spotlightFactor, 1.2);
          ctx.drawImage(spotlightStamp, drawX - size / 2, drawY - size / 2, size, size);
          ctx.restore();
        }
      }
    }
  };

  // ── CSS scroll: moves the canvas wrapper up with seamless wrap ─────────────
  useEffect(() => {
    function onScroll() {
      // Position Shift
      const el = wrapperRef.current;
      if (el) {
        const currentCellSize = isMobile ? 16 : 26;
        const wrapHeight = 40 * currentCellSize;
        const shift = window.scrollY % wrapHeight;
        el.style.transform = `translateY(-${shift}px)`;
      }
    }

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // ── Render loop — buttery-smooth full-refresh canvas redraw on desktop and mobile ─────────────
  useEffect(() => {
    if (!isInitialized || !fontLoaded) return;

    let frameId: number;
    let lastTime = Date.now();
    let accumulatedTime = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas || !gridRef.current || !cacheRef.current) {
        frameId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        frameId = requestAnimationFrame(render);
        return;
      }

      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      // Only increment time if the page is not scrolling
      const isScrolling = isScrollingRef.current || (window as any).isScrollingProgrammatically;
      if (!isScrolling) {
        accumulatedTime += deltaTime;
      }

      // Draw canvas at 60FPS on desktop to keep the hover spotlight animation working even during scrolling
      const shouldDraw = !isScrolling || !isMobile;
      if (shouldDraw) {
        drawCanvas(accumulatedTime);
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInitialized, fontLoaded, isMobile, resizeTrigger]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: isInitialized ? 0.55 : 0,
        transition: 'opacity 1.5s ease-in-out',
      }}
    >
      <span style={{ fontFamily: '"Press Start 2P"', opacity: 0, position: 'absolute', pointerEvents: 'none' }}>
        PIZZASCRIPT
      </span>
      <div
        ref={wrapperRef}
        style={{ position: 'absolute', top: 0, left: 0, willChange: 'transform' }}
      >
        <canvas id="matrix-canvas" ref={canvasRef} style={{ display: 'block' }} />
      </div>
    </div>
  );
}

function computeStyleId(cell: CellConfig, currentTime: number): string {
  if (cell.isWord) {
    const dropProgress = ((currentTime - cell.ddel) % cell.cycle) / cell.cycle;
    if (dropProgress < 0.03) return 'word_white';
    if (dropProgress < 0.25) return 'word_gold'; // Holds bright gold longer for readability
    if (dropProgress < 0.55) return 'word_orange'; // Gradual orange fade-out hold
  }
  const progress = ((currentTime - cell.del) % cell.dur) / cell.dur;
  const flickerDim =
    (progress >= 0.18 && progress <= 0.21) ||
    (progress >= 0.56 && progress <= 0.565);
  if (flickerDim || cell.brightness === 'dim') return 'dim_noise';
  if (cell.brightness === 'mid') return 'mid_noise';
  return 'bright_noise';
}
