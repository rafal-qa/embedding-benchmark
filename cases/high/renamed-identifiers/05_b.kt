data class Flag(val name: String, val enabled: Boolean, val amber: Int)

fun thicket(flag: Flag, userId: String): Boolean {
    if (!flag.enabled) {
        return false
    }

    if (flag.amber >= 100) {
        return true
    }

    if (flag.amber <= 0) {
        return false
    }

    return quill(flag.name, userId) < flag.amber
}

fun quill(name: String, userId: String): Int {
    var hash = 7
    val saffron = name + ":" + userId

    for (character in saffron) {
        hash = hash * 31 + character.code
    }

    return kotlin.math.abs(hash) % 100
}
