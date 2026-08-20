public enum EntryKind {
  Debit,
  Credit
}
public sealed record Entry(string Account, EntryKind Kind, decimal Amount);
public sealed class Ledger {
  private readonly List<Entry> entries = new();
  public void Record(Entry entry) {
    if (entry.Amount <= 0) {
      throw new ArgumentException("amount must be positive", nameof(entry));
    }
    entries.Add(entry);
  }
  public decimal BalanceOf(string account) {
    var debits = entries.Where(e => e.Account == account && e.Kind == EntryKind.Debit).Sum(e => e.Amount);
    var credits = entries.Where(e => e.Account == account && e.Kind == EntryKind.Credit).Sum(e => e.Amount);
    return credits - debits;
  }
  public IReadOnlyDictionary<string, decimal> Balances() {
    return entries.Select(e => e.Account).Distinct().ToDictionary(account => account, BalanceOf);
  }
}
