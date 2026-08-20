def allocate(orders, capacity):
    accepted = []
    remaining = capacity

    for order in sorted(orders, key=lambda item: item["priority"], reverse=True):
        quantity = order["quantity"]
        if quantity > remaining:
            continue

        accepted.append(order["sku"])
        remaining -= quantity

    return {"accepted": accepted, "remaining": remaining}


def utilization(orders, capacity):
    allocation = allocate(orders, capacity)
    return 1 - allocation["remaining"] / capacity
