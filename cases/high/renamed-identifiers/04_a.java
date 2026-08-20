public final class Reservation {
    private final Map<String, Integer> stock = new HashMap<>();
    private final Map<String, Integer> held = new HashMap<>();

    public void stockUp(String sku, int quantity) {
        stock.merge(sku, quantity, Integer::sum);
    }

    public boolean reserve(String sku, int quantity) {
        int available = stock.getOrDefault(sku, 0) - held.getOrDefault(sku, 0);

        if (available < quantity) {
            return false;
        }

        held.merge(sku, quantity, Integer::sum);
        return true;
    }

    public void release(String sku, int quantity) {
        int current = held.getOrDefault(sku, 0);

        if (current <= quantity) {
            held.remove(sku);
            return;
        }

        held.put(sku, current - quantity);
    }

    public int availableOf(String sku) {
        return stock.getOrDefault(sku, 0) - held.getOrDefault(sku, 0);
    }
}
