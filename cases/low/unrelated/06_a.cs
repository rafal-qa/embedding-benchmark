public static class SizeFormatter
{
    public static string Describe(long bytes)
    {
        return bytes switch
        {
            < 0 => "unknown",
            < 1024 => $"{bytes} B",
            < 1048576 => $"{Scale(bytes, 1024)} KB",
            < 1073741824 => $"{Scale(bytes, 1048576)} MB",
            _ => $"{Scale(bytes, 1073741824)} GB",
        };
    }

    public static string Widest(long[] sizes)
    {
        long largest = 0;

        foreach (long candidate in sizes)
        {
            if (candidate > largest)
            {
                largest = candidate;
            }
        }

        return Describe(largest);
    }

    private static string Scale(long bytes, long unit)
    {
        double value = (double)bytes / unit;

        return value.ToString("0.##");
    }
}
