type Swatch = { name: string; hex: string };
type Label = {
  key: string;
  value: string;
  active: boolean;
};

export function palette(swatches: Swatch[]): Record<string, string> {
  return Object.fromEntries(swatches.map((swatch) => [swatch.name, swatch.hex.toLowerCase()]));
}

export function nearest(swatches: Swatch[], red: number): Swatch | undefined {
  return [...swatches].sort((left, right) => {
    const leftValue = parseInt(left.hex.slice(1, 3), 16);
    const rightValue = parseInt(right.hex.slice(1, 3), 16);
    return Math.abs(leftValue - red) - Math.abs(rightValue - red);
  })[0];
}

export function labels(swatches: Swatch[]): Label[] {
  return swatches.map(({ name, hex }) => ({ key: name, value: hex, active: true }));
}
