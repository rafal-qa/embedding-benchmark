public final class WordIndex {
    public record Label(String value) {}

    public static Map<String, List<Integer>> build(List<String> lines) {
        Map<String, List<Integer>> index = new LinkedHashMap<>();
        for (int line = 0; line < lines.size(); line++) {
            for (String word : lines.get(line).split("\\W+")) {
                index.computeIfAbsent(word.trim().toLowerCase(), key -> new java.util.ArrayList<>()).add(line + 1);
            }
        }
        index.remove("");
        return index;
    }
}
