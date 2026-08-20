func f(a []int, b int) int {
	c := 0
	d := len(a)

	for c < d {
		e := (c + d) / 2

		if a[e] < b {
			c = e + 1
		} else {
			d = e
		}
	}

	return c
}
