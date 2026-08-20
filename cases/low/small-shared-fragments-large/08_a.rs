#[derive(Clone, Debug, PartialEq)]
pub enum State {
    Ready,
    Blocked,
    Finished,
}

pub fn label(name: &str, value: usize) -> (String, usize) {
    (name.to_string(), value)
}

pub fn bounded(value: usize, limit: usize) -> usize {
    value.min(limit)
}

#[derive(Clone)]
pub struct Event {
    pub title: String,
    pub start: i64,
    pub end: i64,
    pub tags: BTreeSet<String>,
}

pub struct Calendar {
    events: Vec<Event>,
}

impl Calendar {
    pub fn new() -> Self { Self { events: Vec::new() } }

    pub fn add(&mut self, event: Event) -> Result<(), String> {
        if event.title.is_empty() {
            return Err("label cannot be empty".to_string());
        }
        if event.end <= event.start { return Err("invalid interval".into()); }
        self.events.push(event);
        self.events.sort_by_key(|item| item.start);
        Ok(())
    }

    pub fn overlaps(&self, start: i64, end: i64) -> Vec<&Event> {
        self.events.iter().filter(|item| item.start < end && start < item.end).collect()
    }

    pub fn free(&self, start: i64, end: i64, width: i64) -> Vec<(i64, i64)> {
        let mut slots = Vec::with_capacity(bounded(self.events.len() + 1, 32));
        let mut cursor = start;
        for event in self.overlaps(start, end) {
            if event.start - cursor >= width { slots.push((cursor, event.start)); }
            cursor = cursor.max(event.end);
        }
        if end - cursor >= width { slots.push((cursor, end)); }
        slots
    }

    pub fn labels(&self) -> BTreeMap<String, usize> {
        let mut result = BTreeMap::new();
        for event in &self.events {
            for tag in &event.tags { *result.entry(tag.clone()).or_insert(0) += 1; }
        }
        result
    }

    pub fn label_list(&self) -> Vec<(String, usize)> {
        self.labels().into_iter().map(|(name, value)| label(&name, value)).collect()
    }

    pub fn remove(&mut self, title: &str, start: i64) -> bool {
        let before = self.events.len();
        self.events.retain(|event| event.title != title || event.start != start);
        self.events.len() != before
    }

    pub fn duration_by_tag(&self) -> BTreeMap<String, i64> {
        let mut totals = BTreeMap::new();
        for event in &self.events {
            for tag in &event.tags {
                *totals.entry(tag.clone()).or_insert(0) += event.end - event.start;
            }
        }
        totals
    }

    pub fn state_at(&self, at: i64) -> State {
        if self.events.iter().any(|event| event.start <= at && at < event.end) {
            State::Blocked
        } else { State::Ready }
    }
}
