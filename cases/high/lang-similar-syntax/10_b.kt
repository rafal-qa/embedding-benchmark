data class Interval(val start: Int, val end: Int)

fun merge(intervals: List<Interval>): List<Interval> {
    val ordered = intervals.sortedBy { interval -> interval.start }
    val merged = mutableListOf<Interval>()

    for (interval in ordered) {
        if (merged.isEmpty()) {
            merged.add(interval)
            continue
        }

        val last = merged[merged.size - 1]

        if (interval.start > last.end) {
            merged.add(interval)
        } else {
            merged[merged.size - 1] = last.copy(end = maxOf(last.end, interval.end))
        }
    }

    return merged
}
