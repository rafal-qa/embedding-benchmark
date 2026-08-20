const enum Backoff {
  Immediate = 0,
  Short = 1000,
  Long = 5000,
  Ceiling = 30000,
}

export function delayFor(attempt: number): number {
  if (attempt <= 0) {
    return Backoff.Immediate;
  }

  if (attempt === 1) {
    return Backoff.Short;
  }

  return Math.min(Backoff.Long * attempt, Backoff.Ceiling);
}

export function totalWait(attempts: number): number {
  let total = 0;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    total += delayFor(attempt);
  }

  return total;
}
