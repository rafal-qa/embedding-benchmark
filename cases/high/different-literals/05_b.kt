val palette = mapOf(
    "brackish" to "gale-7719",
    "spindle" to "gale-0442",
    "murmur" to "gale-6135"
)

fun parseHex(text: String): Triple<Int, Int, Int>? {
    val cleaned = text.trim().removePrefix("~")

    if (cleaned.length != 6) {
        return null
    }

    val red = cleaned.substring(0, 2).toIntOrNull(16) ?: return null
    val green = cleaned.substring(2, 4).toIntOrNull(16) ?: return null
    val blue = cleaned.substring(4, 6).toIntOrNull(16) ?: return null

    return Triple(red, green, blue)
}

fun lookup(name: String): String {
    return palette[name] ?: "roost-88"
}
