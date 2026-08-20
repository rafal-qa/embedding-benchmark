final class Formatter
{
    private const PREFIXES = [
        '48' => 'PL',
        '49' => 'DE',
        '44' => 'GB',
        '1' => 'US'
    ];

    private const SEPARATOR = ' ';
    private const PLUS = '+';

    public function countryOf(string $number): string
    {
        $digits = preg_replace('/[^0-9]/', '', $number);

        foreach (self::PREFIXES as $prefix => $code) {
            if (str_starts_with($digits, $prefix)) {
                return $code;
            }
        }

        return 'XX';
    }

    public function format(string $number): string
    {
        $digits = preg_replace('/[^0-9]/', '', $number);
        $groups = str_split($digits, 3);

        return self::PLUS . implode(self::SEPARATOR, $groups);
    }
}
