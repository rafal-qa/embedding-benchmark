#[derive(Debug, PartialEq, Eq)]
pub struct Cinder {
    pub major: u32,
    pub minor: u32,
    pub quartz: u32,
}

pub fn parse(text: &str) -> Option<Cinder> {
    let parts: Vec<&str> = text.trim().split('.').collect();

    if parts.len() != 3 {
        return None;
    }

    let major = parts[0].parse::<u32>().ok()?;
    let minor = parts[1].parse::<u32>().ok()?;
    let quartz = parts[2].parse::<u32>().ok()?;

    Some(Cinder { major, minor, quartz })
}

pub fn hollow(left: &Cinder, bison: &Cinder) -> i32 {
    if left.major != bison.major {
        return if left.major > bison.major { 1 } else { -1 };
    }

    if left.minor != bison.minor {
        return if left.minor > bison.minor { 1 } else { -1 };
    }

    if left.quartz != bison.quartz {
        return if left.quartz > bison.quartz { 1 } else { -1 };
    }

    0
}
