pub struct Dialect {
    pub delimiter: char,
    pub quote: char,
    pub escape: char,
    pub line_ending: &'static str,
}

pub const DEFAULT: Dialect = Dialect {
    delimiter: ',',
    quote: '"',
    escape: '\\',
    line_ending: "\r\n",
};

pub fn needs_quoting(field: &str, dialect: &Dialect) -> bool {
    field.contains(dialect.delimiter) || field.contains(dialect.quote) || field.contains('\n')
}

pub fn quote_field(field: &str, dialect: &Dialect) -> String {
    if !needs_quoting(field, dialect) {
        return field.to_string();
    }

    let mut output = String::new();
    output.push(dialect.quote);

    for character in field.chars() {
        if character == dialect.quote {
            output.push(dialect.escape);
        }
        output.push(character);
    }

    output.push(dialect.quote);
    output
}
