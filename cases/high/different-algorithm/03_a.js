function f(a) {
  if (a.length === 0) {
    return [];
  }

  const [b, ...c] = a;
  const d = Array.isArray(b) ? f(b) : [b];

  return d.concat(f(c));
}
