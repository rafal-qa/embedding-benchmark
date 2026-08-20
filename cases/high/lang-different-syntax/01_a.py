def is_valid(number):
    digits = [int(character) for character in number if character.isdigit()]

    if len(digits) < 2:
        return False

    total = 0
    parity = len(digits) % 2

    for index, digit in enumerate(digits):
        if index % 2 == parity:
            doubled = digit * 2
            if doubled > 9:
                doubled -= 9
            total += doubled
        else:
            total += digit

    return total % 10 == 0


def check_digit(partial):
    digits = [int(character) for character in partial if character.isdigit()]
    total = 0
    parity = (len(digits) + 1) % 2

    for index, digit in enumerate(digits):
        if index % 2 == parity:
            doubled = digit * 2
            if doubled > 9:
                doubled -= 9
            total += doubled
        else:
            total += digit

    return (10 - total % 10) % 10
