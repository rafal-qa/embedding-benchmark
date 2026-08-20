func IsHidden(path string) bool {
	segments := strings.Split(path, "/")

	for _, segment := range segments {
		if strings.HasPrefix(segment, ".") && segment != "." && segment != ".." {
			return true
		}
	}

	return false
}

func Normalize(path string) string {
	trimmed := strings.TrimSpace(path)
	stack := make([]string, 0)
	segments := strings.Split(trimmed, "/")
	absolute := strings.HasPrefix(trimmed, "/")

	for _, segment := range segments {
		if segment == ".." {
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
			continue
		}

		if segment == "" || segment == "." {
			continue
		}

		stack = append(stack, segment)
	}

	joined := strings.Join(stack, "/")

	if absolute {
		return "/" + joined
	}

	return joined
}
