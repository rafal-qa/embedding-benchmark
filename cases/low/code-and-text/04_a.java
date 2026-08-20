public final class Window {
    private final Deque<Double> values = new ArrayDeque<>();
    private final int capacity;

    public Window(int capacity) {
        this.capacity = capacity;
    }

    public void push(double value) {
        values.addLast(value);

        if (values.size() > capacity) {
            values.removeFirst();
        }
    }

    public double average() {
        return values.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }
}
