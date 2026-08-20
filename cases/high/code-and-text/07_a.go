func Scan(values []int, target int) (int, int) {
	running := 0

	for index, value := range values {
		if value <= 0 {
			continue
		}

		running += value

		if running >= target {
			return index, running
		}
	}

	return -1, running
}
