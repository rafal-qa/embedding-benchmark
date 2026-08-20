public record Shift(string Employee, int Start, int End);

public static class Coverage
{
    public static int[] Count(List<Shift> shifts, int hours)
    {
        int[] coverage = new int[hours];
        foreach (Shift shift in shifts)
        {
            for (int hour = shift.Start; hour < shift.End && hour < hours; hour++)
            {
                coverage[hour]++;
            }
        }
        return coverage;
    }

    public static List<int> Gaps(List<Shift> shifts, int hours) =>
        Count(shifts, hours).Select((value, hour) => (value, hour))
            .Where(item => item.value == 0).Select(item => item.hour).ToList();
}
