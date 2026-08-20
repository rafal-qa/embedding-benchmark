export function parseCookies(header) {
  const jar = {};

  if (!header) {
    return jar;
  }

  for (const segment of header.split(";")) {
    const separator = segment.indexOf("=");

    if (separator < 0) {
      continue;
    }

    const name = segment.slice(0, separator).trim();
    const raw = segment.slice(separator + 1).trim();

    if (name.length > 0) {
      jar[name] = decodeURIComponent(raw);
    }
  }

  return jar;
}

export function serializeCookie(name, value, options) {
  const pieces = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    pieces.push(`Max-Age=${options.maxAge}`);
  }
  if (options.path !== undefined) {
    pieces.push(`Path=${options.path}`);
  }
  if (options.secure) {
    pieces.push("Secure");
  }

  return pieces.join("; ");
}
