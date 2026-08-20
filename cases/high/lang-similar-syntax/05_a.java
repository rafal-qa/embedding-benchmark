public final class MovingAverage {
    private final int windowSize;
    private final Deque<Double> window = new ArrayDeque<>();
    private double sum = 0.0;

    public MovingAverage(int windowSize) {
        if (windowSize < 1) {
            throw new IllegalArgumentException("window must hold at least one sample");
        }
        this.windowSize = windowSize;
    }

    public double accept(double sample) {
        window.addLast(sample);
        sum += sample;

        if (window.size() > windowSize) {
            sum -= window.removeFirst();
        }

        return sum / window.size();
    }

    public boolean isFull() {
        return window.size() == windowSize;
    }
}
