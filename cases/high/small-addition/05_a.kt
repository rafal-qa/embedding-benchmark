data class Item(val name: String, val price: Double, val priority: Int, val inStock: Boolean)

fun ranked(items: List<Item>): List<Item> {
    val available = items.filter { item -> item.inStock }

    return available.sortedWith(
        compareByDescending<Item> { item -> item.priority }
            .thenBy { item -> item.price }
    )
}

fun totalOf(items: List<Item>): Double {
    var total = 0.0

    for (item in items) {
        if (item.inStock) {
            total += item.price
        }
    }

    return total
}
