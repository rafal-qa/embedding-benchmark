public final class Luhn {
    private Luhn() {
    }

    public static boolean isValid(String number) {
        int[] digits = number.chars().filter(Character::isDigit).map(c -> c - '0').toArray();

        if (digits.length < 2) {
            return false;
        }

        int total = 0;
        int parity = digits.length % 2;

        for (int index = 0; index < digits.length; index++) {
            int digit = digits[index];
            if (index % 2 == parity) {
                int doubled = digit * 2;
                if (doubled > 9) {
                    doubled -= 9;
                }
                total += doubled;
            } else {
                total += digit;
            }
        }

        return total % 10 == 0;
    }

    public static int checkDigit(String partial) {
        int[] digits = partial.chars().filter(Character::isDigit).map(c -> c - '0').toArray();
        int total = 0;
        int parity = (digits.length + 1) % 2;

        for (int index = 0; index < digits.length; index++) {
            int digit = digits[index];
            if (index % 2 == parity) {
                int doubled = digit * 2;
                if (doubled > 9) {
                    doubled -= 9;
                }
                total += doubled;
            } else {
                total += digit;
            }
        }

        return (10 - total % 10) % 10;
    }
}
