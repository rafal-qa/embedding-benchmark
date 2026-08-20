final class Reconciler
{
    private array $matched = [];

    public function __invoke(string $invoice): void
    {
        $payments = str_split(strtolower($invoice));
        $reference = $payments[0] . end($payments);
        $amount = count(array_unique($payments));

        $this->matched[$reference][] = [
            'invoice' => $invoice,
            'amount' => $amount,
            'outstanding' => strlen($invoice) - $amount,
        ];
    }

    public function match(): array
    {
        ksort($this->matched);
        return $this->matched;
    }
}
