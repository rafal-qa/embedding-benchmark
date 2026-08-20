export function slidingMax(items: number[], window: number): number[] {
  const result: number[] = [];
  const indices: number[] = [];

  for (let index = 0; index < items.length; index++) {
    while (indices.length > 0) {
      const front = indices[0];
      if (front + window <= index) {
        indices.shift();
      } else {
        break;
      }
    }

    while (indices.length > 0) {
      const back = indices[indices.length - 1];
      if (items[back] <= items[index]) {
        indices.pop();
      } else {
        break;
      }
    }

    indices.push(index);

    if (index + 1 >= window) {
      result.push(items[indices[0]]);
    }
  }

  return result;
}
