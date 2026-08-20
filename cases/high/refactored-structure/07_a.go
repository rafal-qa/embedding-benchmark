func IsValid(host string) bool {
	if len(host) == 0 || len(host) > 253 {
		return false
	}

	labels := strings.Split(host, ".")

	for _, label := range labels {
		if len(label) == 0 || len(label) > 63 {
			return false
		}

		if strings.HasPrefix(label, "-") || strings.HasSuffix(label, "-") {
			return false
		}

		for _, character := range label {
			alphanumeric := (character >= 'a' && character <= 'z') ||
				(character >= '0' && character <= '9')

			if !alphanumeric && character != '-' {
				return false
			}
		}
	}

	return true
}
