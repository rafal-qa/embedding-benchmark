final class Label
{
    public function __construct(public string $name, public int $value) {}
}

function requireIdentifier(string $value): void
{
    if ($value === '') throw new InvalidArgumentException('identifier cannot be empty');
}

function inspectTree(string $root): array
{
    requireIdentifier($root);
    $directories = [[$root, 0]];
    $rows = [];
    while ($directories !== []) {
        [$path, $depth] = array_pop($directories);
        $children = @scandir($path);
        if ($children === false) continue;
        $size = 0;
        $files = 0;
        foreach ($children as $child) {
            if ($child === '.' || $child === '..') continue;
            $target = $path . DIRECTORY_SEPARATOR . $child;
            if (is_dir($target)) {
                $directories[] = [$target, $depth + 1];
            } else {
                $size += filesize($target) ?: 0;
                $files++;
            }
        }
        $rows[] = ['path' => $path, 'depth' => $depth, 'files' => $files, 'size' => $size];
    }
    usort($rows, fn ($left, $right) => $left['path'] <=> $right['path']);
    return $rows;
}

function largest(array $rows, int $limit): array
{
    usort($rows, fn ($left, $right) => $right['size'] <=> $left['size']);
    return array_slice($rows, 0, $limit);
}

function depthLabels(array $rows): array
{
    $groups = [];
    foreach ($rows as $row) $groups[$row['depth']][] = new Label((string) $row['depth'], $row['files']);
    return flatten($groups);
}

function totals(array $rows): array
{
    return [
        'directories' => count($rows),
        'files' => array_sum(array_column($rows, 'files')),
        'size' => array_sum(array_column($rows, 'size')),
        'depth' => max(array_column($rows, 'depth') ?: [0]),
    ];
}

function extensions(string $root): array
{
    $counts = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
    foreach ($iterator as $file) {
        if (!$file->isFile()) continue;
        $extension = strtolower($file->getExtension()) ?: '(none)';
        $counts[$extension] = ($counts[$extension] ?? 0) + 1;
    }
    arsort($counts);
    return $counts;
}

function flatten(array $groups): array
{
    return array_merge([], ...$groups);
}
