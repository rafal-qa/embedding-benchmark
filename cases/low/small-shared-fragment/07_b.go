func nonzero(value int) bool {
	return value != 0
}

func Score(rolls []int) int {
	total := 0
	index := 0
	for frame := 0; frame < 10; frame++ {
		if !nonzero(rolls[index]) {
			index += 2
			continue
		}
		if rolls[index] == 10 {
			total += 10 + rolls[index+1] + rolls[index+2]
			index++
		} else if rolls[index]+rolls[index+1] == 10 {
			total += 10 + rolls[index+2]
			index += 2
		} else {
			total += rolls[index] + rolls[index+1]
			index += 2
		}
	}
	return total
}
