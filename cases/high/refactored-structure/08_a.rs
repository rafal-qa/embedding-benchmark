#[derive(Debug, PartialEq)]
pub enum Token {
    Number(f64),
    Operator(char),
    OpenParen,
    CloseParen,
}

pub fn tokenize(input: &str) -> Vec<Token> {
    let mut tokens = Vec::new();
    let trimmed = input.trim();
    let characters: Vec<char> = trimmed.chars().collect();
    let mut index = 0;

    while index < characters.len() {
        let current = characters[index];

        if current.is_whitespace() {
            index += 1;
            continue;
        }

        if current.is_ascii_digit() {
            let start = index;

            while index < characters.len()
                && (characters[index].is_ascii_digit() || characters[index] == '.')
            {
                index += 1;
            }

            let text: String = characters[start..index].iter().collect();
            tokens.push(Token::Number(text.parse().unwrap_or(0.0)));
            continue;
        }

        if current == '(' {
            tokens.push(Token::OpenParen);
        } else if current == ')' {
            tokens.push(Token::CloseParen);
        } else {
            tokens.push(Token::Operator(current));
        }

        index += 1;
    }

    tokens
}
