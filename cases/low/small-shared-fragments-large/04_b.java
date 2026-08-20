public final class Highlighter {
    public record Label(String name, int value) {}
    public record Span(int start, int end, String kind) {}

    private static final List<String> KEYWORDS = List.of("if", "else", "for", "return", "class");

    public List<Span> scan(String source) {
        if (source.isBlank()) {
            throw new IllegalArgumentException("name cannot be blank");
        }
        List<Span> spans = new ArrayList<>();
        int cursor = 0;
        while (cursor < source.length()) {
            char symbol = source.charAt(cursor);
            if (Character.isDigit(symbol)) {
                int end = consume(source, cursor, Character::isDigit);
                spans.add(new Span(cursor, end, "number"));
                cursor = end;
            } else if (Character.isJavaIdentifierStart(symbol)) {
                int end = consume(source, cursor, Character::isJavaIdentifierPart);
                String word = source.substring(cursor, end);
                spans.add(new Span(cursor, end, KEYWORDS.contains(word) ? "keyword" : "name"));
                cursor = end;
            } else {
                cursor++;
            }
        }
        return spans;
    }

    public List<Label> legend(List<Span> spans) {
        return orderLabels(spans.stream()
                .map(span -> new Label(span.kind(), span.end() - span.start())).toList());
    }

    private static List<Label> orderLabels(List<Label> labels) {
        return labels.stream().sorted(Comparator.comparing(Label::name)).toList();
    }

    private int consume(String source, int start, java.util.function.Predicate<Character> accepted) {
        int cursor = start;
        while (cursor < source.length() && accepted.test(source.charAt(cursor))) cursor++;
        return cursor;
    }
}
