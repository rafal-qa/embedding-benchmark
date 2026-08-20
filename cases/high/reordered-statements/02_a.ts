export function add(left: number[], right: number[]): number[] {
  const result: number[] = [];
  const length = Math.min(left.length, right.length);

  for (let index = 0; index < length; index++) {
    result.push(left[index] + right[index]);
  }

  return result;
}

export function dot(left: number[], right: number[]): number {
  let total = 0;
  const length = Math.min(left.length, right.length);

  for (let index = 0; index < length; index++) {
    total += left[index] * right[index];
  }

  return total;
}

export function norm(values: number[]): number {
  let total = 0;
  const count = values.length;

  for (let index = 0; index < count; index++) {
    total += values[index] * values[index];
  }

  return Math.sqrt(total);
}

export function scale(values: number[], factor: number): number[] {
  const result: number[] = [];
  const count = values.length;

  for (let index = 0; index < count; index++) {
    result.push(values[index] * factor);
  }

  return result;
}
