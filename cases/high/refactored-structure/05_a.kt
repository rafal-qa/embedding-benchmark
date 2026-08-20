data class Square(val file: Int, val rank: Int)

val offsets = listOf(
    Pair(1, 2), Pair(2, 1), Pair(2, -1), Pair(1, -2),
    Pair(-1, -2), Pair(-2, -1), Pair(-2, 1), Pair(-1, 2)
)

fun knightMoves(from: Square): List<Square> {
    val moves = mutableListOf<Square>()

    for (offset in offsets) {
        val file = from.file + offset.first
        val rank = from.rank + offset.second

        val insideBoard = file in 0..7 && rank in 0..7

        if (insideBoard) {
            moves.add(Square(file, rank))
        }
    }

    val sorted = moves.sortedWith(compareBy({ it.file }, { it.rank }))
    return sorted
}
