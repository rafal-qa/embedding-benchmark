public final class TemperatureAlert {
    private static final double CRITICAL_HIGH = 85.0;
    private static final double WARNING_HIGH = 70.0;
    private static final double WARNING_LOW = 5.0;
    private static final double CRITICAL_LOW = -10.0;

    public String levelOf(double celsius) {
        if (celsius >= CRITICAL_HIGH) {
            return "critical";
        }
        if (celsius >= WARNING_HIGH) {
            return "warning";
        }
        if (celsius <= CRITICAL_LOW) {
            return "critical";
        }
        if (celsius <= WARNING_LOW) {
            return "warning";
        }
        return "normal";
    }

    public String describe(double celsius) {
        return levelOf(celsius) + " at " + celsius + " degrees";
    }
}
