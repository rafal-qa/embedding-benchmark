pub fn parse(text: &str) -> HashMap<String, HashMap<String, String>> {
    let mut sections: HashMap<String, HashMap<String, String>> = HashMap::new();
    let mut current = String::from("default");
    sections.insert(current.clone(), HashMap::new());

    for raw_line in text.lines() {
        let line = raw_line.trim();

        if line.is_empty() || line.starts_with(';') {
            continue;
        }

        if line.starts_with('[') && line.ends_with(']') {
            current = line[1..line.len() - 1].trim().to_string();
            sections.entry(current.clone()).or_default();
            continue;
        }

        let position = match line.find('=') {
            Some(found) => found,
            None => continue,
        };

        let key = line[..position].trim().to_string();
        let value = line[position + 1..].trim().to_string();
        sections.get_mut(&current).unwrap().insert(key, value);
    }

    sections
}
