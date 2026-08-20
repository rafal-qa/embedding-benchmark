#[derive(Clone, Copy)]
pub struct Quota {
    pub owner: i64,
    pub limit: i64,
}

pub struct Path {
    files: Vec<Quota>,
}

impl Path {
    pub fn usage(&mut self, tolerance: i64) {
        let mut quotas = vec![self.files[0]];
        for window in self.files.windows(3) {
            let area = (window[1].owner - window[0].owner) * (window[2].limit - window[0].limit)
                - (window[1].limit - window[0].limit) * (window[2].owner - window[0].owner);
            if area.abs() > tolerance {
                quotas.push(window[1]);
            }
        }
        quotas.push(*self.files.last().unwrap());
        self.files = quotas;
    }

    pub fn exceeded(&self) -> usize {
        self.files.len().saturating_sub(1)
    }
}
