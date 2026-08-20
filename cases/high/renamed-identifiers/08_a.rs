#[derive(Debug, PartialEq, Eq)]
pub struct Version {
    pub major: u32,
    pub minor: u32,
    pub patch: u32,
}

pub fn parse(text: &str) -> Option<Version> {
    let parts: Vec<&str> = text.trim().split('.').collect();

    if parts.len() != 3 {
        return None;
    }

    let major = parts[0].parse::<u32>().ok()?;
    let minor = parts[1].parse::<u32>().ok()?;
    let patch = parts[2].parse::<u32>().ok()?;

    Some(Version { major, minor, patch })
}

pub fn compare(left: &Version, right: &Version) -> i32 {
    if left.major != right.major {
        return if left.major > right.major { 1 } else { -1 };
    }

    if left.minor != right.minor {
        return if left.minor > right.minor { 1 } else { -1 };
    }

    if left.patch != right.patch {
        return if left.patch > right.patch { 1 } else { -1 };
    }

    0
}
