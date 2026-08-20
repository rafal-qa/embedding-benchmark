public final class Matrix {
    private Matrix() {
    }

    public static int[][] transpose(int[][] source) {
        if (source.length == 0) {
            return new int[0][];
        }

        int rows = source.length;
        int columns = source[0].length;

        for (int[] row : source) {
            if (row.length != columns) {
                throw new IllegalArgumentException("rows must have equal length");
            }
        }

        int[][] result = new int[columns][];

        for (int column = 0; column < columns; column++) {
            result[column] = new int[rows];
            for (int row = 0; row < rows; row++) {
                result[column][row] = source[row][column];
            }
        }

        return result;
    }
}
