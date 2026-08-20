fun f(a: String): Boolean {
    val b = mapOf(')' to '(', ']' to '[', '}' to '{')
    val c = ArrayDeque<Char>()

    for (d in a) {
        if (d in "([{") {
            c.addLast(d)
        } else if (d in ")]}") {
            if (c.isEmpty() || c.removeLast() != b[d]) {
                return false
            }
        }
    }

    return c.isEmpty()
}
