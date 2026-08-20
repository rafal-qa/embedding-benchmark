data class Item(val name: String, val price: Double, val priority: Int, val inStock: Boolean)

fun ranked(items: List<Item>): List<Item> {
    val available = items.filter { item -> item.inStock }

    return available.sortedWith(
        compareByDescending<Item> { item -> item.priority }
            .thenBy { item -> item.price }
    )
}

fun affordable(items: List<Item>, budget: Double): List<Item> {
    return ranked(items).filter { item -> item.price <= budget }
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
