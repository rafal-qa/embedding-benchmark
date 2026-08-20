public final class BinarySearch {
    private BinarySearch() {
    }

    public static int indexOf(int[] items, int target) {
        int low = 0;
        int high = items.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (items[mid] == target) {
                return mid;
            }
            if (items[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    public static int lowerBound(int[] items, int target) {
        int low = 0;
        int high = items.length;

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (items[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
