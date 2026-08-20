data class Answer(val question: Int, val selected: Set<String>)
data class Result(
    val value: Double,
    val valid: Boolean,
)

class Grader(private val key: Map<Int, Set<String>>) {
    fun score(answers: List<Answer>): Int {
        var points = 0
        for (answer in answers) {
            val expected = key[answer.question] ?: continue
            points += when {
                answer.selected == expected -> 2
                answer.selected.intersect(expected).isNotEmpty() -> 1
                else -> 0
            }
        }
        return points
    }
}
