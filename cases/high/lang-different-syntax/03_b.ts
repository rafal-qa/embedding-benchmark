export function bucketize(values: number[], boundaries: number[]): number[] {
  const counts = new Array(boundaries.length + 1).fill(0);

  for (const value of values) {
    let placed = false;

    for (let index = 0; index < boundaries.length; index++) {
      if (value < boundaries[index]) {
        counts[index] += 1;
        placed = true;
        break;
      }
    }

    if (!placed) {
      counts[boundaries.length] += 1;
    }
  }

  return counts;
}

export function labels(boundaries: number[]): string[] {
  const result: string[] = [];

  for (let index = 0; index < boundaries.length; index++) {
    if (index === 0) {
      result.push(`< ${boundaries[index]}`);
    } else {
      result.push(`${boundaries[index - 1]} - ${boundaries[index]}`);
    }
  }

  result.push(`>= ${boundaries[boundaries.length - 1]}`);
  return result;
}
