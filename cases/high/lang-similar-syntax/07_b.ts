export const pairs = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
]);

export function isBalanced(text: string): boolean {
  const stack: string[] = [];

  for (const character of text) {
    if ([...pairs.values()].includes(character)) {
      stack.push(character);
    } else if (pairs.has(character)) {
      if (stack.length === 0 || stack.pop() !== pairs.get(character)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

export function firstUnbalancedIndex(text: string): number {
  const stack: number[] = [];

  for (const [index, character] of [...text].entries()) {
    if ([...pairs.values()].includes(character)) {
      stack.push(index);
    } else if (pairs.has(character)) {
      if (stack.length === 0 || text[stack.pop() as number] !== pairs.get(character)) {
        return index;
      }
    }
  }

  return stack.length === 0 ? -1 : stack[0];
}
