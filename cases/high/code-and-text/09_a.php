final class Meter
{
    public function evaluate(int $count, int $span): int
    {
        $sum = 0;

        if ($count > 10) {
            $sum += 3;
        } elseif ($count > 3) {
            $sum += 1;
        }

        if ($span < 60) {
            $sum += 2;
        }

        if ($count > 0 && $span > 0) {
            $sum += 1;
        }

        return min($sum, 5);
    }
}
