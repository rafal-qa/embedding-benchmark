public sealed class WeeklySchedule
{
    private readonly HashSet<DayOfWeek> days;
    private readonly TimeSpan timeOfDay;

    public WeeklySchedule(IEnumerable<DayOfWeek> days, TimeSpan timeOfDay)
    {
        this.days = new HashSet<DayOfWeek>(days);
        this.timeOfDay = timeOfDay;
    }

    public DateTime NextAfter(DateTime moment)
    {
        DateTime candidate = moment.Date.Add(timeOfDay);

        for (int step = 0; step < 8; step++)
        {
            if (candidate > moment && days.Contains(candidate.DayOfWeek))
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
        DateTime cursor = start;

        while (true)
        {
            cursor = NextAfter(cursor);

            if (cursor >= end)
            {
                return total;
            }

            total++;
        }
    }
}
