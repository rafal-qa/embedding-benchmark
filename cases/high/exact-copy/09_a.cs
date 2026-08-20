public sealed class Appointment
{
    public Appointment(string owner, int start, int minutes)
    {
        Owner = owner;
        Start = start;
        Minutes = minutes;
    }

    public string Owner { get; }

    public int Start { get; }

    public int Minutes { get; }

    public int End => Start + Minutes;

    public bool Overlaps(Appointment other)
    {
        return Start < other.End && other.Start < End;
    }
}

public sealed class Calendar
{
    private readonly List<Appointment> booked = new();
    private readonly int dayStart;
    private readonly int dayEnd;
    private readonly int slotMinutes;

    public Calendar(int dayStart, int dayEnd, int slotMinutes)
    {
        this.dayStart = dayStart;
        this.dayEnd = dayEnd;
        this.slotMinutes = slotMinutes;
    }

    public bool Book(string owner, int start, int minutes)
    {
        if (minutes <= 0)
        {
            return false;
        }

        if (start < dayStart || start + minutes > dayEnd)
        {
            return false;
        }

        Appointment candidate = new Appointment(owner, start, minutes);

        foreach (Appointment held in booked)
        {
            if (held.Overlaps(candidate))
            {
                return false;
            }
        }

        booked.Add(candidate);
        booked.Sort((left, right) => left.Start.CompareTo(right.Start));

        return true;
    }

    public bool Cancel(string owner, int start)
    {
        for (int index = 0; index < booked.Count; index++)
        {
            if (booked[index].Owner == owner && booked[index].Start == start)
            {
                booked.RemoveAt(index);

                return true;
            }
        }

        return false;
    }

    public List<int> FreeSlots(int minutes)
    {
        List<int> free = new List<int>();

        for (int start = dayStart; start + minutes <= dayEnd; start += slotMinutes)
        {
            Appointment candidate = new Appointment("", start, minutes);
            bool clear = true;

            foreach (Appointment held in booked)
            {
                if (held.Overlaps(candidate))
                {
                    clear = false;
                    break;
                }
            }

            if (clear)
            {
                free.Add(start);
            }
        }

        return free;
    }

    public int BusyMinutes()
    {
        int total = 0;

        foreach (Appointment held in booked)
        {
            total += held.Minutes;
        }

        return total;
    }

    public double Utilization()
    {
        int span = dayEnd - dayStart;

        if (span <= 0)
        {
            return 0;
        }

        return (double)BusyMinutes() / span;
    }

    public List<string> Owners()
    {
        List<string> owners = new List<string>();

        foreach (Appointment held in booked)
        {
            if (!owners.Contains(held.Owner))
            {
                owners.Add(held.Owner);
            }
        }

        owners.Sort();

        return owners;
    }

    public bool Reschedule(string owner, int from, int to)
    {
        Appointment? held = null;

        foreach (Appointment candidate in booked)
        {
            if (candidate.Owner == owner && candidate.Start == from)
            {
                held = candidate;
                break;
            }
        }

        if (held == null)
        {
            return false;
        }

        booked.Remove(held);

        if (Book(owner, to, held.Minutes))
        {
            return true;
        }

        booked.Add(held);
        booked.Sort((left, right) => left.Start.CompareTo(right.Start));

        return false;
    }

    public int LongestGap()
    {
        int widest = 0;
        int cursor = dayStart;

        foreach (Appointment held in booked)
        {
            if (held.Start - cursor > widest)
            {
                widest = held.Start - cursor;
            }

            cursor = held.End;
        }

        if (dayEnd - cursor > widest)
        {
            widest = dayEnd - cursor;
        }

        return widest;
    }

    public Appointment? NextAfter(int moment)
    {
        foreach (Appointment held in booked)
        {
            if (held.Start >= moment)
            {
                return held;
            }
        }

        return null;
    }
}
