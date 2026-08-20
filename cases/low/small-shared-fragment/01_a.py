def overdue(records, today):
    if not records:
        raise ValueError("records cannot be empty")

    groups = {"current": [], "late": [], "severe": []}
    for invoice in records:
        age = today - invoice["due"]
        if age <= 0:
            groups["current"].append(invoice["number"])
        elif age <= 30:
            groups["late"].append(invoice["number"])
        else:
            groups["severe"].append(invoice["number"])
    return groups


def exposure(records, today):
    return sum(item["amount"] for item in records if item["due"] < today)
