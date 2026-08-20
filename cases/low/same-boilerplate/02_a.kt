class PasswordActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_password)

        val input = findViewById<EditText>(R.id.password)
        val result = findViewById<TextView>(R.id.result)

        findViewById<Button>(R.id.check).setOnClickListener {
            val secret = input.text.toString()
            var score = 0
            if (secret.length >= 8) score++
            if (secret.any { it.isUpperCase() }) score++
            if (secret.any { it.isDigit() }) score++
            if (secret.any { !it.isLetterOrDigit() }) score++
            val label = when (score) {
                4 -> "strong"
                in 2..3 -> "medium"
                else -> "weak"
            }
            result.text = "$label ($score/4)"
        }
    }
}
