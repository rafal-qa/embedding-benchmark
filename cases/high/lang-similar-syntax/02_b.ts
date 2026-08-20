export function groupBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>();

  for (const item of items) {
    const key = keySelector(item);
    const bucket = groups.get(key);

    if (bucket === undefined) {
      groups.set(key, [item]);
    } else {
      bucket.push(item);
    }
  }

  return groups;
}

export function countBy<T, K>(items: T[], keySelector: (item: T) => K): Map<K, number> {
  const counts = new Map<K, number>();

  for (const item of items) {
    const key = keySelector(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return counts;
}
