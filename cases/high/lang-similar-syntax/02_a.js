export function groupBy(items, keySelector) {
  const groups = new Map();

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

export function countBy(items, keySelector) {
  const counts = new Map();

  for (const item of items) {
    const key = keySelector(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return counts;
}
