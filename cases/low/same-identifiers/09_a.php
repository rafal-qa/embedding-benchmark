final class Reconciler
{
    public function match(array $invoices, array $payments): array
    {
        $matched = [];
        foreach ($invoices as $invoice) {
            foreach ($payments as $payment) {
                if ($invoice['reference'] === $payment['reference'] &&
                    $invoice['amount'] === $payment['amount']) {
                    $matched[] = $invoice['reference'];
                    break;
                }
            }
        }
        return $matched;
    }

    public function outstanding(array $invoices, array $payments): array
    {
        return array_values(array_diff(array_column($invoices, 'reference'), $this->match($invoices, $payments)));
    }
}
