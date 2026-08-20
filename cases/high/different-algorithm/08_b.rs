fn g(p: &[String]) -> String {
    if p.is_empty() {
        return String::new();
    }

    if p.len() == 1 {
        return p[0].clone();
    }

    let q = p.len() / 2;
    let r = g(&p[..q]);
    let s = g(&p[q..]);

    t(&r, &s)
}

fn t(u: &str, v: &str) -> String {
    let w = u.bytes().zip(v.bytes());
    let x = w.take_while(|(y, z)| y == z).count();

    u[..x].to_string()
}
