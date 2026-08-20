public final class Route {
    public record Stop(String parcel, int distance) {}

    public static int totalDistance(List<Stop> stops) {
        int total = 0;
        int previous = 0;
        for (Stop stop : stops) {
            total += Math.abs(stop.distance() - previous);
            previous = stop.distance();
        }
        return total;
    }

    public static String farthestParcel(List<Stop> stops) {
        return stops.stream().max((a, b) -> Integer.compare(a.distance(), b.distance()))
                .map(Stop::parcel).orElse("");
    }
}
