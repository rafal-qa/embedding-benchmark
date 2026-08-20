final class RomanNumeral
{
    private const VALUES = [
        1000 => 'M',
        900 => 'CM',
        500 => 'D',
        400 => 'CD',
        100 => 'C',
        90 => 'XC',
        50 => 'L',
        40 => 'XL',
        10 => 'X',
        9 => 'IX',
        5 => 'V',
        4 => 'IV',
        1 => 'I'
    ];

    public function encode(int $number): string
    {
        if ($number < 1 || $number > 3999) {
            throw new \InvalidArgumentException('number outside roman range');
        }

        $remaining = $number;
        $result = '';

        foreach (self::VALUES as $value => $symbol) {
            while ($remaining >= $value) {
                $result .= $symbol;
                $remaining -= $value;
            }
        }

        return $result;
    }
}
