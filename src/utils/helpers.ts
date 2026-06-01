/* ============================================
   🍕 PIZZA SCRIPT — Utilities
   Shared helper functions (TypeScript).
   ============================================ */

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let last = 0;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

<<<<<<< HEAD
=======
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
export function isReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

<<<<<<< HEAD
=======
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
export function getScrollPercent(): number {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}
<<<<<<< HEAD
=======

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
>>>>>>> 50d74942736eff6c8c9a49b5f069202d1d28c8f1
