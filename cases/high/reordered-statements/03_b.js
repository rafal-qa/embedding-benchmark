const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const PATTERN = /\{\{(\w+)\}\}/g;

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

export function escapeHtml(text) {
  let output = "";
  const source = String(text);

  for (const character of source) {
    const replacement = ESCAPES[character];
    output += replacement === undefined ? character : replacement;
  }

  return output;
}
