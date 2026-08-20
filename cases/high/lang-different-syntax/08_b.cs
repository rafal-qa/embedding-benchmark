public static class QuickSort
{
    public static void Sort(List<int> items)
    {
        int end = items.Count;
        SortRange(items, 0, end);
    }

    private static void SortRange(List<int> items, int low, int high)
    {
        if (high - low < 2)
        {
            return;
        }

        int split = Partition(items, low, high);
        SortRange(items, low, split);
        SortRange(items, split + 1, high);
    }

    private static int Partition(List<int> items, int low, int high)
    {
        int pivot = items[high - 1];
        int boundary = low;

        for (int index = low; index < high - 1; index++)
        {
            if (items[index] <= pivot)
            {
                (items[index], items[boundary]) = (items[boundary], items[index]);
                boundary += 1;
            }
        }

        (items[boundary], items[high - 1]) = (items[high - 1], items[boundary]);
        return boundary;
    }
}
