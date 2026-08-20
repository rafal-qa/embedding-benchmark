function g(p) {
  const q = [];
  const r = p.slice().reverse();

  while (r.length > 0) {
    const s = r.pop();

    if (Array.isArray(s)) {
      r.push(...s.slice().reverse());
    } else {
      q.push(s);
    }
  }

  return q;
}
