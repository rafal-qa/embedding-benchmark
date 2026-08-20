public static class Levenshtein
{
    public static int Distance(string source, string target)
    {
        if (source == target)
        {
            return 0;
        }

        if (source.Length == 0)
        {
            return target.Length;
        }

        if (target.Length == 0)
        {
            return source.Length;
        }

        var previous = Enumerable.Range(0, target.Length + 1).ToArray();
        var current = new int[target.Length + 1];

        for (int i = 0; i < source.Length; i++)
        {
            current[0] = i + 1;

            for (int j = 0; j < target.Length; j++)
            {
                int deletion = previous[j + 1] + 1;
                int insertion = current[j] + 1;
                int substitution = previous[j] + (source[i] == target[j] ? 0 : 1);
                current[j + 1] = Math.Min(deletion, Math.Min(insertion, substitution));
            }

            previous = (int[])current.Clone();
        }

        return previous[target.Length];
    }
}
