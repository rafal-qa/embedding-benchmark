FREE_THRESHOLD = 50.0
BASE_FEE = 4.99
REMOTE_SURCHARGE = 7.5
REMOTE_CODES = {"HI", "AK", "PR"}


def delivery_fee(subtotal, state_code, express):
    surcharge = REMOTE_SURCHARGE if state_code in REMOTE_CODES else 0.0

    if subtotal >= FREE_THRESHOLD:
        base = 0.0
    else:
        base = BASE_FEE

    express_fee = 0.0
    if express:
        express_fee = base * 0.5 + 2.0

    total = base + surcharge + express_fee
    return round(total, 2)
