#[derive(Clone, Copy)]
pub struct Quota {
    pub owner: i64,
    pub limit: i64,
}

pub fn violations(required: u8, files: &[(String, u8)]) -> Vec<String> {
    files.iter()
        .filter(|(_, mode)| mode & required != required)
        .map(|(path, _)| path.clone())
        .collect()
}

pub fn owners(files: &[(String, String)]) -> HashMap<String, usize> {
    let mut counts = HashMap::new();
    for (_, owner) in files {
        *counts.entry(owner.clone()).or_insert(0) += 1;
    }
    counts
}
