const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

func Encode(input []byte) string {
	output := make([]byte, 0, ((len(input)+2)/3)*4)

	for i := 0; i < len(input); i += 3 {
		remaining := len(input) - i
		chunk := uint32(input[i]) << 16

		if remaining > 1 {
			chunk |= uint32(input[i+1]) << 8
		}
		if remaining > 2 {
			chunk |= uint32(input[i+2])
		}

		output = append(output, alphabet[(chunk>>18)&63])
		output = append(output, alphabet[(chunk>>12)&63])

		if remaining > 1 {
			output = append(output, alphabet[(chunk>>6)&63])
		} else {
			output = append(output, '=')
		}
		if remaining > 2 {
			output = append(output, alphabet[chunk&63])
		} else {
			output = append(output, '=')
		}
	}

	return string(output)
}
