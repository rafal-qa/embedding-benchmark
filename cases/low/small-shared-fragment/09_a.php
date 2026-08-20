function limit(int $value, int $minimum, int $maximum): int
{
    return max($minimum, min($value, $maximum));
}

final class Basket
{
    public function total(array $items, array $coupons): int
    {
        $subtotal = array_sum(array_map(fn ($item) => $item['price'] * $item['quantity'], $items));
        foreach ($coupons as $coupon) {
            if ($subtotal >= $coupon['minimum']) {
                $subtotal -= $coupon['discount'];
            }
        }
        return max(0, $subtotal);
    }

    public function quantities(array $items): array
    {
        return array_column($items, 'quantity', 'sku');
    }
}
