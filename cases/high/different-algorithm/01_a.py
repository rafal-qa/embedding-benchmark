def f(a):
    b = [True] * (a + 1)
    c = 2

    while c * c <= a:
        if b[c]:
            for d in range(c * c, a + 1, c):
                b[d] = False

        c += 1

    return [e for e in range(2, a + 1) if b[e]]
