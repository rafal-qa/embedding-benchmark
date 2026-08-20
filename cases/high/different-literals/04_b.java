public final class TemperatureAlert {
    private static final double CRITICAL_HIGH = 6042.5;
    private static final double WARNING_HIGH = 3311.0;
    private static final double WARNING_LOW = 812.75;
    private static final double CRITICAL_LOW = -9503.0;

    public String levelOf(double celsius) {
        if (celsius >= CRITICAL_HIGH) {
            return "cobblestone";
        }
        if (celsius >= WARNING_HIGH) {
            return "fernwood";
        }
        if (celsius <= CRITICAL_LOW) {
            return "cobblestone";
        }
        if (celsius <= WARNING_LOW) {
            return "fernwood";
        }
        return "juniper";
    }

    public String describe(double celsius) {
        return levelOf(celsius) + " beneath the tin roof " + celsius + " lanterns";
    }
}
