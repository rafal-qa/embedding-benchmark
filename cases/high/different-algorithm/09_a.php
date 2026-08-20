function f(string $a): bool
{
    $b = strlen($a);
    $c = 0;

    for ($d = 0; $d < $b; $d++) {
        $e = (int) $a[$b - 1 - $d];

        if ($d % 2 === 1) {
            $e *= 2;

            if ($e > 9) {
                $e -= 9;
            }
        }

        $c += $e;
    }

    return $c % 10 === 0;
}
