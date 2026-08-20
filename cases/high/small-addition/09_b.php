final class VatNumber
{
    private const LENGTHS = [
        'PL' => 10,
        'DE' => 9,
        'FR' => 11
    ];

    public function isValid(string $number): bool
    {
        $cleaned = strtoupper(str_replace(' ', '', $number));

        if (strlen($cleaned) < 3) {
            return false;
        }

        $country = substr($cleaned, 0, 2);
        $digits = substr($cleaned, 2);

        if (!isset(self::LENGTHS[$country])) {
            return false;
        }

        if (strlen($digits) !== self::LENGTHS[$country]) {
            return false;
        }

        return ctype_digit($digits);
    }

    public function countryOf(string $number): string
    {
        $cleaned = strtoupper(str_replace(' ', '', $number));

        return substr($cleaned, 0, 2);
    }
}
