public final class Order {
    public enum Status {
        DRAFT,
        PLACED,
        PACKED,
        SHIPPED,
        CLOSED,
        CANCELLED
    }

    public static final class Line {
        private final String sku;
        private final int quantity;
        private final long unitCents;

        public Line(String sku, int quantity, long unitCents) {
            this.sku = sku;
            this.quantity = quantity;
            this.unitCents = unitCents;
        }

        public String sku() {
            return sku;
        }

        public int quantity() {
            return quantity;
        }

        public long unitCents() {
            return unitCents;
        }

        public long totalCents() {
            return quantity * unitCents;
        }
    }

    private final String reference;
    private final List<Line> lines = new ArrayList<>();
    private final List<String> history = new ArrayList<>();
    private final Map<String, Long> adjustments = new LinkedHashMap<>();
    private Status status = Status.DRAFT;

    public Order(String reference) {
        this.reference = reference;
        history.add("created");
    }

    public String reference() {
        return reference;
    }

    public Status status() {
        return status;
    }

    public List<Line> lines() {
        return List.copyOf(lines);
    }

    public List<String> history() {
        return List.copyOf(history);
    }

    public boolean addLine(String sku, int quantity, long unitCents) {
        if (status != Status.DRAFT) {
            return false;
        }

        if (quantity <= 0 || unitCents < 0) {
            return false;
        }

        for (int index = 0; index < lines.size(); index++) {
            if (lines.get(index).sku().equals(sku)) {
                Line merged = new Line(sku, lines.get(index).quantity() + quantity, unitCents);
                lines.set(index, merged);
                history.add("merged " + sku);

                return true;
            }
        }

        lines.add(new Line(sku, quantity, unitCents));
        history.add("added " + sku);

        return true;
    }

    public boolean removeLine(String sku) {
        if (status != Status.DRAFT) {
            return false;
        }

        for (int index = 0; index < lines.size(); index++) {
            if (lines.get(index).sku().equals(sku)) {
                lines.remove(index);
                history.add("removed " + sku);

                return true;
            }
        }

        return false;
    }

    public void adjust(String label, long cents) {
        adjustments.put(label, adjustments.getOrDefault(label, 0L) + cents);
        history.add("adjusted " + label);
    }

    public long subtotalCents() {
        long total = 0;

        for (Line line : lines) {
            total += line.totalCents();
        }

        return total;
    }

    public long adjustmentCents() {
        long total = 0;

        for (Long amount : adjustments.values()) {
            total += amount;
        }

        return total;
    }

    public long totalCents() {
        long total = subtotalCents() + adjustmentCents();

        return Math.max(0, total);
    }

    public int itemCount() {
        int count = 0;

        for (Line line : lines) {
            count += line.quantity();
        }

        return count;
    }

    public boolean advance(Status next) {
        if (!allowed(status, next)) {
            return false;
        }

        status = next;
        history.add("moved to " + next.name().toLowerCase());

        return true;
    }

    public boolean cancel(String reason) {
        if (status == Status.SHIPPED || status == Status.CLOSED || status == Status.CANCELLED) {
            return false;
        }

        status = Status.CANCELLED;
        history.add("cancelled " + reason);

        return true;
    }

    public boolean isOpen() {
        return status != Status.CLOSED && status != Status.CANCELLED;
    }

    public Line lineFor(String sku) {
        for (Line line : lines) {
            if (line.sku().equals(sku)) {
                return line;
            }
        }

        return null;
    }

    public Line heaviestLine() {
        Line heaviest = null;

        for (Line line : lines) {
            if (heaviest == null || line.totalCents() > heaviest.totalCents()) {
                heaviest = line;
            }
        }

        return heaviest;
    }

    public void applyPercentOff(String label, int percent) {
        if (percent <= 0 || percent > 100) {
            return;
        }

        long reduction = subtotalCents() * percent / 100;
        adjust(label, -reduction);
    }

    public Map<String, Long> totalsBySku() {
        Map<String, Long> totals = new LinkedHashMap<>();

        for (Line line : lines) {
            totals.put(line.sku(), line.totalCents());
        }

        return totals;
    }

    public String summary() {
        StringBuilder builder = new StringBuilder();
        builder.append(reference);
        builder.append(' ');
        builder.append(status.name().toLowerCase());
        builder.append(' ');
        builder.append(itemCount());
        builder.append(" items ");
        builder.append(totalCents());

        return builder.toString();
    }

    private static boolean allowed(Status from, Status to) {
        if (from == Status.DRAFT) {
            return to == Status.PLACED;
        }

        if (from == Status.PLACED) {
            return to == Status.PACKED;
        }

        if (from == Status.PACKED) {
            return to == Status.SHIPPED;
        }

        if (from == Status.SHIPPED) {
            return to == Status.CLOSED;
        }

        return false;
    }
}
