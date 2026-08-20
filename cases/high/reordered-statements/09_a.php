final class Statistics
{
    private const SENTENCE_PATTERN = '/[.!?]+/';
    private const WORD_PATTERN = '/\s+/';
    private const MINIMUM_WORD_LENGTH = 3;

    public function summarize(string $text): array
    {
        $trimmed = trim($text);
        $words = preg_split(self::WORD_PATTERN, $trimmed, -1, PREG_SPLIT_NO_EMPTY);
        $sentences = preg_split(self::SENTENCE_PATTERN, $trimmed, -1, PREG_SPLIT_NO_EMPTY);

        $longWords = 0;
        $totalLength = 0;

        foreach ($words as $word) {
            $totalLength += strlen($word);

            if (strlen($word) >= self::MINIMUM_WORD_LENGTH) {
                $longWords += 1;
            }
        }

        return [
            'words' => count($words),
            'sentences' => count($sentences),
            'longWords' => $longWords,
            'averageLength' => count($words) === 0 ? 0 : $totalLength / count($words)
        ];
    }
}
