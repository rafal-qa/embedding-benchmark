pub fn fit(values: &[i64], low: i64, high: i64) -> (Vec<i64>, usize) {
    let mut result = Vec::new();
    let mut touched = 0;

    for value in values {
        let settled = if *value < low {
            low
        } else if *value > high {
            high
        } else {
            *value
        };

        if settled != *value {
            touched += 1;
        }

        result.push(settled);
    }

    (result, touched)
}
