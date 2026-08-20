function channelLuminance(value) {
  const normalized = value / 255;

  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }

  return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(red, green, blue) {
  return (
    0.2126 * channelLuminance(red) +
    0.7152 * channelLuminance(green) +
    0.0722 * channelLuminance(blue)
  );
}

export function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first[0], first[1], first[2]);
  const secondLuminance = relativeLuminance(second[0], second[1], second[2]);

  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsAA(first, second) {
  return contrastRatio(first, second) >= 4.5;
}
