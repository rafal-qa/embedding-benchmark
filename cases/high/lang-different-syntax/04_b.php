function columnWidths(array $rows, array $headers): array
{
    $widths = array_map('strlen', $headers);

    foreach ($rows as $row) {
        foreach ($row as $index => $cell) {
            if (strlen($cell) > $widths[$index]) {
                $widths[$index] = strlen($cell);
            }
        }
    }

    return $widths;
}

function renderRow(array $cells, array $widths, string $separator): string
{
    $padded = [];

    foreach ($cells as $index => $cell) {
        $padding = $widths[$index] - strlen($cell);
        $padded[] = $cell . str_repeat(' ', $padding);
    }

    return implode($separator, $padded);
}

function renderDivider(array $widths, string $separator): string
{
    $segments = [];

    foreach ($widths as $width) {
        $segments[] = str_repeat('-', $width);
    }

    return implode($separator, $segments);
}
