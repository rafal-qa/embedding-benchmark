const FACTORS = {
  px: 1,
  pt: 96 / 72,
  pc: 16,
  in: 96,
  cm: 96 / 2.54,
  mm: 96 / 25.4,
};

function parseLength(input) {
  const text = String(input).trim().toLowerCase();

  if (text === "" || text === "auto") {
    return { amount: 0, unit: "px", auto: true };
  }

  const match = text.match(/^(-?\d*\.?\d+)([a-z%]*)$/);

  if (match === null) {
    return null;
  }

  const amount = Number(match[1]);
  const unit = match[2] === "" ? "px" : match[2];

  if (!Number.isFinite(amount)) {
    return null;
  }

  if (unit !== "%" && FACTORS[unit] === undefined) {
    return null;
  }

  return { amount, unit, auto: false };
}

function toPixels(length, basis) {
  if (length === null || length.auto) {
    return 0;
  }

  if (length.unit === "%") {
    if (!Number.isFinite(basis)) {
      return 0;
    }

    return (length.amount / 100) * basis;
  }

  return length.amount * FACTORS[length.unit];
}

function fromPixels(pixels, unit) {
  if (unit === "%") {
    return null;
  }

  const factor = FACTORS[unit];

  if (factor === undefined) {
    return null;
  }

  return { amount: pixels / factor, unit, auto: false };
}

function add(left, right, basis) {
  const total = toPixels(parseLength(left), basis) + toPixels(parseLength(right), basis);

  return total;
}

function subtract(left, right, basis) {
  return toPixels(parseLength(left), basis) - toPixels(parseLength(right), basis);
}

function scale(value, multiplier, basis) {
  const parsed = parseLength(value);

  if (parsed === null) {
    return 0;
  }

  return toPixels(parsed, basis) * multiplier;
}

function clamp(value, lowest, highest, basis) {
  const pixels = toPixels(parseLength(value), basis);
  const low = toPixels(parseLength(lowest), basis);
  const high = toPixels(parseLength(highest), basis);

  if (low > high) {
    return low;
  }

  if (pixels < low) {
    return low;
  }

  if (pixels > high) {
    return high;
  }

  return pixels;
}

function format(pixels, unit, places) {
  const converted = fromPixels(pixels, unit);

  if (converted === null) {
    return `${round(pixels, places)}px`;
  }

  return `${round(converted.amount, places)}${unit}`;
}

function round(value, places) {
  const factor = Math.pow(10, places);

  return Math.round(value * factor) / factor;
}

function isZero(value, basis) {
  return toPixels(parseLength(value), basis) === 0;
}

function resolveAll(values, basis, unit) {
  const output = {};

  for (const key of Object.keys(values)) {
    const pixels = toPixels(parseLength(values[key]), basis);
    output[key] = format(pixels, unit, 2);
  }

  return output;
}
