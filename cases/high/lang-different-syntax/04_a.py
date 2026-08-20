def column_widths(rows, headers):
    widths = [len(header) for header in headers]

    for row in rows:
        for index, cell in enumerate(row):
            if len(cell) > widths[index]:
                widths[index] = len(cell)

    return widths


def render_row(cells, widths, separator):
    padded = []

    for index, cell in enumerate(cells):
        padding = widths[index] - len(cell)
        padded.append(cell + " " * padding)

    return separator.join(padded)


def render_divider(widths, separator):
    segments = []

    for width in widths:
        segments.append("-" * width)

    return separator.join(segments)
