function g(string $p): bool
{
    $q = array_reverse(str_split($p));

    $r = array_map(
        function (int $s, string $t): int {
            if ($s % 2 === 0) {
                return (int) $t;
            }

            $u = (int) $t * 2;

            return array_sum(str_split((string) $u));
        },
        array_keys($q),
        $q
    );

    return array_sum($r) % 10 === 0;
}
