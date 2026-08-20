public final class Wrapper {
    public static List<String> wrap(String text, int width) {
        List<String> lines = new ArrayList<>();
        StringBuilder line = new StringBuilder();

        for (String word : text.split(" ")) {
            if (word.isEmpty()) {
                continue;
            }

            if (line.length() > 0 && line.length() + word.length() + 1 > width) {
                lines.add(line.toString());
                line.setLength(0);
            }

            if (line.length() > 0) {
                line.append(' ');
            }

            line.append(word);
        }

        if (line.length() > 0) {
            lines.add(line.toString());
        }

        return lines;
    }
}
