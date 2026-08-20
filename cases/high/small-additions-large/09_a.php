final class Engine
{
    private array $items = [];
    private array $discounts = [];
    private array $taxRates = [];

    public function __construct(array $taxRates)
    {
        $this->taxRates = $taxRates;
    }

    public function addItem(string $sku, int $quantity, float $unitPrice): void
    {
        if ($quantity <= 0) {
            return;
        }

        $this->items[] = [
            'sku' => $sku,
            'quantity' => $quantity,
            'unitPrice' => $unitPrice,
        ];
    }

    public function addDiscount(string $code, float $rate, ?string $sku = null): void
    {
        $this->discounts[] = [
            'code' => $code,
            'rate' => max(0.0, min(1.0, $rate)),
            'sku' => $sku,
        ];
    }

    public function lineTotal(array $item): float
    {
        $gross = $item['quantity'] * $item['unitPrice'];
        $rate = $this->discountRateFor($item['sku']);

        return $this->round($gross * (1.0 - $rate));
    }

    public function subtotal(): float
    {
        $total = 0.0;

        foreach ($this->items as $item) {
            $total += $this->lineTotal($item);
        }

        return $this->round($total);
    }

    public function taxFor(string $region): float
    {
        $rate = $this->taxRates[$region] ?? 0.0;

        return $this->round($this->subtotal() * $rate);
    }

    public function total(string $region): float
    {
        return $this->round($this->subtotal() + $this->taxFor($region));
    }

    public function breakdown(string $region): array
    {
        $lines = [];

        foreach ($this->items as $item) {
            $lines[] = [
                'sku' => $item['sku'],
                'quantity' => $item['quantity'],
                'total' => $this->lineTotal($item),
            ];
        }

        return [
            'lines' => $lines,
            'subtotal' => $this->subtotal(),
            'tax' => $this->taxFor($region),
            'total' => $this->total($region),
        ];
    }

    public function itemCount(): int
    {
        $count = 0;

        foreach ($this->items as $item) {
            $count += $item['quantity'];
        }

        return $count;
    }

    private function discountRateFor(string $sku): float
    {
        $rate = 0.0;

        foreach ($this->discounts as $discount) {
            if ($discount['sku'] !== null && $discount['sku'] !== $sku) {
                continue;
            }

            $rate += $discount['rate'];
        }

        return min(1.0, $rate);
    }

    private function round(float $value): float
    {
        return round($value, 2);
    }
}
