function parseHex(input) {
  const text = String(input).trim().replace("#", "");

  if (text.length !== 3 && text.length !== 6) {
    return null;
  }

  const expanded =
    text.length === 3
      ? text
          .split("")
          .map((symbol) => symbol + symbol)
          .join("")
      : text;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    return null;
  }

  return {
    red: parseInt(expanded.slice(0, 2), 16),
    green: parseInt(expanded.slice(2, 4), 16),
    blue: parseInt(expanded.slice(4, 6), 16),
  };
}

function toHex(rgb) {
  const parts = [rgb.red, rgb.green, rgb.blue];

  return "#" + parts.map((part) => clampByte(part).toString(16).padStart(2, "0")).join("");
}

function clampByte(value) {
  if (value < 0) {
    return 0;
  }

  return value > 255 ? 255 : Math.round(value);
}

function luminance(rgb) {
  return (0.2126 * rgb.red + 0.7152 * rgb.green + 0.0722 * rgb.blue) / 255;
}
