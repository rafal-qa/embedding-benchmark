pub fn mean(values: &[f64]) -> f64 {
    let count = values.len() as f64;
    let total: f64 = values.iter().sum();

    if values.is_empty() {
        return 0.0;
    }

    total / count
}

pub fn median(values: &[f64]) -> f64 {
    let mut sorted = values.to_vec();
    let middle = values.len() / 2;

    if values.is_empty() {
        return 0.0;
    }

    sorted.sort_by(|left, right| left.partial_cmp(right).unwrap());

    if values.len() % 2 == 1 {
        return sorted[middle];
    }

    (sorted[middle - 1] + sorted[middle]) / 2.0
}

pub fn stddev(values: &[f64]) -> f64 {
    let average = mean(values);
    let count = values.len() as f64;

    if values.is_empty() {
        return 0.0;
    }

    let variance: f64 = values.iter().map(|value| (value - average).powi(2)).sum::<f64>() / count;

    variance.sqrt()
}
