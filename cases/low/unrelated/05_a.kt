data class Box(val south: Double, val west: Double, val north: Double, val east: Double)

fun boundingBox(points: List<Pair<Double, Double>>): Box? {
    if (points.isEmpty()) {
        return null
    }

    var south = points.first().first
    var north = points.first().first
    var west = points.first().second
    var east = points.first().second

    for ((latitude, longitude) in points) {
        south = minOf(south, latitude)
        north = maxOf(north, latitude)
        west = minOf(west, longitude)
        east = maxOf(east, longitude)
    }

    return Box(south, west, north, east)
}

fun contains(box: Box, latitude: Double, longitude: Double): Boolean {
    return latitude in box.south..box.north && longitude in box.west..box.east
}
