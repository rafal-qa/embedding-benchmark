def diff_records(previous, current):
    added = {}
    removed = {}
    changed = {}

    for key, value in current.items():
        if key not in previous:
            added[key] = value
        elif previous[key] != value:
            changed[key] = (previous[key], value)

    for key, value in previous.items():
        if key not in current:
            removed[key] = value

    return added, removed, changed


def summarize(added, removed, changed):
    parts = []

    if added:
        parts.append(f"{len(added)} added")
    if removed:
        parts.append(f"{len(removed)} removed")
    if changed:
        parts.append(f"{len(changed)} changed")

    if not parts:
        return "no differences"

    return ", ".join(parts)
