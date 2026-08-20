function f(a: number[]): boolean {
  const b = new Set<number>();

  for (const c of a) {
    if (b.has(c)) {
      return true;
    }

    b.add(c);
  }

  return false;
}
