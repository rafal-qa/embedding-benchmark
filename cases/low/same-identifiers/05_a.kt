data class Loan(val member: String, val dueDay: Int, val renewals: Int)

fun renew(loans: List<Loan>, member: String, today: Int): List<Loan> {
    return loans.map { loan ->
        if (loan.member == member && loan.dueDay >= today && loan.renewals < 2) {
            loan.copy(dueDay = loan.dueDay + 14, renewals = loan.renewals + 1)
        } else {
            loan
        }
    }
}

fun overdue(loans: List<Loan>, today: Int): List<String> {
    return loans.filter { loan -> loan.dueDay < today }.map { loan -> loan.member }.distinct()
}
