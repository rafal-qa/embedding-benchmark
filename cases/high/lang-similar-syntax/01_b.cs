public static class BinarySearch
{
    public static int IndexOf(int[] items, int target)
    {
        int low = 0;
        int high = items.Length - 1;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            if (items[mid] == target)
            {
                return mid;
            }
            if (items[mid] < target)
            {
                low = mid + 1;
            }
            else
            {
                high = mid - 1;
            }
        }

        return -1;
    }

    public static int LowerBound(int[] items, int target)
    {
        int low = 0;
        int high = items.Length;

        while (low < high)
        {
            int mid = low + (high - low) / 2;
            if (items[mid] < target)
            {
                low = mid + 1;
            }
            else
            {
                high = mid;
            }
        }

        return low;
    }
}
