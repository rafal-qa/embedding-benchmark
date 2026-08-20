public sealed record Interval(int Start, int End);

public static class IntervalMerger
{
    public static List<Interval> Merge(IEnumerable<Interval> intervals)
    {
        var ordered = intervals.OrderBy(interval => interval.Start).ToList();
        var merged = new List<Interval>();

        foreach (var interval in ordered)
        {
            if (merged.Count == 0)
            {
                merged.Add(interval);
                continue;
            }

            var last = merged[merged.Count - 1];

            if (interval.Start > last.End)
            {
                merged.Add(interval);
            }
            else
            {
                merged[merged.Count - 1] = last with { End = Math.Max(last.End, interval.End) };
            }
        }

        return merged;
    }
}
