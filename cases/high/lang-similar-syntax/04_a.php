final class QueryStringBuilder
{
    private array $params = [];

    public function add(string $name, string $value): self
    {
        $this->params[] = [$name, $value];

        return $this;
    }

    public function addAll(string $name, array $values): self
    {
        foreach ($values as $value) {
            $this->add($name, $value);
        }

        return $this;
    }

    public function build(): string
    {
        if (count($this->params) === 0) {
            return '';
        }

        $encoded = [];

        foreach ($this->params as $param) {
            $encoded[] = rawurlencode($param[0]) . '=' . rawurlencode($param[1]);
        }

        return '?' . implode('&', $encoded);
    }
}
