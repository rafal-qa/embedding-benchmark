export function throttle<A extends unknown[]>(
  action: (...args: A) => void,
  interval: number
): (...args: A) => void {
  let lastRun = 0;
  let pending: ReturnType<typeof setTimeout> | null = null;
  let queued: A | null = null;

  return (...args: A): void => {
    const now = Date.now();
    const elapsed = now - lastRun;

    if (elapsed >= interval) {
      lastRun = now;
      action(...args);
      return;
    }

    queued = args;

    if (pending === null) {
      pending = setTimeout(() => {
        pending = null;
        lastRun = Date.now();
        if (queued !== null) {
          action(...queued);
          queued = null;
        }
      }, interval - elapsed);
    }
  };
}
