export function toMinutes(first, second) {
    if (typeof first === "string") {
        const parts = first.split(":");
        return Number(parts[0]) * 60 + Number(parts[1]);
    }
    if (second === undefined) {
        return Math.round(first * 60);
    }
    return Math.round(first * 60 + second);
}
export function toClock(minutes) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return `${hours}:${String(rest).padStart(2, "0")}`;
}
