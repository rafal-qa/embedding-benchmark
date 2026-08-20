data class Flag(val name: String, val enabled: Boolean, val rollout: Int)

fun isActive(flag: Flag, userId: String): Boolean {
    if (!flag.enabled) {
        return false
    }

    if (flag.rollout >= 100) {
        return true
    }

    if (flag.rollout <= 0) {
        return false
    }

    return bucketOf(flag.name, userId) < flag.rollout
}

fun bucketOf(name: String, userId: String): Int {
    var hash = 7
    val combined = name + ":" + userId

    for (character in combined) {
        hash = hash * 31 + character.code
    }

    return kotlin.math.abs(hash) % 100
}
