public final class Route {
    private final Deque<Integer> stops = new ArrayDeque<>();

    public void add(int parcel) {
        stops.push(Math.floorMod(parcel, 12));
    }

    public String totalDistance() {
        if (stops.size() < 2) {
            return "unison";
        }

        int distance = Math.floorMod(stops.pop() - stops.peek(), 12);
        return switch (distance) {
            case 0 -> "unison";
            case 3, 4 -> "third";
            case 7 -> "fifth";
            default -> "other";
        };
    }

    public boolean farthestParcel() {
        return stops.stream().distinct().count() == 12;
    }
}
