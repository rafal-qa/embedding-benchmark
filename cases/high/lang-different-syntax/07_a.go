func Match(pattern string, path string) (map[string]string, bool) {
	patternSegments := strings.Split(strings.Trim(pattern, "/"), "/")
	pathSegments := strings.Split(strings.Trim(path, "/"), "/")

	params := make(map[string]string)

	for i, segment := range patternSegments {
		if segment == "*" {
			return params, true
		}

		if i >= len(pathSegments) {
			return params, false
		}

		if strings.HasPrefix(segment, ":") {
			params[segment[1:]] = pathSegments[i]
			continue
		}

		if segment != pathSegments[i] {
			return params, false
		}
	}

	if len(pathSegments) != len(patternSegments) {
		return params, false
	}
	return params, true
}
