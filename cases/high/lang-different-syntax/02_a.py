def distance(source, target):
    if source == target:
        return 0

    if len(source) == 0:
        return len(target)

    if len(target) == 0:
        return len(source)

    previous = list(range(len(target) + 1))
    current = [0] * (len(target) + 1)

    for i in range(len(source)):
        current[0] = i + 1

        for j in range(len(target)):
            deletion = previous[j + 1] + 1
            insertion = current[j] + 1
            substitution = previous[j] + (0 if source[i] == target[j] else 1)
            current[j + 1] = min(deletion, insertion, substitution)

        previous = current[:]

    return previous[len(target)]
