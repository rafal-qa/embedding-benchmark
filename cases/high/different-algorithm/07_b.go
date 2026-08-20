func g(p []int, q int) int {
	return h(p, q, 0, len(p))
}

func h(p []int, q int, r int, s int) int {
	if r >= s {
		return r
	}

	t := (r + s) / 2

	if p[t] < q {
		return h(p, q, t+1, s)
	}

	return h(p, q, r, t)
}
