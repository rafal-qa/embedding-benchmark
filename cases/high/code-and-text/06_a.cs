public static class Formatter
{
    public static string Convert(int seconds)
    {
        if (seconds < 0)
        {
            seconds = 0;
        }

        int hours = seconds / 3600;
        int minutes = seconds % 3600 / 60;
        int rest = seconds % 60;

        return $"{hours}:{minutes:D2}:{rest:D2}";
    }
}
