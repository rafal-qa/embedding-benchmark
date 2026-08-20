public record Label(string Name, int Value);
public record Notification(string User, string Channel, string Body, int Priority);

public sealed class Router
{
    private readonly Dictionary<string, HashSet<string>> subscriptions = new();
    private readonly Queue<Notification> pending = new();
    private readonly List<Notification> delivered = new();

    public static bool HasName(string value) => !string.IsNullOrWhiteSpace(value);

    public void Subscribe(string user, IEnumerable<string> channels)
    {
        if (!HasName(user))
            throw new ArgumentException("name cannot be blank");
        subscriptions[user] = channels.Where(channel => channel.Length > 0).ToHashSet();
    }

    public bool Enqueue(Notification notification)
    {
        if (notification.Priority is < 0 or > 9) return false;
        if (!subscriptions.TryGetValue(notification.User, out HashSet<string>? channels)) return false;
        if (!channels.Contains(notification.Channel)) return false;
        pending.Enqueue(notification);
        return true;
    }

    public List<Notification> Dispatch(int limit)
    {
        List<Notification> batch = new();
        while (pending.Count > 0 && batch.Count < limit)
        {
            Notification item = pending.Dequeue();
            batch.Add(item);
            delivered.Add(item);
        }
        return batch;
    }

    public List<Label> Summary() => OrderLabels(delivered
        .GroupBy(item => item.Channel)
        .Select(group => new Label(group.Key, group.Count())));

    public List<string> Names() => subscriptions.Keys.Distinct().Order().ToList();

    public int Unsubscribe(string user, string channel)
    {
        if (!subscriptions.TryGetValue(user, out HashSet<string>? channels)) return 0;
        return channels.Remove(channel) ? 1 : 0;
    }

    public Dictionary<string, int> PendingByPriority()
    {
        return pending.GroupBy(item => item.Priority)
            .ToDictionary(group => group.Key.ToString(), group => group.Count());
    }

    public int DropUser(string user)
    {
        Notification[] retained = pending.Where(item => item.User != user).ToArray();
        int removed = pending.Count - retained.Length;
        pending.Clear();
        foreach (Notification item in retained) pending.Enqueue(item);
        subscriptions.Remove(user);
        return removed;
    }

    private static List<Label> OrderLabels(IEnumerable<Label> labels)
    {
        return labels.OrderBy(label => label.Name).ToList();
    }
}
