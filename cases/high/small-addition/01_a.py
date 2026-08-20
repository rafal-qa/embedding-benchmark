def parse_accept_language(header):
    if not header:
        return []

    entries = []

    for part in header.split(","):
        segments = part.split(";")
        tag = segments[0].strip()

        if not tag:
            continue

        quality = 1.0

        for segment in segments[1:]:
            trimmed = segment.strip()
            if trimmed.startswith("q="):
                quality = float(trimmed[2:])

        entries.append((tag, quality))

    entries.sort(key=lambda entry: -entry[1])
    return entries
