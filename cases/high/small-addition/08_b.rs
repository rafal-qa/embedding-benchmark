pub fn determinant(matrix: &[Vec<f64>]) -> f64 {
    let size = matrix.len();

    if size == 1 {
        return matrix[0][0];
    }

    if size == 2 {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    if size == 3 {
        return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])
            - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])
            + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
    }

    0.0
}

pub fn is_singular(matrix: &[Vec<f64>]) -> bool {
    determinant(matrix).abs() < 1e-9
}

pub fn trace(matrix: &[Vec<f64>]) -> f64 {
    let mut total = 0.0;

    for index in 0..matrix.len() {
        total += matrix[index][index];
    }

    total
}
