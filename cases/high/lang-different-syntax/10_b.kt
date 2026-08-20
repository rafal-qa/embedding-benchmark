fun parse(text: String): Map<String, Map<String, String>> {
    val sections = mutableMapOf<String, MutableMap<String, String>>()
    var current = "default"
    sections[current] = mutableMapOf()

    for (rawLine in text.lines()) {
        val line = rawLine.trim()

        if (line.isEmpty() || line.startsWith(';')) {
            continue
        }

        if (line.startsWith('[') && line.endsWith(']')) {
            current = line.substring(1, line.length - 1).trim()
            sections.getOrPut(current) { mutableMapOf() }
            continue
        }

        val position = line.indexOf('=')
        if (position < 0) {
            continue
        }

        val key = line.substring(0, position).trim()
        val value = line.substring(position + 1).trim()
        sections.getValue(current)[key] = value
    }

    return sections
}
