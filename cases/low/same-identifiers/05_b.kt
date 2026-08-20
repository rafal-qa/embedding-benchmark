class Loan(private val today: Int) {
    private val loans = mutableListOf<List<Int>>()
    private var member = mutableListOf<Int>()

    fun renew(dueDay: Int) {
        if (member.isNotEmpty() && dueDay - member.last() > today) {
            loans += member
            member = mutableListOf()
        }
        member += dueDay
    }

    fun overdue(): List<Int> {
        if (member.isNotEmpty()) loans += member
        member = mutableListOf()
        return loans.map { renewals -> renewals.max() - renewals.min() }
    }
}
