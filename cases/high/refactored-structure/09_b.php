final class Discounts
{
    private const LOYALTY_YEARS = 3;
    private const BULK_QUANTITY = 20;
    private const LOYALTY_RATE = 0.05;
    private const BULK_RATE = 0.1;
    private const COUPON_RATE = 0.15;

    private function isCouponValid(?string $coupon): bool
    {
        return $coupon !== null && strlen($coupon) === 8;
    }

    public function rateFor(array $customer, int $quantity, ?string $coupon): float
    {
        $rate = 0.0;

        if ($customer['years'] >= self::LOYALTY_YEARS) {
            $rate += self::LOYALTY_RATE;
        }

        if ($quantity >= self::BULK_QUANTITY) {
            $rate += self::BULK_RATE;
        }

        if ($this->isCouponValid($coupon)) {
            $rate += self::COUPON_RATE;
        }

        return min($rate, 0.25);
    }
}
