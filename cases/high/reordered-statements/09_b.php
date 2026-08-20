final class Statistics
{
    private const MINIMUM_WORD_LENGTH = 3;
    private const WORD_PATTERN = '/\s+/';
    private const SENTENCE_PATTERN = '/[.!?]+/';

    public function summarize(string $text): array
    {
        $trimmed = trim($text);
        $sentences = preg_split(self::SENTENCE_PATTERN, $trimmed, -1, PREG_SPLIT_NO_EMPTY);
        $words = preg_split(self::WORD_PATTERN, $trimmed, -1, PREG_SPLIT_NO_EMPTY);

        $totalLength = 0;
        $longWords = 0;

        foreach ($words as $word) {
            if (strlen($word) >= self::MINIMUM_WORD_LENGTH) {
                $longWords += 1;
            }

            $totalLength += strlen($word);
        }

        return [
            'words' => count($words),
            'sentences' => count($sentences),
            'longWords' => $longWords,
            'averageLength' => count($words) === 0 ? 0 : $totalLength / count($words)
        ];
    }
}
