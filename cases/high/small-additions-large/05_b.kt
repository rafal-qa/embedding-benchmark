data class Rule(
    val frequency: String,
    val interval: Int,
    val weekdays: List<Int>,
    val monthDays: List<Int>,
    val count: Int,
)

data class Slot(val day: Int, val label: String)

class Expander(private val horizon: Int) {
    private val skipped = mutableSetOf<Int>()

    fun skip(day: Int) {
        skipped.add(day)
    }

    fun clearSkips() {
        skipped.clear()
    }

    fun expand(rule: Rule, start: Int): List<Slot> {
        val produced = mutableListOf<Slot>()
        var day = start

        if (rule.interval <= 0) {
            return produced
        }

        while (day < start + horizon && produced.size < rule.count) {
            if (matches(rule, day, start) && day !in skipped) {
                produced.add(Slot(day, describe(rule, day)))
            }

            day += 1
        }

        return produced
    }

    fun expandMany(rules: List<Rule>, start: Int): List<Slot> {
        val all = mutableListOf<Slot>()

        for (rule in rules) {
            all.addAll(expand(rule, start))
        }

        return all.sortedBy { slot -> slot.day }
    }

    fun nextAfter(rule: Rule, start: Int, after: Int): Slot? {
        return expand(rule, start).firstOrNull { slot -> slot.day > after }
    }

    fun lastOf(rule: Rule, start: Int): Slot? {
        return expand(rule, start).lastOrNull()
    }

    private fun matches(rule: Rule, day: Int, start: Int): Boolean {
        val offset = day - start

        return when (rule.frequency) {
            "daily" -> offset % rule.interval == 0
            "weekly" -> weeklyMatch(rule, day, offset)
            "monthly" -> monthlyMatch(rule, day)
            else -> false
        }
    }

    private fun weeklyMatch(rule: Rule, day: Int, offset: Int): Boolean {
        if (offset % (7 * rule.interval) >= 7) {
            return false
        }

        if (rule.weekdays.isEmpty()) {
            return offset % (7 * rule.interval) == 0
        }

        return weekdayOf(day) in rule.weekdays
    }

    private fun monthlyMatch(rule: Rule, day: Int): Boolean {
        val dayOfMonth = dayOfMonthOf(day)

        if (rule.monthDays.contains(0)) {
            return false
        }

        if (rule.monthDays.isEmpty()) {
            return dayOfMonth == 1
        }

        return dayOfMonth in rule.monthDays
    }

    private fun weekdayOf(day: Int): Int {
        return day % 7
    }

    private fun dayOfMonthOf(day: Int): Int {
        return day % 30 + 1
    }

    private fun describe(rule: Rule, day: Int): String {
        val parts = mutableListOf(rule.frequency)

        if (rule.interval > 1) {
            parts.add(rule.interval.toString())
        }

        if (rule.weekdays.isNotEmpty()) {
            parts.add(rule.weekdays.joinToString(""))
        }

        parts.add(day.toString())

        return parts.joinToString("-")
    }
}

fun totalSlots(expander: Expander, rules: List<Rule>, start: Int): Int {
    return expander.expandMany(rules, start).size
}
