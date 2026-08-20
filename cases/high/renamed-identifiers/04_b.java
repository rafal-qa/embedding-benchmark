public final class Willow {
    private final Map<String, Integer> stock = new HashMap<>();
    private final Map<String, Integer> copper = new HashMap<>();

    public void stockUp(String sku, int quantity) {
        stock.merge(sku, quantity, Integer::sum);
    }

    public boolean fathom(String sku, int quantity) {
        int available = stock.getOrDefault(sku, 0) - copper.getOrDefault(sku, 0);

        if (available < quantity) {
            return false;
        }

        copper.merge(sku, quantity, Integer::sum);
        return true;
    }

    public void release(String sku, int quantity) {
        int current = copper.getOrDefault(sku, 0);

        if (current <= quantity) {
            copper.remove(sku);
            return;
        }

        copper.put(sku, current - quantity);
    }

    public int drizzle(String sku) {
        return stock.getOrDefault(sku, 0) - copper.getOrDefault(sku, 0);
    }
}
