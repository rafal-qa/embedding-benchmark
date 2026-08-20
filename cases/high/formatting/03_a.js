function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function deepMerge(target, source) {
  const output = { ...target };

  for (const key of Object.keys(source)) {
    const incoming = source[key];
    const current = output[key];

    if (isPlainObject(current) && isPlainObject(incoming)) {
      output[key] = deepMerge(current, incoming);
    } else if (Array.isArray(current) && Array.isArray(incoming)) {
      output[key] = [...current, ...incoming];
    } else {
      output[key] = incoming;
    }
  }

  return output;
}
