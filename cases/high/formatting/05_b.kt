@JvmInline
value class Money private constructor(val cents: Long)
{
  operator fun plus(other: Money): Money = Money(cents + other.cents)
  operator fun minus(other: Money): Money = Money(cents - other.cents)
  operator fun times(factor: Int): Money = Money(cents * factor)
  fun isNegative(): Boolean = cents < 0
  override fun toString(): String
  {
    val sign = if (cents < 0) "-" else ""
    val absolute = kotlin.math.abs(cents)
    val fraction = (absolute % 100)
      .toString()
      .padStart(2, '0')
    return "$sign${absolute / 100}.$fraction"
  }
  companion object
  {
    fun ofCents(cents: Long): Money = Money(cents)
    fun parse(text: String): Money
    {
      val cleaned = text.trim().replace(",", "")
      val negative = cleaned.startsWith("-")
      val digits = cleaned.removePrefix("-").split(".")
      require(digits.size == 2) { "expected two decimal places" }
      val units = digits[0].toLong()
      val fraction = digits[1].padEnd(2, '0').take(2).toLong()
      val total = units * 100 + fraction
      return Money(if (negative) -total else total)
    }
  }
}
