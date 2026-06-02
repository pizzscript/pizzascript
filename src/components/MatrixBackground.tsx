import { useEffect, useRef, useState } from 'react';

const WORD = 'PIZZASCRIPT'.split('');
const WL = WORD.length;
const GAP = 8;
const PER_LETTER_STEP = 0.28;
const CELL_SIZE = 26;

interface CellConfig {
  char: string;
  isWord: boolean;
  row: number;
  col: number;
  dur: number; // in seconds
  del: number; // in seconds
  wdel: number; // in seconds
  cycle: number; // in seconds
  ddel: number; // in seconds
  brightness: 'dim' | 'mid' | 'bright';
  _lastStyle: string;
}

export default function MatrixBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<{ cols: number; rows: number; cells: CellConfig[] } | null>(null);
  const cacheRef    = useRef<Record<string, HTMLCanvasElement>>({});
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resizeTrigger, setResizeTrigger] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // ── Defer initialization on all viewports to avoid blocking the mount/load phase ──
  useEffect(() => {
    // Detect viewport size
    const checkMobile = window.innerWidth < 768;
    setIsMobile(checkMobile);

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
      { id: 'dim_noise',    color: '#3a1800', glow: 0,  glowColor: '',        alpha: 0.18 },
      { id: 'mid_noise',    color: '#993300', glow: 2,  glowColor: '#993300', alpha: 0.7  },
      { id: 'bright_noise', color: '#FF6A00', glow: 4,  glowColor: '#FF6A00', alpha: 1.0  },
      { id: 'word_white',   color: '#ffffff', glow: 22, glowColor: '#FF6A00', alpha: 1.0  },
      { id: 'word_gold',    color: '#ffcc77', glow: 14, glowColor: '#FF6A00', alpha: 1.0  },
      { id: 'word_orange',  color: '#FF6A00', glow: 6,  glowColor: '#FF6A00', alpha: 1.0  },
      { id: 'word_dim',     color: '#3a1800', glow: 0,  glowColor: '',        alpha: 0.15 },
    ];

    const charsSet = Array.from(new Set([...WORD, ...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')]));

    charsSet.forEach(char => {
      styles.forEach(style => {
        const offscreen = document.createElement('canvas');
        offscreen.width  = 64;
        offscreen.height = 64;
        const octx = offscreen.getContext('2d');
        if (octx) {
          octx.font         = '13px "Press Start 2P", monospace';
          octx.textAlign    = 'center';
          octx.textBaseline = 'middle';
          octx.globalAlpha  = style.alpha;
          octx.fillStyle    = style.color;
          if (style.glow > 0) {
            octx.shadowBlur  = style.glow;
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
      const W  = window.innerWidth;
      const VH = window.innerHeight;
      const mobile = W < 768;

      const WRAP_ROWS = 40; // Loop pattern every 40 rows (1040px)
      const wrapHeight = WRAP_ROWS * CELL_SIZE;

      const logicalH = Math.ceil((VH + wrapHeight) / CELL_SIZE) * CELL_SIZE;
      const COLS = Math.floor(W / CELL_SIZE) || 1;
      const ROWS = Math.floor(logicalH / CELL_SIZE) || 1;

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

      const wordCycles: Record<number, number>    = {};
      const wordBaseTimes: Record<number, number> = {};
      for (let id = 0; id < wordIdCounter; id++) {
        wordCycles[id]    = 14 + Math.random() * 10;
        wordBaseTimes[id] = Math.random() * 10;
      }

      const cells: CellConfig[] = [];
      for (let r = 0; r < ROWS; r++) {
        const srcR = r % WRAP_ROWS;
        for (let c = 0; c < COLS; c++) {
          const char   = letters[srcR][c];
          const isWord = isWordCell[srcR][c];
          if (isWord) {
            const meta      = wordMeta[srcR][c]!;
            const dropDelay = parseFloat(wordBaseTimes[meta.wordId].toFixed(2)) + meta.idx * PER_LETTER_STEP;
            cells.push({
              char, isWord, row: r, col: c,
              dur: 0, del: 0, wdel: Math.random() * 4,
              cycle: wordCycles[meta.wordId],
              ddel: dropDelay,
              brightness: 'bright',
              _lastStyle: '',
            });
          } else {
            const b = Math.random();
            let brightness: 'dim' | 'mid' | 'bright' = 'bright';
            if (b < 0.28) brightness = 'dim';
            else if (b < 0.48) brightness = 'mid';

            const seed = (srcR * 73 + c * 37) % 100;
            const dur  = 3 + (seed % 8);
            const del  = (seed * 0.07) % 7;

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
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(logicalH * dpr);
      canvas.style.width  = `${W}px`;
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
  const drawCanvas = (evalTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !gridRef.current || !cacheRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W        = window.innerWidth;
    const logicalH = (canvas as any)._logicalH ?? window.innerHeight;
    const cellW    = W / gridRef.current.cols;
    const cellH    = logicalH / gridRef.current.rows;

    ctx.clearRect(0, 0, W, logicalH);

    const cells = gridRef.current.cells;
    const len   = cells.length;

    for (let i = 0; i < len; i++) {
      const cell    = cells[i];
      const styleId  = computeStyleId(cell, evalTime);
      const stamp    = cacheRef.current[`${cell.char}_${styleId}`];
      if (stamp) {
        const x = cell.col * cellW + cellW / 2;
        const y = cell.row * cellH + cellH / 2;
        ctx.drawImage(stamp, x - 32, y - 32);
      }
    }
  };

  // ── CSS scroll: moves the canvas wrapper up with seamless wrap ─────────────
  useEffect(() => {
    function onScroll() {
      // Position Shift
      const el = wrapperRef.current;
      if (el) {
        const wrapHeight = 40 * CELL_SIZE; // 1040px
        const shift = window.scrollY % wrapHeight;
        el.style.transform = `translateY(-${shift}px)`;
      }
    }

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Render loop — 20FPS full canvas redraw on desktop and mobile ─────────────
  useEffect(() => {
    if (!isInitialized || !fontLoaded) return;

    let frameId: number;
    const startTime    = Date.now();
    let lastTimeBucket = -1;

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

      const currentTime  = (Date.now() - startTime) / 1000;
      const timeBucket   = Math.floor(currentTime / 0.05);

      if (timeBucket !== lastTimeBucket) {
        lastTimeBucket = timeBucket;

        // Draw standard frame continuously using currentTime
        drawCanvas(currentTime);
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
        opacity: isInitialized ? 0.35 : 0,
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
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
    </div>
  );
}

function computeStyleId(cell: CellConfig, currentTime: number): string {
  if (cell.isWord) {
    const dropProgress = ((currentTime - cell.ddel) % cell.cycle) / cell.cycle;
    if (dropProgress < 0.04) return 'word_white';
    if (dropProgress < 0.10) return 'word_gold';
    if (dropProgress < 0.20) return 'word_orange';
    return 'word_dim';
  }
  const progress = ((currentTime - cell.del) % cell.dur) / cell.dur;
  const flickerDim =
    (progress >= 0.18 && progress <= 0.21) ||
    (progress >= 0.56 && progress <= 0.565);
  if (flickerDim || cell.brightness === 'dim') return 'dim_noise';
  if (cell.brightness === 'mid') return 'mid_noise';
  return 'bright_noise';
}
