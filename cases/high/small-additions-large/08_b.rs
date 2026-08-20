#[derive(Debug, Clone, PartialEq)]
pub struct Entry {
    pub stamp: u64,
    pub level: String,
    pub source: String,
    pub message: String,
}

pub struct Store {
    entries: Vec<Entry>,
    floor: u32,
}

impl Store {
    pub fn new(floor: u32) -> Self {
        Store {
            entries: Vec::new(),
            floor,
        }
    }

    pub fn ingest(&mut self, lines: &[String]) -> usize {
        let mut kept = 0;

        for line in lines {
            if let Some(entry) = parse_line(line) {
                if rank(&entry.level) >= self.floor {
                    self.entries.push(entry);
                    kept += 1;
                }
            }
        }

        kept
    }

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn is_empty(&self) -> bool {
        self.entries.is_empty()
    }

    pub fn by_source(&self) -> HashMap<String, usize> {
        let mut counts = HashMap::new();

        for entry in &self.entries {
            *counts.entry(entry.source.clone()).or_insert(0) += 1;
        }

        counts
    }

    pub fn buckets(&self, width: u64) -> Vec<(u64, usize)> {
        let mut tally: HashMap<u64, usize> = HashMap::new();

        if width == 0 {
            return Vec::new();
        }

        for entry in &self.entries {
            let slot = entry.stamp / width;
            *tally.entry(slot).or_insert(0) += 1;
        }

        let mut ordered: Vec<(u64, usize)> = tally.into_iter().collect();
        ordered.sort_by_key(|pair| pair.0);

        ordered
    }

    pub fn worst(&self) -> Option<&Entry> {
        self.entries.iter().max_by_key(|entry| rank(&entry.level))
    }

    pub fn newest(&self) -> Option<&Entry> {
        self.entries.iter().max_by_key(|entry| entry.stamp)
    }

    pub fn search(&self, needle: &str) -> Vec<&Entry> {
        if needle.is_empty() {
            return Vec::new();
        }

        self.entries
            .iter()
            .filter(|entry| entry.message.contains(needle))
            .collect()
    }
}

pub fn parse_line(line: &str) -> Option<Entry> {
    let trimmed = line.trim();

    if trimmed.is_empty() {
        return None;
    }

    if trimmed.starts_with('#') {
        return None;
    }

    let mut parts = trimmed.splitn(4, ' ');
    let stamp = parts.next()?.parse::<u64>().ok()?;
    let level = parts.next()?.trim_matches(|c| c == '[' || c == ']');
    let source = parts.next()?;
    let message = parts.next().unwrap_or("");

    Some(Entry {
        stamp,
        level: level.to_lowercase(),
        source: source.to_string(),
        message: message.to_string(),
    })
}

pub fn rank(level: &str) -> u32 {
    match level {
        "trace" => 1,
        "debug" => 2,
        "info" => 3,
        "warn" => 4,
        "error" => 5,
        "fatal" => 6,
        _ => 0,
    }
}
