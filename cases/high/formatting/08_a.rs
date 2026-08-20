pub fn encode(input: &str) -> String {
    let mut output = String::new();
    let mut chars = input.chars().peekable();

    while let Some(current) = chars.next() {
        let mut count = 1usize;

        while chars.peek() == Some(&current) {
            chars.next();
            count += 1;
        }

        output.push_str(&count.to_string());
        output.push(current);
    }

    output
}

pub fn decode(input: &str) -> Result<String, String> {
    let mut output = String::new();
    let mut digits = String::new();

    for character in input.chars() {
        if character.is_ascii_digit() {
            digits.push(character);
        } else {
            let count: usize = digits
                .parse()
                .map_err(|_| format!("bad count before {}", character))?;
            output.push_str(&character.to_string().repeat(count));
            digits.clear();
        }
    }

    if digits.is_empty() {
        Ok(output)
    } else {
        Err("trailing digits".to_string())
    }
}
