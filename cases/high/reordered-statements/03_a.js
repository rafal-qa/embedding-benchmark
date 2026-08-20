const PATTERN = /\{\{(\w+)\}\}/g;
const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

export function escapeHtml(text) {
  const source = String(text);
  let output = "";

  for (const character of source) {
    const replacement = ESCAPES[character];
    output += replacement === undefined ? character : replacement;
  }

  return output;
}

export function render(template, values) {
  const missing = [];

  const output = template.replace(PATTERN, (match, name) => {
    const value = values[name];

    if (value === undefined) {
      missing.push(name);
      return match;
    }

    return escapeHtml(String(value));
  });

  return { output, missing };
}
