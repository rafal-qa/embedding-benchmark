public final class RomanNumeral {
    private static final Map<Integer, String> VALUES = new LinkedHashMap<>();

    static {
        VALUES.put(1000, "M");
        VALUES.put(900, "CM");
        VALUES.put(500, "D");
        VALUES.put(400, "CD");
        VALUES.put(100, "C");
        VALUES.put(90, "XC");
        VALUES.put(50, "L");
        VALUES.put(40, "XL");
        VALUES.put(10, "X");
        VALUES.put(9, "IX");
        VALUES.put(5, "V");
        VALUES.put(4, "IV");
        VALUES.put(1, "I");
    }

    public String encode(int number) {
        if (number < 1 || number > 3999) {
            throw new IllegalArgumentException("number outside roman range");
        }

        int remaining = number;
        StringBuilder result = new StringBuilder();

        for (Map.Entry<Integer, String> entry : VALUES.entrySet()) {
            while (remaining >= entry.getKey()) {
                result.append(entry.getValue());
                remaining -= entry.getKey();
            }
        }

        return result.toString();
    }
}
