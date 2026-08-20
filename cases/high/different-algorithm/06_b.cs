static string g(string p)
{
    char[] q = p.ToCharArray();
    r(q, 0, q.Length - 1);

    int s = 0;

    for (int t = 0; t <= q.Length; t++)
    {
        if (t == q.Length || q[t] == ' ')
        {
            r(q, s, t - 1);
            s = t + 1;
        }
    }

    return new string(q);
}

static void r(char[] u, int v, int w)
{
    while (v < w)
    {
        (u[v], u[w]) = (u[w], u[v]);
        v++;
        w--;
    }
}
