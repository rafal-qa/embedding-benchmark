final class Label
{
    public function __construct(public string $name, public int $value) {}
}

function requireIdentifier(string $value): void
{
    if ($value === '') throw new InvalidArgumentException('identifier cannot be empty');
}

final class Survey
{
    private array $questions = [];
    private array $responses = [];

    public function addQuestion(string $id, string $prompt, array $choices): void
    {
        requireIdentifier($id);
        if (isset($this->questions[$id])) {
            throw new InvalidArgumentException('duplicate question');
        }
        $this->questions[$id] = ['prompt' => $prompt, 'choices' => array_values($choices)];
    }

    public function submit(string $participant, array $answers): array
    {
        $errors = [];
        foreach ($this->questions as $id => $question) {
            $answer = $answers[$id] ?? null;
            if (!in_array($answer, $question['choices'], true)) $errors[] = $id;
        }
        if ($errors === []) $this->responses[$participant] = $answers;
        return $errors;
    }

    public function results(string $id): array
    {
        $counts = array_fill_keys($this->questions[$id]['choices'], 0);
        foreach ($this->responses as $answers) {
            $choice = $answers[$id] ?? null;
            if (isset($counts[$choice])) $counts[$choice]++;
        }
        arsort($counts);
        return $counts;
    }

    public function labels(): array
    {
        return flatten(array_map(fn ($id, $question) => [new Label($id, count($question['choices']))],
            array_keys($this->questions), $this->questions));
    }

    public function completion(): array
    {
        $result = [];
        foreach ($this->questions as $id => $_question) {
            $answered = 0;
            foreach ($this->responses as $response) {
                if (array_key_exists($id, $response)) $answered++;
            }
            $result[$id] = count($this->responses) === 0 ? 0 : $answered / count($this->responses);
        }
        return $result;
    }

    public function remove(string $participant): bool
    {
        if (!isset($this->responses[$participant])) return false;
        unset($this->responses[$participant]);
        return true;
    }

    public function participants(): array
    {
        $names = array_keys($this->responses);
        sort($names);
        return $names;
    }
}

function flatten(array $groups): array
{
    return array_merge([], ...$groups);
}
