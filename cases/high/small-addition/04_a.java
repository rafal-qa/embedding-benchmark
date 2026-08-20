public final class SeatAllocator {
    private final int rows;
    private final int seatsPerRow;
    private final List<String> taken = new ArrayList<>();

    public SeatAllocator(int rows, int seatsPerRow) {
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
    }

    public String allocate(boolean windowPreferred) {
        for (int row = 1; row <= rows; row++) {
            for (int seat = 0; seat < seatsPerRow; seat++) {
                String label = row + String.valueOf((char) ('A' + seat));

                if (taken.contains(label)) {
                    continue;
                }

                if (windowPreferred && seat != 0 && seat != seatsPerRow - 1) {
                    continue;
                }

                taken.add(label);
                return label;
            }
        }

        return "";
    }
}
