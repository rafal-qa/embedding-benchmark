val pairs = mapOf(')' to '(', ']' to '[', '}' to '{')

fun isBalanced(text: String): Boolean {
    val stack = ArrayDeque<Char>()

    for (character in text) {
        if (character in pairs.values) {
            stack.addLast(character)
        } else if (character in pairs.keys) {
            if (stack.isEmpty() || stack.removeLast() != pairs[character]) {
                return false
            }
        }
    }

    return stack.isEmpty()
}

fun firstUnbalancedIndex(text: String): Int {
    val stack = ArrayDeque<Int>()

    for ((index, character) in text.withIndex()) {
        if (character in pairs.values) {
            stack.addLast(index)
        } else if (character in pairs.keys) {
            if (stack.isEmpty() || text[stack.removeLast()] != pairs[character]) {
                return index
            }
        }
    }

    return if (stack.isEmpty()) -1 else stack.first()
}
