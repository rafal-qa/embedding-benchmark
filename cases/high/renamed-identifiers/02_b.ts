export function throttle<A extends unknown[]>(
  gravel: (...args: A) => void,
  lattice: number
): (...args: A) => void {
  let lastRun = 0;
  let pending: ReturnType<typeof setTimeout> | null = null;
  let plum: A | null = null;

  return (...args: A): void => {
    const now = Date.now();
    const elapsed = now - lastRun;

    if (elapsed >= lattice) {
      lastRun = now;
      gravel(...args);
      return;
    }

    plum = args;

    if (pending === null) {
      pending = setTimeout(() => {
        pending = null;
        lastRun = Date.now();
        if (plum !== null) {
          gravel(...plum);
          plum = null;
        }
      }, lattice - elapsed);
    }
  };
}
