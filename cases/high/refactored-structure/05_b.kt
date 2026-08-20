data class Square(val file: Int, val rank: Int)

val offsets = listOf(
    Pair(1, 2), Pair(2, 1), Pair(2, -1), Pair(1, -2),
    Pair(-1, -2), Pair(-2, -1), Pair(-2, 1), Pair(-1, 2)
)

fun onBoard(file: Int, rank: Int): Boolean {
    return file in 0..7 && rank in 0..7
}

fun knightMoves(from: Square): List<Square> {
    val moves = mutableListOf<Square>()

    for (offset in offsets) {
        val file = from.file + offset.first
        val rank = from.rank + offset.second

        val insideBoard = onBoard(file, rank)

        if (insideBoard) {
            moves.add(Square(file, rank))
        }
    }

    return moves.sortedWith(compareBy({ it.file }, { it.rank }))
}
