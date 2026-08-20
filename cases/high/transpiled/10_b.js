export function pluck(rows, column) {
    return rows.map((row) => row[column]);
}
export function firstValue(rows, column) {
    return rows[0][column];
}
export function groupBy(rows, column) {
    const groups = new Map();
    for (const row of rows) {
        const key = row[column];
        const bucket = groups.get(key);
        if (bucket === undefined) {
            groups.set(key, [row]);
        }
        else {
            bucket.push(row);
        }
    }
    return groups;
}
export function columns(row) {
    return Object.keys(row);
}
