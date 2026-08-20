class MovingAverage(private val windowSize: Int) {
    private val window = ArrayDeque<Double>()
    private var sum = 0.0

    init {
        require(windowSize >= 1) { "window must hold at least one sample" }
    }

    fun accept(sample: Double): Double {
        window.addLast(sample)
        sum += sample

        if (window.size > windowSize) {
            sum -= window.removeFirst()
        }

        return sum / window.size
    }

    fun isFull(): Boolean {
        return window.size == windowSize
    }
}
