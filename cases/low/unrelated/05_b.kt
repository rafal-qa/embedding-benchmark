private const val ALPHABET = "abcdefghijklmnopqrstuvwxyz"

fun shift(message: String, places: Int): String {
    val builder = StringBuilder()

    for (symbol in message) {
        val position = ALPHABET.indexOf(symbol.lowercaseChar())

        if (position < 0) {
            builder.append(symbol)
            continue
        }

        val moved = (position + places % ALPHABET.length + ALPHABET.length) % ALPHABET.length
        val replacement = ALPHABET[moved]

        builder.append(if (symbol.isUpperCase()) replacement.uppercaseChar() else replacement)
    }

    return builder.toString()
}

fun unshift(message: String, places: Int): String {
    return shift(message, -places)
}
