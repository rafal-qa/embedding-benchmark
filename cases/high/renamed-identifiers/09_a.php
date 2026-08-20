final class StrengthMeter
{
    public function score(string $password): int
    {
        $points = 0;

        if (strlen($password) >= 8) {
            $points += 1;
        }
        if (strlen($password) >= 12) {
            $points += 1;
        }
        if (preg_match('/[a-z]/', $password) === 1) {
            $points += 1;
        }
        if (preg_match('/[A-Z]/', $password) === 1) {
            $points += 1;
        }
        if (preg_match('/[0-9]/', $password) === 1) {
            $points += 1;
        }
        if (preg_match('/[^a-zA-Z0-9]/', $password) === 1) {
            $points += 1;
        }

        return $points;
    }

    public function label(int $points): string
    {
        if ($points <= 2) {
            return 'weak';
        }
        if ($points <= 4) {
            return 'fair';
        }

        return 'strong';
    }
}
