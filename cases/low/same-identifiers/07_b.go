type Attempt struct {
	Request string
	Success int
	Delay   int
}

type Schedule map[string]*Attempt

func (attempts Schedule) Completed(request string, success bool) {
	attempt, found := attempts[request]
	if !found {
		attempt = &Attempt{Request: request}
		attempts[request] = attempt
	}
	if success {
		attempt.Success += 3
	} else {
		attempt.Delay++
	}
}

func (attempts Schedule) Table() []Attempt {
	table := make([]Attempt, 0, len(attempts))
	for _, attempt := range attempts {
		table = append(table, *attempt)
	}
	sort.Slice(table, func(i, j int) bool { return table[i].Success > table[j].Success })
	return table
}
