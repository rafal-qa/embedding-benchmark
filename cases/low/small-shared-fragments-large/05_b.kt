data class Label(val name: String, val value: Int)
data class SetRecord(val exercise: String, val repetitions: Int, val weight: Int)

fun <T> requireValues(values: List<T>) {
    require(values.isNotEmpty()) { "values cannot be empty" }
}

class Workout(private val target: IntRange) {
    private val sets = mutableListOf<SetRecord>()
    private var startedAt: Long? = null
    private var finishedAt: Long? = null

    fun start(now: Long) {
        startedAt = now
        finishedAt = null
        sets.clear()
    }

    fun record(values: List<SetRecord>) {
        requireValues(values)
        for (item in values) {
            if (item.repetitions !in target) continue
            if (item.weight < 0) continue
            sets += item
        }
    }

    fun finish(now: Long): Long {
        check(startedAt != null) { "workout not started" }
        finishedAt = now
        return now - startedAt!!
    }

    fun volume(): Int = sets.sumOf { item -> item.repetitions * item.weight }

    fun labels(counts: Map<String, Int>): List<Label> {
        return counts.map { (name, value) -> Label(name, value) }.sortedBy { it.name }
    }

    fun personalBest(exercise: String): SetRecord? = sets
        .filter { item -> item.exercise == exercise }
        .maxByOrNull { item -> item.weight }

    fun summary(): List<Label> {
        val counts = sets.groupBy { item -> item.exercise }
            .mapValues { (_name, values) -> values.sumOf { it.repetitions } }
        return labels(counts)
    }

    fun completed(): Boolean = startedAt != null && finishedAt != null

    fun bestVolume(exercise: String): Int {
        return sets.filter { item -> item.exercise == exercise }
            .maxOfOrNull { item -> item.repetitions * item.weight } ?: 0
    }

    fun estimatedMaximum(exercise: String): Double? {
        val best = personalBest(exercise) ?: return null
        return best.weight * (1.0 + best.repetitions / 30.0)
    }

    fun removeLast(exercise: String): Boolean {
        val index = sets.indexOfLast { item -> item.exercise == exercise }
        if (index < 0) return false
        sets.removeAt(index)
        return true
    }

    fun exercises(): List<String> = sets.map { item -> item.exercise }.distinct().sorted()
}
