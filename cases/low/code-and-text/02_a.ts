export function toMap(input: string): Map<string, string> {
  const result = new Map<string, string>();

  for (const chunk of input.split(";")) {
    const marker = chunk.indexOf("=");

    if (marker <= 0) {
      continue;
    }

    const left = chunk.slice(0, marker).trim();
    const right = chunk.slice(marker + 1).trim();

    if (left.length > 0) {
      result.set(left, right);
    }
  }

  return result;
}
