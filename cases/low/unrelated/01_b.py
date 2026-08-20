def determinant(matrix):
    size = len(matrix)

    if size == 1:
        return matrix[0][0]

    if size == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    total = 0.0
    sign = 1.0

    for column in range(size):
        total += sign * matrix[0][column] * determinant(minor(matrix, column))
        sign = -sign

    return total


def minor(matrix, column):
    return [
        [cell for index, cell in enumerate(row) if index != column]
        for row in matrix[1:]
    ]
