public record Range(int Low, int High)
{
    public bool Contains(int value) => value >= Low && value <= High;
}

public static class Histogram
{
    public static int[] Build(IEnumerable<double> values, int buckets)
    {
        double[] samples = values.ToArray();
        int[] counts = new int[buckets];
        double minimum = samples.Min();
        double width = (samples.Max() - minimum) / buckets;
        foreach (double sample in samples)
        {
            int index = width == 0 ? 0 : (int)((sample - minimum) / width);
            counts[Math.Max(0, Math.Min(index, buckets - 1))]++;
        }
        return counts;
    }
}
