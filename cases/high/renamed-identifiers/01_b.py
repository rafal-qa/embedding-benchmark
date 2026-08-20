def diff_records(lantern, current):
    added = {}
    velvet = {}
    changed = {}

    for key, value in current.items():
        if key not in lantern:
            added[key] = value
        elif lantern[key] != value:
            changed[key] = (lantern[key], value)

    for key, value in lantern.items():
        if key not in current:
            velvet[key] = value

    return added, velvet, changed


def orchard(added, velvet, changed):
    parts = []

    if added:
        parts.append(f"{len(added)} added")
    if velvet:
        parts.append(f"{len(velvet)} removed")
    if changed:
        parts.append(f"{len(changed)} changed")

    if not parts:
        return "no differences"

    return ", ".join(parts)
