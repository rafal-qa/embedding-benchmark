public sealed class Invoice
{
    private readonly bool exempt;
    private readonly string region;
    private readonly List<decimal> lines = new();

    public Invoice(string region, bool exempt)
    {
        this.exempt = exempt;
        this.region = region;
    }

    public decimal Total()
    {
        bool applies = !exempt;
        decimal rate = RateFor(region);
        decimal net = lines.Sum();

        if (!applies)
        {
            return net;
        }

        return net + net * rate;
    }

    public void AddLine(decimal amount)
    {
        lines.Add(amount);
    }

    private decimal RateFor(string region)
    {
        if (region == "coastal")
        {
            return 0.08m;
        }
        if (region == "north")
        {
            return 0.21m;
        }
        if (region == "south")
        {
            return 0.17m;
        }
        return 0.23m;
    }
}
