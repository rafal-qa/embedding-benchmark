export function delayFor(attempt) {
    if (attempt <= 0) {
        return 0 /* Backoff.Immediate */;
    }
    if (attempt === 1) {
        return 1000 /* Backoff.Short */;
    }
    return Math.min(5000 /* Backoff.Long */ * attempt, 30000 /* Backoff.Ceiling */);
}
export function totalWait(attempts) {
    let total = 0;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        total += delayFor(attempt);
    }
    return total;
}
