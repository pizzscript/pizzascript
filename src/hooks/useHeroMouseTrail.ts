import { useEffect } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  decay: number;
}

/**
 * Captures the live MatrixBackground canvas and reveals it on top of the
 * hero image sequence wherever the mouse moves.
 *
 * How it works:
 * 1. Draws a fading radial-gradient mask at each mouse trail position
 * 2. Composites the real matrix canvas content with `source-in` so only
 *    the masked area is visible
 * 3. The overlay canvas has CSS `mix-blend-mode: screen`, filtering out
 *    the dark background and showing only the bright glowing characters
 *
 * Desktop only (>= 1024px). Zero CPU when mouse is stationary.
 */
export function useHeroMouseTrail(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: TrailParticle[] = [];
    let isLoopRunning = false;
    let isDestroyed = false;
    let lastMouseX: number | null = null;
    let lastMouseY: number | null = null;

    // Pre-render the soft radial gradient to an offscreen canvas for extreme performance (blitting is ~10-20x faster)
    const offscreen = document.createElement('canvas');
    offscreen.width = 256;
    offscreen.height = 256;
    const offCtx = offscreen.getContext('2d');
    if (offCtx) {
      const grad = offCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, 256, 256);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Setting canvas.width/height resets all state including transforms
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    function drawFrame() {
      if (isDestroyed || !ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (particles.length === 0) {
        isLoopRunning = false;
        return;
      }

      // Find the live matrix background canvas
      const matrixCanvas = document.getElementById('matrix-canvas') as HTMLCanvasElement | null;

      // Step 1: Draw the hover trail mask — smooth brush using pre-rendered offscreen canvas for extreme performance
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(offscreen, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      }
      ctx.restore();

      // Step 2: Composite the live matrix canvas into the mask
      if (matrixCanvas && matrixCanvas.width > 0 && matrixCanvas.height > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-in';

        // The matrix canvas uses DPR scaling and wraps vertically
        const dpr = window.devicePixelRatio || 1;
        const cellSize = 26; // desktop cell size
        const wrapHeight = 40 * cellSize; // 1040px logical wrap
        const shift = window.scrollY % wrapHeight;

        // Source region: the visible portion of the matrix canvas (in pixel coords)
        const sx = 0;
        const sy = shift * dpr;
        const sw = matrixCanvas.width;
        const sh = rect.height * dpr;

        // Destination: fill the entire trail canvas (in CSS coords, ctx is scaled)
        ctx.drawImage(matrixCanvas, sx, sy, sw, sh, 0, 0, rect.width, rect.height);

        ctx.restore();
      }

      // Step 3: Decay particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].alpha -= particles[i].decay;
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        requestAnimationFrame(drawFrame);
      } else {
        isLoopRunning = false;
        // Final clear when all particles gone
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    }

    function spawnParticle(px: number, py: number) {
      particles.push({
        x: px,
        y: py,
        radius: Math.random() * 60 + 100, // 100–160px (2x larger) for a wide, extremely soft brush
        alpha: 0.5,
        decay: Math.random() * 0.04 + 0.07, // 2x slower fade: ~0.15–0.25s
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      // Suppress matrix background spotlight over this section
      (window as any).__disableMatrixSpotlight = true;

      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (lastMouseX === null || lastMouseY === null) {
        spawnParticle(currentX, currentY);
      } else {
        const dx = currentX - lastMouseX;
        const dy = currentY - lastMouseY;
        const dist = Math.hypot(dx, dy);

        // Spacing increased to 24px (since radius is large) to spawn fewer particles and prevent drag lag
        const spacing = 24;
        if (dist > spacing) {
          const steps = Math.floor(dist / spacing);
          for (let i = 1; i <= steps; i++) {
            const ratio = i / steps;
            spawnParticle(lastMouseX + dx * ratio, lastMouseY + dy * ratio);
          }
        } else {
          spawnParticle(currentX, currentY);
        }
      }

      lastMouseX = currentX;
      lastMouseY = currentY;

      if (!isLoopRunning) {
        isLoopRunning = true;
        drawFrame();
      }
    };

    const handleMouseLeave = () => {
      lastMouseX = null;
      lastMouseY = null;
      // Re-enable matrix background spotlight when leaving hero section
      (window as any).__disableMatrixSpotlight = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isDestroyed = true;
      (window as any).__disableMatrixSpotlight = false;
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef, containerRef]);
}
