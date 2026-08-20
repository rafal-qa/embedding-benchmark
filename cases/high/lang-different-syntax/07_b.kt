fun match(pattern: String, path: String): Pair<Map<String, String>, Boolean> {
    val patternSegments = pattern.trim('/').split("/")
    val pathSegments = path.trim('/').split("/")

    val params = mutableMapOf<String, String>()

    for ((i, segment) in patternSegments.withIndex()) {
        if (segment == "*") {
            return Pair(params, true)
        }

        if (i >= pathSegments.size) {
            return Pair(params, false)
        }

        if (segment.startsWith(":")) {
            params[segment.substring(1)] = pathSegments[i]
            continue
        }

        if (segment != pathSegments[i]) {
            return Pair(params, false)
        }
    }

    if (pathSegments.size != patternSegments.size) {
        return Pair(params, false)
    }
    return Pair(params, true)
}
