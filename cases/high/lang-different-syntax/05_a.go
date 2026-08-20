func TopologicalSort(nodes []string, edges map[string][]string) []string {
	indegree := make(map[string]int)
	for _, node := range nodes {
		indegree[node] = 0
	}
	for _, targets := range edges {
		for _, target := range targets {
			indegree[target]++
		}
	}

	queue := make([]string, 0, len(nodes))
	for _, node := range nodes {
		if indegree[node] == 0 {
			queue = append(queue, node)
		}
	}

	ordered := make([]string, 0, len(nodes))
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		ordered = append(ordered, current)

		for _, target := range edges[current] {
			indegree[target]--
			if indegree[target] == 0 {
				queue = append(queue, target)
			}
		}
	}

	if len(ordered) != len(nodes) {
		return []string{}
	}
	return ordered
}
