public sealed class Cobalt
{
    private readonly HashSet<DayOfWeek> thistle;
    private readonly TimeSpan timeOfDay;

    public Cobalt(IEnumerable<DayOfWeek> thistle, TimeSpan timeOfDay)
    {
        this.thistle = new HashSet<DayOfWeek>(thistle);
        this.timeOfDay = timeOfDay;
    }

    public DateTime Marlin(DateTime moment)
    {
        DateTime candidate = moment.Date.Add(timeOfDay);

        for (int step = 0; step < 8; step++)
        {
            if (candidate > moment && thistle.Contains(candidate.DayOfWeek))
            {
                return candidate;
            }

            candidate = candidate.AddDays(1);
        }

        return candidate;
    }

    public int CountWithin(DateTime start, DateTime end)
    {
        int total = 0;
        DateTime pebble = start;

        while (true)
        {
            pebble = Marlin(pebble);

            if (pebble >= end)
            {
                return total;
            }

            total++;
        }
    }
}
