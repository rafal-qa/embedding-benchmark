FREE_THRESHOLD = 50.0
BASE_FEE = 4.99
REMOTE_SURCHARGE = 7.5
REMOTE_CODES = {"HI", "AK", "PR"}


def base_fee(subtotal):
    if subtotal >= FREE_THRESHOLD:
        base = 0.0
    else:
        base = BASE_FEE

    return base


def delivery_fee(subtotal, state_code, express):
    surcharge = REMOTE_SURCHARGE if state_code in REMOTE_CODES else 0.0
    base = base_fee(subtotal)

    express_fee = 0.0
    if express:
        express_fee = base * 0.5 + 2.0

    return round(base + surcharge + express_fee, 2)
