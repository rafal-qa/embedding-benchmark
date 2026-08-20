export type Row = Record<string, string | number>;

export function pluck<T extends Row, K extends keyof T>(rows: T[], column: K): T[K][] {
  return rows.map((row) => row[column]);
}

export function firstValue<T extends Row, K extends keyof T>(rows: T[], column: K): T[K] {
  return rows[0]![column];
}

export function groupBy<T extends Row, K extends keyof T>(rows: T[], column: K): Map<T[K], T[]> {
  const groups = new Map<T[K], T[]>();

  for (const row of rows) {
    const key = row[column];
    const bucket = groups.get(key);

    if (bucket === undefined) {
      groups.set(key, [row]);
    } else {
      bucket.push(row);
    }
  }

  return groups;
}

export function columns(row: Row): string[] {
  return Object.keys(row);
}
