export function flatten(items) {
  const result = [];

  for (const item of items) {
    if (Array.isArray(item)) {
      for (const nested of flatten(item)) {
        result.push(nested);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

export function flattenUnique(items) {
  const seen = [];
  const result = [];

  for (const item of flatten(items)) {
    if (!seen.includes(item)) {
      seen.push(item);
      result.push(item);
    }
  }

  return result;
}
