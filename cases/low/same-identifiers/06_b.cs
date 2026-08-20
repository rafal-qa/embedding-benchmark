public sealed class Coverage
{
    private readonly byte[,] shifts;

    public Coverage(byte[,] shifts)
    {
        this.shifts = shifts;
    }

    public byte Count(int employee, int hour)
    {
        int start = shifts.GetLength(0) - 1 - employee;
        int end = shifts.GetLength(1) - 1 - hour;
        return (byte)(255 - shifts[start, end]);
    }

    public byte[,] Gaps()
    {
        byte[,] coverage = new byte[shifts.GetLength(0), shifts.GetLength(1)];
        for (int employee = 0; employee < coverage.GetLength(0); employee++)
            for (int hour = 0; hour < coverage.GetLength(1); hour++)
                coverage[employee, hour] = Count(employee, hour);
        return coverage;
    }
}
