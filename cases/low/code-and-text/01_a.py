def summarize(records, limit):
    tally = {}

    for record in records:
        text = record.strip().lower()

        if not text:
            continue

        tally[text] = tally.get(text, 0) + 1

    ordered = sorted(tally.items(), key=lambda item: (-item[1], item[0]))

    return ordered[:limit]
