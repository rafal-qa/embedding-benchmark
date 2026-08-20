public final class Amortization {
    private final double principal;
    private final double annualRate;
    private final int months;

    public Amortization(double principal, double annualRate, int months) {
        this.principal = principal;
        this.annualRate = annualRate;
        this.months = months;
    }

    private double monthlyPayment() {
        double monthlyRate = annualRate / 12.0;
        double factor = Math.pow(1 + monthlyRate, months);

        return principal * monthlyRate * factor / (factor - 1);
    }

    public List<Double> schedule() {
        double monthlyRate = annualRate / 12.0;
        double payment = monthlyPayment();

        List<Double> balances = new ArrayList<>();
        double balance = principal;

        for (int month = 0; month < months; month++) {
            double interest = balance * monthlyRate;
            balance = balance - (payment - interest);
            balances.add(balance);
        }

        return balances;
    }
}
