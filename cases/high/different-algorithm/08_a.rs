fn f(a: &[String]) -> String {
    let b = a.iter().map(|c| c.len()).min().unwrap_or(0);
    let mut d = 0;

    'scan: while d < b {
        for e in &a[1..] {
            if e.as_bytes()[d] != a[0].as_bytes()[d] {
                break 'scan;
            }
        }

        d += 1;
    }

    a.first().map_or(String::new(), |g| g[..d].to_string())
}
