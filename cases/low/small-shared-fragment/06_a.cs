public record Booking(string Room, int Start, int End);
public record Range(int Low, int High)
{
    public bool Contains(int value) => value >= Low && value <= High;
}

public sealed class Calendar
{
    private readonly List<Booking> bookings = new();

    public bool Reserve(Booking candidate)
    {
        if (bookings.Any(held => held.Room == candidate.Room && held.Start < candidate.End && candidate.Start < held.End))
            return false;
        bookings.Add(candidate);
        return true;
    }

    public List<Booking> ForRoom(string room) =>
        bookings.Where(booking => booking.Room == room).OrderBy(booking => booking.Start).ToList();

}
