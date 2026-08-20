def bucketize(values, boundaries):
    counts = [0] * (len(boundaries) + 1)

    for value in values:
        placed = False

        for index, boundary in enumerate(boundaries):
            if value < boundary:
                counts[index] += 1
                placed = True
                break

        if not placed:
            counts[len(boundaries)] += 1

    return counts


def labels(boundaries):
    result = []

    for index, boundary in enumerate(boundaries):
        if index == 0:
            result.append(f"< {boundary}")
        else:
            result.append(f"{boundaries[index - 1]} - {boundary}")

    result.append(f">= {boundaries[len(boundaries) - 1]}")
    return result
