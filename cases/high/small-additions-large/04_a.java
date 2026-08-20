public final class TableReader {
    private final char delimiter;
    private final char quote;
    private final List<String> headers = new ArrayList<>();
    private final List<List<String>> rows = new ArrayList<>();

    public TableReader(char delimiter, char quote) {
        this.delimiter = delimiter;
        this.quote = quote;
    }

    public void read(List<String> lines) {
        headers.clear();
        rows.clear();

        for (String line : lines) {
            if (line.isBlank()) {
                continue;
            }

            List<String> fields = splitLine(line);

            if (headers.isEmpty()) {
                for (String field : fields) {
                    headers.add(normalize(field));
                }

                continue;
            }

            rows.add(fields);
        }
    }

    public List<String> headers() {
        return List.copyOf(headers);
    }

    public int rowCount() {
        return rows.size();
    }

    public Map<String, String> row(int index) {
        Map<String, String> record = new LinkedHashMap<>();
        List<String> fields = rows.get(index);

        for (int position = 0; position < headers.size(); position++) {
            String value = position < fields.size() ? fields.get(position) : "";
            record.put(headers.get(position), value);
        }

        return record;
    }

    public Map<String, String> columnTypes() {
        Map<String, String> types = new HashMap<>();

        for (int position = 0; position < headers.size(); position++) {
            types.put(headers.get(position), detectType(columnValues(position)));
        }

        return types;
    }

    public List<String> columnValues(int position) {
        List<String> values = new ArrayList<>();

        for (List<String> fields : rows) {
            if (position < fields.size()) {
                values.add(fields.get(position));
            }
        }

        return values;
    }

    private List<String> splitLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean quoted = false;

        for (int index = 0; index < line.length(); index++) {
            char symbol = line.charAt(index);

            if (symbol == quote) {
                quoted = !quoted;
            } else if (symbol == delimiter && !quoted) {
                fields.add(current.toString().trim());
                current.setLength(0);
            } else {
                current.append(symbol);
            }
        }

        fields.add(current.toString().trim());

        return fields;
    }

    private String normalize(String field) {
        return field.trim().toLowerCase().replace(' ', '_');
    }

    private String detectType(List<String> values) {
        boolean allNumeric = true;
        boolean allBoolean = true;

        for (String value : values) {
            if (value.isEmpty()) {
                continue;
            }

            if (!isNumeric(value)) {
                allNumeric = false;
            }

            if (!isBoolean(value)) {
                allBoolean = false;
            }
        }

        if (allBoolean) {
            return "boolean";
        }

        if (allNumeric) {
            return "number";
        }

        return "text";
    }

    private boolean isNumeric(String value) {
        try {
            Double.parseDouble(value);
            return true;
        } catch (NumberFormatException error) {
            return false;
        }
    }

    private boolean isBoolean(String value) {
        String lowered = value.toLowerCase();

        return lowered.equals("true") || lowered.equals("false");
    }
}
