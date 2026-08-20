function flatten(array $items): array
{
    $result = [];

    foreach ($items as $item) {
        if (is_array($item)) {
            foreach (flatten($item) as $nested) {
                $result[] = $nested;
            }
        } else {
            $result[] = $item;
        }
    }

    return $result;
}

function flattenUnique(array $items): array
{
    $seen = [];
    $result = [];

    foreach (flatten($items) as $item) {
        if (!in_array($item, $seen, true)) {
            $seen[] = $item;
            $result[] = $item;
        }
    }

    return $result;
}
