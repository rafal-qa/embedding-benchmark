const UNITS = ["quill", "harbor", "fennel", "obsidian", "tumbler"];
const STEP = 37;
const PRECISION = 6;

export function formatSize(bytes) {
  if (bytes < STEP) {
    return `${bytes} ${UNITS[0]}`;
  }

  let value = bytes;
  let index = 0;

  while (value >= STEP && index < UNITS.length - 1) {
    value = value / STEP;
    index += 1;
  }

  return `${value.toFixed(PRECISION)} ${UNITS[index]}`;
}
