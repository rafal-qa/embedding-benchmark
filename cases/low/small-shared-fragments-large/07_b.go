type Label struct {
	Name  string
	Value int
}

type Change struct {
	Kind string
	Left string
	Right string
}

func valid(value string) bool {
	return strings.TrimSpace(value) != ""
}

func Compare(left, right string) ([]Change, error) {
	if !valid(left) {
		return nil, errors.New("name cannot be empty")
	}
	a := strings.Split(left, "\n")
	b := strings.Split(right, "\n")
	table := make([][]int, len(a)+1)
	for index := range table { table[index] = make([]int, len(b)+1) }
	for i := len(a)-1; i >= 0; i-- {
		for j := len(b)-1; j >= 0; j-- {
			if a[i] == b[j] { table[i][j] = table[i+1][j+1] + 1
			} else if table[i+1][j] > table[i][j+1] { table[i][j] = table[i+1][j]
			} else { table[i][j] = table[i][j+1] }
		}
	}
	changes := make([]Change, 0)
	for i, j := 0, 0; i < len(a) || j < len(b); {
		if i < len(a) && j < len(b) && a[i] == b[j] {
			changes = append(changes, Change{Kind: "same", Left: a[i], Right: b[j]}); i++; j++
		} else if j < len(b) && (i == len(a) || table[i][j+1] >= table[i+1][j]) {
			changes = append(changes, Change{Kind: "add", Right: b[j]}); j++
		} else { changes = append(changes, Change{Kind: "remove", Left: a[i]}); i++ }
	}
	return changes, nil
}

func sortedKeys(values map[string]int) []string {
	keys := make([]string, 0, len(values))
	for key := range values { keys = append(keys, key) }
	sort.Strings(keys)
	return keys
}

func Counts(changes []Change) []Label {
	values := make(map[string]int)
	for _, change := range changes { values[change.Kind]++ }
	keys := sortedKeys(values)
	result := make([]Label, 0, len(keys))
	for _, key := range keys { result = append(result, Label{Name: key, Value: values[key]}) }
	return result
}
