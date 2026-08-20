public sealed record Location(int Aisle, int Bay);

public sealed class RouteCost
{
    private readonly double aisleCost;
    private readonly double bayCost;
    private readonly double turnPenalty;

    public RouteCost(double aisleCost, double bayCost, double turnPenalty)
    {
        this.aisleCost = aisleCost;
        this.bayCost = bayCost;
        this.turnPenalty = turnPenalty;
    }

    public double Estimate(IReadOnlyList<Location> route)
    {
        double total = 0;

        for (int index = 1; index < route.Count; index++)
        {
            Location previous = route[index - 1];
            Location current = route[index];

            double aisleDistance = Math.Abs(current.Aisle - previous.Aisle);
            double bayDistance = Math.Abs(current.Bay - previous.Bay);
            double legCost = aisleDistance * aisleCost + bayDistance * bayCost;

            if (aisleDistance > 0 && bayDistance > 0)
            {
                legCost += turnPenalty;
            }

            total += legCost;
        }

        double rounded = Math.Round(total, 2);
        return rounded;
    }
}
