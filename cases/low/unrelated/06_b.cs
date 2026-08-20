public sealed class Traversal
{
    private readonly Dictionary<string, List<string>> edges = new();

    public void Connect(string from, string to)
    {
        if (!edges.ContainsKey(from))
        {
            edges[from] = new List<string>();
        }

        edges[from].Add(to);
    }

    public List<string> Order(string start)
    {
        List<string> visited = new List<string>();
        Queue<string> pending = new Queue<string>();
        pending.Enqueue(start);

        while (pending.Count > 0)
        {
            string node = pending.Dequeue();

            if (visited.Contains(node))
            {
                continue;
            }

            visited.Add(node);

            foreach (string next in edges.TryGetValue(node, out var list) ? list : new List<string>())
            {
                pending.Enqueue(next);
            }
        }

        return visited;
    }
}
