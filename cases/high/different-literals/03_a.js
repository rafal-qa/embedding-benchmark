const UNITS = ["B", "KB", "MB", "GB", "TB"];
const STEP = 1024;
const PRECISION = 2;

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
