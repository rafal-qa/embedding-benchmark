class StatsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_stats)

        val input = findViewById<EditText>(R.id.numbers)
        val result = findViewById<TextView>(R.id.result)

        findViewById<Button>(R.id.compute).setOnClickListener {
            val readings = input.text.toString().split(",").map { it.trim().toDouble() }
            var sum = 0.0
            var highest = readings.first()
            var lowest = readings.first()
            for (reading in readings) {
                sum += reading
                if (reading > highest) highest = reading
                if (reading < lowest) lowest = reading
            }
            val mean = sum / readings.size
            result.text = "mean %.2f, min %.2f, max %.2f".format(mean, lowest, highest)
        }
    }
}
