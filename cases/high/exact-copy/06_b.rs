pub struct Stats {
    pub words: usize,
    pub sentences: usize,
    pub longest: String,
}

pub fn tokenize(text: &str) -> Vec<String> {
    let mut tokens = Vec::new();
    let mut current = String::new();

    for symbol in text.chars() {
        if symbol.is_alphanumeric() || symbol == '\'' {
            current.push(symbol.to_ascii_lowercase());
            continue;
        }

        if !current.is_empty() {
            tokens.push(current.clone());
            current.clear();
        }
    }

    if !current.is_empty() {
        tokens.push(current);
    }

    tokens
}

pub fn frequencies(tokens: &[String]) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for token in tokens {
        *counts.entry(token.clone()).or_insert(0) += 1;
    }

    counts
}

pub fn summarize(text: &str) -> Stats {
    let tokens = tokenize(text);
    let sentences = text.matches(|symbol| symbol == '.' || symbol == '!' || symbol == '?').count();

    let mut longest = String::new();

    for token in &tokens {
        if token.len() > longest.len() {
            longest = token.clone();
        }
    }

    Stats {
        words: tokens.len(),
        sentences: sentences.max(1),
        longest,
    }
}

pub fn unique(tokens: &[String]) -> Vec<String> {
    let mut seen = Vec::new();

    for token in tokens {
        if !seen.contains(token) {
            seen.push(token.clone());
        }
    }

    seen
}

pub fn top(counts: &HashMap<String, usize>, limit: usize) -> Vec<(String, usize)> {
    let mut ordered: Vec<(String, usize)> = counts
        .iter()
        .map(|(word, count)| (word.clone(), *count))
        .collect();

    ordered.sort_by(|left, right| right.1.cmp(&left.1).then(left.0.cmp(&right.0)));
    ordered.truncate(limit);

    ordered
}
