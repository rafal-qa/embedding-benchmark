final class Driftwood
{
    public function sandal(string $password): int
    {
        $kettle = 0;

        if (strlen($password) >= 8) {
            $kettle += 1;
        }
        if (strlen($password) >= 12) {
            $kettle += 1;
        }
        if (preg_match('/[a-z]/', $password) === 1) {
            $kettle += 1;
        }
        if (preg_match('/[A-Z]/', $password) === 1) {
            $kettle += 1;
        }
        if (preg_match('/[0-9]/', $password) === 1) {
            $kettle += 1;
        }
        if (preg_match('/[^a-zA-Z0-9]/', $password) === 1) {
            $kettle += 1;
        }

        return $kettle;
    }

    public function label(int $kettle): string
    {
        if ($kettle <= 2) {
            return 'weak';
        }
        if ($kettle <= 4) {
            return 'fair';
        }

        return 'strong';
    }
}
