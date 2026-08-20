data class Reading(val station: String, val celsius: Double)

fun classify(reading: Reading): String {
    return when {
        reading.celsius < -10 -> "severe cold"
        reading.celsius < 5 -> "cold"
        reading.celsius < 18 -> "mild"
        reading.celsius < 28 -> "warm"
        else -> "hot"
    }
}

fun warmest(readings: List<Reading>): Reading? {
    return readings.maxByOrNull { reading -> reading.celsius }
}

fun stations(readings: List<Reading>): List<String> {
    return readings.map { reading -> reading.station }.distinct().sorted()
}
