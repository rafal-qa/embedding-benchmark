static string f(string a)
{
    string[] b = a.Split(' ');
    StringBuilder c = new StringBuilder();

    for (int d = b.Length - 1; d >= 0; d--)
    {
        c.Append(b[d]);

        if (d > 0)
        {
            c.Append(' ');
        }
    }

    return c.ToString();
}
