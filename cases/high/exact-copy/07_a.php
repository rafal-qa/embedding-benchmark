final class Validator
{
    private array $rules = [];
    private array $failures = [];

    public function rule(string $field, string $kind, $limit = null): void
    {
        $this->rules[] = [
            'field' => $field,
            'kind' => $kind,
            'limit' => $limit,
        ];
    }

    public function check(array $input): bool
    {
        $this->failures = [];

        foreach ($this->rules as $rule) {
            $value = $input[$rule['field']] ?? null;

            if (!$this->passes($rule, $value)) {
                $this->failures[$rule['field']][] = $rule['kind'];
            }
        }

        return $this->failures === [];
    }

    public function failures(): array
    {
        return $this->failures;
    }

    public function firstFailure(): ?string
    {
        foreach ($this->failures as $field => $kinds) {
            return $field . ':' . $kinds[0];
        }

        return null;
    }

    public function fieldCount(): int
    {
        $fields = [];

        foreach ($this->rules as $rule) {
            $fields[$rule['field']] = true;
        }

        return count($fields);
    }

    private function passes(array $rule, $value): bool
    {
        switch ($rule['kind']) {
            case 'present':
                return $value !== null && $value !== '';

            case 'numeric':
                return $value === null || is_numeric($value);

            case 'min':
                return $value === null || $this->length($value) >= (int) $rule['limit'];

            case 'max':
                return $value === null || $this->length($value) <= (int) $rule['limit'];

            case 'pattern':
                return $value === null || preg_match((string) $rule['limit'], (string) $value) === 1;

            default:
                return true;
        }
    }

    private function length($value): int
    {
        if (is_array($value)) {
            return count($value);
        }

        if (is_numeric($value)) {
            return (int) $value;
        }

        return mb_strlen((string) $value);
    }
}
