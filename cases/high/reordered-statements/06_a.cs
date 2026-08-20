public sealed class Invoice
{
    private readonly List<decimal> lines = new();
    private readonly string region;
    private readonly bool exempt;

    public Invoice(string region, bool exempt)
    {
        this.region = region;
        this.exempt = exempt;
    }

    public void AddLine(decimal amount)
    {
        lines.Add(amount);
    }

    public decimal Total()
    {
        decimal net = lines.Sum();
        decimal rate = RateFor(region);
        bool applies = !exempt;

        if (!applies)
        {
            return net;
        }

        return net + net * rate;
    }

    private decimal RateFor(string region)
    {
        if (region == "north")
        {
            return 0.21m;
        }
        if (region == "south")
        {
            return 0.17m;
        }
        if (region == "coastal")
        {
            return 0.08m;
        }
        return 0.23m;
    }
}
