def g(p):
    q = []

    for r in range(2, p + 1):
        if all(r % s for s in range(2, r)):
            q.append(r)

    return q
