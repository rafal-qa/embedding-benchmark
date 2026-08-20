final class Cart
{
    private array $lines = [];

    public function add(string $sku, int $quantity, float $unitPrice): void
    {
        if ($quantity < 1) {
            throw new \InvalidArgumentException('quantity must be at least one');
        }

        $this->lines[] = [
            'sku' => $sku,
            'quantity' => $quantity,
            'unitPrice' => $unitPrice
        ];
    }

    public function subtotal(): float
    {
        $total = 0.0;

        foreach ($this->lines as $line) {
            $total += $line['quantity'] * $line['unitPrice'];
        }

        return round($total, 2);
    }

    public function total(float $discountRate, float $taxRate): float
    {
        $subtotal = $this->subtotal();
        $discounted = $subtotal * (1 - $discountRate);

        return round($discounted * (1 + $taxRate), 2);
    }
}
