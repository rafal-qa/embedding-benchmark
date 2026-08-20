final class Sieve
{
    public function upTo(int $ceiling): array
    {
        if ($ceiling < 2) {
            return [];
        }

        $marks = array_fill(0, $ceiling + 1, true);
        $marks[0] = false;
        $marks[1] = false;

        for ($factor = 2; $factor * $factor <= $ceiling; $factor++) {
            if (!$marks[$factor]) {
                continue;
            }

            for ($multiple = $factor * $factor; $multiple <= $ceiling; $multiple += $factor) {
                $marks[$multiple] = false;
            }
        }

        return array_keys(array_filter($marks));
    }

    public function nth(int $position): int
    {
        $found = $this->upTo($position * 15 + 10);

        return $found[$position - 1] ?? 0;
    }
}
