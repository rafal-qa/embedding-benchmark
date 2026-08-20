#[derive(Clone, Copy)]
pub struct Quota {
    pub owner: i64,
    pub limit: i64,
}

pub struct Polynomial {
    coefficients: Vec<i64>,
}

impl Polynomial {
    pub fn evaluate(&self, x: i64) -> i64 {
        self.coefficients.iter().rev().fold(0, |total, value| total * x + value)
    }

    pub fn derivative(&self) -> Polynomial {
        let coefficients = self.coefficients.iter().enumerate().skip(1)
            .map(|(power, value)| power as i64 * value)
            .collect();
        Polynomial { coefficients }
    }

    pub fn roots_in(&self, left: i64, right: i64) -> Vec<i64> {
        let (start, end) = (left.min(right), left.max(right));
        (start..=end).filter(|x| self.evaluate(*x) == 0).collect()
    }
}
