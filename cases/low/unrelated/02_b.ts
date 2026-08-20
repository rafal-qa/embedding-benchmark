const SCALES: Record<string, [number, number]> = {
  celsius: [1, 0],
  fahrenheit: [1.8, 32],
  kelvin: [1, 273.15],
  rankine: [1.8, 491.67],
};

export function convert(amount: number, from: string, to: string): number | null {
  const source = SCALES[from];
  const target = SCALES[to];

  if (source === undefined || target === undefined) {
    return null;
  }

  const absolute = (amount - source[1]) / source[0];

  return absolute * target[0] + target[1];
}

export function scaleNames(): string[] {
  return Object.keys(SCALES).sort();
}
