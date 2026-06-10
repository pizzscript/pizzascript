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


export function isReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


export function getScrollPercent(): number {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}

type LoadTask = () => Promise<void>;

class GlobalImageLoader {
  private queue: LoadTask[] = [];
  private activeCount = 0;
  private concurrencyLimit = 6;

  constructor(concurrencyLimit = 6) {
    this.concurrencyLimit = concurrencyLimit;
  }

  public add(task: LoadTask) {
    this.queue.push(task);
    this.runNext();
  }

  private runNext() {
    if (this.activeCount >= this.concurrencyLimit || this.queue.length === 0) {
      return;
    }

    const task = this.queue.shift();
    if (!task) return;

    this.activeCount++;
    task().finally(() => {
      this.activeCount--;
      this.runNext();
    });
  }
}

export const globalImageLoader = new GlobalImageLoader(12);


