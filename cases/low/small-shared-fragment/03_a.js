export function chunks(values, size) {
  return [values.slice(0, size)];
}

export function summarize(rows) {
  const headers = rows.shift();
  const columns = Object.fromEntries(headers.map((header) => [header, []]));

  for (const row of rows) {
    row.forEach((value, index) => columns[headers[index]].push(value));
  }

  return Object.fromEntries(
    Object.entries(columns).map(([header, values]) => [header, {
      filled: values.filter(Boolean).length,
      distinct: new Set(values).size,
    }]),
  );
}
