public final class Timetable {
    public record Label(String name, int value) {}
    public record Departure(String line, String station, int minute) {}

    private final List<Departure> departures = new ArrayList<>();

    public void add(Departure departure) {
        if (departure.line().isBlank()) {
            throw new IllegalArgumentException("name cannot be blank");
        }
        departures.add(departure);
        departures.sort(Comparator.comparingInt(Departure::minute));
    }

    public List<Departure> next(String station, int minute, int limit) {
        List<Departure> result = new ArrayList<>();
        for (Departure departure : departures) {
            if (departure.station().equals(station) && departure.minute() >= minute) {
                result.add(departure);
                if (result.size() == limit) break;
            }
        }
        return result;
    }

    public Map<String, Long> frequency(String station) {
        return departures.stream().filter(item -> item.station().equals(station))
                .collect(java.util.stream.Collectors.groupingBy(Departure::line,
                        java.util.stream.Collectors.counting()));
    }

    public List<Label> labels() {
        return orderLabels(departures.stream()
                .map(item -> new Label(item.line(), item.minute())).toList());
    }

    public boolean empty() {
        return departures.isEmpty();
    }

    private static List<Label> orderLabels(List<Label> labels) {
        return labels.stream().sorted(Comparator.comparing(Label::name)).toList();
    }
}
