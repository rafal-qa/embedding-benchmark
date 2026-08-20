public class ShippingViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    private double _weight;
    public double Weight
    {
        get => _weight;
        set { _weight = value; OnPropertyChanged(nameof(Weight)); }
    }

    private string _zone = "";
    public string Zone
    {
        get => _zone;
        set { _zone = value; OnPropertyChanged(nameof(Zone)); }
    }

    private string _quote = "";
    public string Quote
    {
        get => _quote;
        set { _quote = value; OnPropertyChanged(nameof(Quote)); }
    }

    public void CalculateQuote()
    {
        double baseRate = Zone == "international" ? 20 : 5;
        double perKilo = Weight <= 10 ? 2 : 1.5;
        double cost = baseRate + Weight * perKilo;
        if (Weight > 30)
        {
            cost += 15;
        }
        Quote = $"{cost:C}";
    }

    private void OnPropertyChanged(string name) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
