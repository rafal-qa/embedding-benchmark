data class Label(val name: String, val value: Int)
data class Product(val sku: String, val quantity: Int, val revision: Long)

fun <T> requireValues(values: List<T>) {
    require(values.isNotEmpty()) { "values cannot be empty" }
}

class Inventory {
    private val products = mutableMapOf<String, Product>()
    private val conflicts = mutableListOf<String>()

    fun apply(incoming: List<Product>) {
        requireValues(incoming)
        incoming.forEach { remote ->
            val local = products[remote.sku]
            when {
                local == null -> products[remote.sku] = remote
                remote.revision > local.revision -> products[remote.sku] = remote
                remote.revision == local.revision && remote.quantity != local.quantity ->
                    conflicts += remote.sku
            }
        }
    }

    fun reserve(sku: String, amount: Int): Boolean {
        val product = products[sku] ?: return false
        if (amount !in 1..product.quantity) return false
        products[sku] = product.copy(quantity = product.quantity - amount)
        return true
    }

    fun labels(counts: Map<String, Int>): List<Label> {
        return counts.map { (name, value) -> Label(name, value) }.sortedBy { it.name }
    }

    fun changes(since: Long): List<Product> = products.values
        .filter { product -> product.revision > since }
        .sortedBy { product -> product.sku }

    fun summary(): List<Label> {
        val counts = products.values.groupBy { product ->
            when {
                product.quantity == 0 -> "empty"
                product.quantity < 5 -> "low"
                else -> "ready"
            }
        }.mapValues { (_name, values) -> values.size }
        return labels(counts)
    }

    fun conflicts(): List<String> = conflicts.distinct().sorted()

    fun merge(snapshot: Map<String, Int>, revision: Long) {
        snapshot.forEach { (sku, quantity) ->
            val current = products[sku]
            if (current == null || current.revision < revision) {
                products[sku] = Product(sku, quantity.coerceAtLeast(0), revision)
            }
        }
    }

    fun removeMissing(known: Set<String>, revision: Long): Int {
        val obsolete = products.values
            .filter { product -> product.revision < revision && product.sku !in known }
            .map { product -> product.sku }
        obsolete.forEach(products::remove)
        return obsolete.size
    }

    fun value(prices: Map<String, Int>): Long = products.values.sumOf { product ->
        product.quantity.toLong() * (prices[product.sku] ?: 0)
    }
}
