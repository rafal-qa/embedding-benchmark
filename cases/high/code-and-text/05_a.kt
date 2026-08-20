data class Node(val value: Int, val children: List<Node>)

fun collect(node: Node, depth: Int = 0): List<Pair<Int, Int>> {
    val here = listOf(node.value to depth)

    if (node.children.isEmpty()) {
        return here
    }

    return here + node.children.flatMap { child -> collect(child, depth + 1) }
}

fun deepest(node: Node): Int {
    return collect(node).maxOf { pair -> pair.second }
}
