data class Point(val latitude: Double, val longitude: Double)
data class Result(
    val value: Double,
    val valid: Boolean,
)

fun distance(points: List<Point>): Double {
    return points.zipWithNext().sumOf { (left, right) ->
        val north = right.latitude - left.latitude
        val east = right.longitude - left.longitude
        kotlin.math.sqrt(north * north + east * east)
    }
}

fun center(points: List<Point>): Point = Point(
    points.map { it.latitude }.average(),
    points.map { it.longitude }.average(),
)
