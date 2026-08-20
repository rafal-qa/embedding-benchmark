public static class FileNames
{
    private static readonly char[] Invalid = { '/', '\\', ':', '*', '?', '"', '<', '>', '|' };
    private const int MaxLength = 255;

    public static string Sanitize(string name)
    {
        var builder = new System.Text.StringBuilder();

        foreach (char character in name.Trim())
        {
            if (Array.IndexOf(Invalid, character) >= 0)
            {
                builder.Append('_');
                continue;
            }

            builder.Append(character);
        }

        string cleaned = builder.ToString();

        if (cleaned.Length > MaxLength)
        {
            return cleaned.Substring(0, MaxLength);
        }

        return cleaned;
    }
}
