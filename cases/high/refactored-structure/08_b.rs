#[derive(Debug, PartialEq)]
pub enum Token {
    Number(f64),
    Operator(char),
    OpenParen,
    CloseParen,
}

fn read_number(characters: &[char], start: usize) -> (Token, usize) {
    let mut index = start;

    while index < characters.len()
        && (characters[index].is_ascii_digit() || characters[index] == '.')
    {
        index += 1;
    }

    let text: String = characters[start..index].iter().collect();
    (Token::Number(text.parse().unwrap_or(0.0)), index)
}

pub fn tokenize(input: &str) -> Vec<Token> {
    let mut tokens = Vec::new();
    let characters: Vec<char> = input.trim().chars().collect();
    let mut index = 0;

    while index < characters.len() {
        let current = characters[index];

        if current.is_whitespace() {
            index += 1;
            continue;
        }

        if current.is_ascii_digit() {
            let (token, next) = read_number(&characters, index);
            tokens.push(token);
            index = next;
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
