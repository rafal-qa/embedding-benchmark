public final class Thermostat {
    public record Setting(int hour, double temperature) {}
    public record Label(String value) {}

    public static double target(List<Setting> schedule, int hour) {
        double result = schedule.get(0).temperature();
        for (Setting setting : schedule) {
            if (setting.hour() > hour) break;
            result = setting.temperature();
        }
        return result;
    }
}
