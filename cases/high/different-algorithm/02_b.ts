function g(p: number[]): boolean {
  const q = [...p].sort((r, s) => r - s);

  for (let t = 1; t < q.length; t += 1) {
    if (q[t] === q[t - 1]) {
      return true;
    }
  }

  return false;
}
