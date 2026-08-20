const UNKNOWN = "unknown";

export class Messages {
  constructor(fallback) {
    this.fallback = fallback;
    this.catalogs = new Map();
  }

  load(locale, entries) {
    const clean = new Map();
    for (const [key, value] of Object.entries(entries)) {
      if (present(value) && typeof value === "string" && value.trim() !== "") clean.set(key, value);
    }
    this.catalogs.set(locale, clean);
  }

  lookup(locale, key) {
    const local = this.catalogs.get(locale);
    if (local?.has(key)) return local.get(key);
    return this.catalogs.get(this.fallback)?.get(key) ?? UNKNOWN;
  }

  render(locale, key, variables = {}) {
    let message = this.lookup(locale, key);
    for (const [name, value] of Object.entries(variables)) {
      message = message.replaceAll(`{${name}}`, String(value));
    }
    return message;
  }

  missing(locale) {
    const fallback = this.catalogs.get(this.fallback) ?? new Map();
    const local = this.catalogs.get(locale) ?? new Map();
    return [...fallback.keys()].filter((key) => !local.has(key));
  }

  merge(locale, source) {
    const target = this.catalogs.get(locale) ?? new Map();
    for (const [key, value] of source) {
      if (!target.has(key)) target.set(key, value);
    }
    this.catalogs.set(locale, target);
  }

  placeholders(locale) {
    const result = new Map();
    for (const [key, message] of this.catalogs.get(locale) ?? []) {
      const names = [...message.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
      result.set(key, [...new Set(names)].sort());
    }
    return result;
  }
}

export function present(value) {
  return value !== null && value !== undefined;
}

export function copy(values) {
  return values.map((value) => ({ ...value }));
}

export function names(values) {
  return values.map((value) => value.name).filter(present).sort();
}

export function coverage(messages, locales) {
  const result = {};
  for (const locale of locales) result[locale] = messages.missing(locale).length;
  return result;
}

export function localeNames(messages) {
  return names([...messages.catalogs.keys()].map((name) => ({ name })));
}
