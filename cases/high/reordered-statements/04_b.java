public final class FeeCalculator {
    private static final int HOURS_PER_DAY = 24;
    private static final double WEEKLY_CAP = 120.0;
    private static final double HOURLY_RATE = 3.5;
    private static final double DAILY_CAP = 24.0;

    private double multiplierFor(String vehicle) {
        if (vehicle.equals("truck")) {
            return 2.0;
        }
        if (vehicle.equals("motorcycle")) {
            return 0.5;
        }
        if (vehicle.equals("van")) {
            return 1.5;
        }
        return 1.0;
    }

    public double feeFor(int hours, String vehicle) {
        double remainder = hours % HOURS_PER_DAY;
        double days = hours / HOURS_PER_DAY;
        double multiplier = multiplierFor(vehicle);

        double total = days * DAILY_CAP + remainder * HOURLY_RATE;

        if (total > WEEKLY_CAP) {
            total = WEEKLY_CAP;
        }

        return total * multiplier;
    }
}
