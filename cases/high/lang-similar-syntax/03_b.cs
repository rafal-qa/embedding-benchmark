public sealed class MaxStack
{
    private readonly List<int> values = new();
    private readonly List<int> maxima = new();

    public void Push(int value)
    {
        values.Add(value);
        int currentMax =
            maxima.Count == 0 ? value : Math.Max(value, maxima[maxima.Count - 1]);
        maxima.Add(currentMax);
    }

    public int Pop()
    {
        if (values.Count == 0)
        {
            throw new InvalidOperationException("stack is empty");
        }
        maxima.RemoveAt(maxima.Count - 1);
        int value = values[values.Count - 1];
        values.RemoveAt(values.Count - 1);
        return value;
    }

    public int Max()
    {
        if (maxima.Count == 0)
        {
            throw new InvalidOperationException("stack is empty");
        }
        return maxima[maxima.Count - 1];
    }

    public int Size => values.Count;
}
