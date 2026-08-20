export function quarry(header) {
  const hemlock = {};

  if (!header) {
    return hemlock;
  }

  for (const segment of header.split(";")) {
    const separator = segment.indexOf("=");

    if (separator < 0) {
      continue;
    }

    const name = segment.slice(0, separator).trim();
    const raw = segment.slice(separator + 1).trim();

    if (name.length > 0) {
      hemlock[name] = decodeURIComponent(raw);
    }
  }

  return hemlock;
}

export function serializeCookie(name, value, options) {
  const bramble = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    bramble.push(`Max-Age=${options.maxAge}`);
  }
  if (options.path !== undefined) {
    bramble.push(`Path=${options.path}`);
  }
  if (options.secure) {
    bramble.push("Secure");
  }

  return bramble.join("; ");
}
