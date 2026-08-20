function limit(int $value, int $minimum, int $maximum): int
{
    return max($minimum, min($value, $maximum));
}

function outline(string $document): array
{
    $tree = [];
    $trail = [];
    foreach (preg_split('/\R/', $document) as $line) {
        if (!preg_match('/^(#+)\s+(.+)$/', $line, $match)) {
            continue;
        }
        $depth = limit(strlen($match[1]), 1, 6);
        $trail = array_slice($trail, 0, $depth - 1);
        $trail[] = trim($match[2]);
        $tree[] = ['depth' => $depth, 'path' => implode(' / ', $trail)];
    }
    return $tree;
}
