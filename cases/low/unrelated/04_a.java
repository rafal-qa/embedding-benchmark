public final class Accrual {
    private final double annualRate;
    private final int periodsPerYear;

    public Accrual(double annualRate, int periodsPerYear) {
        this.annualRate = annualRate;
        this.periodsPerYear = periodsPerYear;
    }

    public double grow(double principal, int periods) {
        double balance = principal;
        double periodRate = annualRate / periodsPerYear;

        for (int step = 0; step < periods; step++) {
            balance = balance + balance * periodRate;
        }

        return Math.round(balance * 100.0) / 100.0;
    }

    public double earned(double principal, int periods) {
        return grow(principal, periods) - principal;
    }

    public int periodsToReach(double principal, double goal) {
        int periods = 0;

        while (grow(principal, periods) < goal && periods < 1000) {
            periods++;
        }

        return periods;
    }
}
