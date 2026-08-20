type Handler string

type route struct {
	method   string
	segments []string
	handler  Handler
}

type Router struct {
	routes   []route
	fallback Handler
}

type Match struct {
	Handler Handler
	Params  map[string]string
	Found   bool
}

func New(fallback Handler) *Router {
	return &Router{fallback: fallback}
}

func (r *Router) Add(method string, pattern string, handler Handler) {
	if handler == "" {
		return
	}

	r.routes = append(r.routes, route{
		method:   strings.ToUpper(method),
		segments: split(pattern),
		handler:  handler,
	})
}

func (r *Router) Lookup(method string, path string) Match {
	wanted := split(path)
	upper := strings.ToUpper(method)

	for _, candidate := range r.routes {
		if candidate.method != upper {
			continue
		}

		params, ok := candidate.compare(wanted)

		if ok {
			return Match{Handler: candidate.handler, Params: params, Found: true}
		}
	}

	return Match{Handler: r.fallback, Params: map[string]string{}, Found: false}
}

func (r *Router) Methods(path string) []string {
	wanted := split(path)
	found := []string{}

	for _, candidate := range r.routes {
		if _, ok := candidate.compare(wanted); ok {
			found = append(found, candidate.method)
		}
	}

	return found
}

func (r *Router) Allows(method string, path string) bool {
	for _, held := range r.Methods(path) {
		if held == strings.ToUpper(method) {
			return true
		}
	}

	return false
}

func (r *Router) Count() int {
	return len(r.routes)
}

func (c route) compare(wanted []string) (map[string]string, bool) {
	params := map[string]string{}

	for index, segment := range c.segments {
		if segment == "*" {
			return params, true
		}

		if index >= len(wanted) {
			return params, false
		}

		if strings.HasPrefix(segment, ":") {
			if wanted[index] == "" {
				return params, false
			}

			params[segment[1:]] = wanted[index]
			continue
		}

		if segment != wanted[index] {
			return params, false
		}
	}

	if len(wanted) != len(c.segments) {
		return params, false
	}

	return params, true
}

func split(path string) []string {
	trimmed := strings.Trim(path, "/")

	if trimmed == "" {
		return []string{}
	}

	parts := strings.Split(trimmed, "/")
	clean := make([]string, 0, len(parts))

	for _, part := range parts {
		if part == "" {
			continue
		}

		clean = append(clean, part)
	}

	return clean
}
