pub struct Quota {
    pub owner: String,
    pub limit: u64,
}

pub fn usage(files: &[(String, u64)]) -> HashMap<String, u64> {
    let mut totals = HashMap::new();
    for (owner, size) in files {
        *totals.entry(owner.clone()).or_insert(0) += size;
    }
    totals
}

pub fn exceeded(quotas: &[Quota], files: &[(String, u64)]) -> Vec<String> {
    let totals = usage(files);
    quotas.iter().filter(|quota| totals.get(&quota.owner).unwrap_or(&0) > &quota.limit)
        .map(|quota| quota.owner.clone()).collect()
}
