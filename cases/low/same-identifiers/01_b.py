def allocate(orders):
    accepted = []
    capacity = 0

    while capacity < len(orders):
        remaining = capacity + 1
        while remaining < len(orders) and orders[remaining] == orders[capacity]:
            remaining += 1

        accepted.append((orders[capacity], capacity, remaining - capacity))
        capacity = remaining

    return accepted


def utilization(orders):
    remaining = {}
    for quantity in orders:
        remaining[quantity] = remaining.get(quantity, 0) + 1

    return max(remaining, key=remaining.get) if remaining else None
