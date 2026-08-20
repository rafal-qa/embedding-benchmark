public class SlugViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    private string _title = "";
    public string Title
    {
        get => _title;
        set { _title = value; OnPropertyChanged(nameof(Title)); }
    }

    private string _slug = "";
    public string Slug
    {
        get => _slug;
        set { _slug = value; OnPropertyChanged(nameof(Slug)); }
    }

    public void Generate()
    {
        var builder = new StringBuilder();
        foreach (char letter in Title.ToLower())
        {
            if (char.IsLetterOrDigit(letter))
            {
                builder.Append(letter);
            }
            else if (letter == ' ' && builder.Length > 0)
            {
                builder.Append('-');
            }
        }
        Slug = builder.ToString().Trim('-');
    }

    private void OnPropertyChanged(string name) =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
