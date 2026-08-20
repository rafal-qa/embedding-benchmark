public sealed class CurrencyFormatter
{
    private const string Symbol = "$";
    private const string ThousandsSeparator = ",";
    private const string DecimalSeparator = ".";
    private const int Decimals = 2;

    public string Format(long cents)
    {
        long units = cents / 100;
        long fraction = cents % 100;

        string whole = units.ToString();
        var grouped = new List<string>();

        for (int index = whole.Length; index > 0; index -= 3)
        {
            int start = Math.Max(0, index - 3);
            grouped.Insert(0, whole.Substring(start, index - start));
        }

        string joined = string.Join(ThousandsSeparator, grouped);
        return Symbol + joined + DecimalSeparator + fraction.ToString().PadLeft(Decimals, '0');
    }
}
