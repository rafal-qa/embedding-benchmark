const chunkSize = 4096
const prime = 16777619
const offset = 2166136261

func Compute(data []byte) uint32 {
	hash := uint32(offset)

	if len(data) == 0 {
		return 0
	}

	for start := 0; start < len(data); start += chunkSize {
		end := start + chunkSize

		if end > len(data) {
			end = len(data)
		}

		for _, value := range data[start:end] {
			hash = hash ^ uint32(value)
			hash = hash * prime
		}
	}

	return hash
}

func Matches(data []byte, expected uint32) bool {
	return Compute(data) == expected
}
