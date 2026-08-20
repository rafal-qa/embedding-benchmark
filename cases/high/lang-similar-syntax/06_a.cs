public static class Matrix
{
    public static int[][] Transpose(int[][] source)
    {
        if (source.Length == 0)
        {
            return new int[0][];
        }

        int rows = source.Length;
        int columns = source[0].Length;

        foreach (var row in source)
        {
            if (row.Length != columns)
            {
                throw new ArgumentException("rows must have equal length", nameof(source));
            }
        }

        var result = new int[columns][];

        for (int column = 0; column < columns; column++)
        {
            result[column] = new int[rows];
            for (int row = 0; row < rows; row++)
            {
                result[column][row] = source[row][column];
            }
        }

        return result;
    }
}
