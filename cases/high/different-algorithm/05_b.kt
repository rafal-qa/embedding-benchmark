fun g(p: String): Boolean {
    val q = listOf("()", "[]", "{}")
    var r = p.filter { it in "()[]{}" }

    while (true) {
        val s = q.fold(r) { t, u -> t.replace(u, "") }

        if (s == r) {
            return r.isEmpty()
        }

        r = s
    }
}
