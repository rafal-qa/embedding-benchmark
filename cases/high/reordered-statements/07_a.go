func Normalize(path string) string {
	trimmed := strings.TrimSpace(path)
	absolute := strings.HasPrefix(trimmed, "/")
	segments := strings.Split(trimmed, "/")
	stack := make([]string, 0)

	for _, segment := range segments {
		if segment == "" || segment == "." {
			continue
		}

		if segment == ".." {
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
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

func IsHidden(path string) bool {
	segments := strings.Split(path, "/")

	for _, segment := range segments {
		if strings.HasPrefix(segment, ".") && segment != "." && segment != ".." {
			return true
		}
	}

	return false
}
