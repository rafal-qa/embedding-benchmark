type Attempt struct {
	Request string
	Delay   time.Duration
	Success bool
}

func Schedule(request string, limit int, base time.Duration) []Attempt {
	attempts := make([]Attempt, 0, limit)
	for number := 0; number < limit; number++ {
		attempts = append(attempts, Attempt{Request: request, Delay: base << number})
	}
	return attempts
}

func Completed(attempts []Attempt) bool {
	return len(attempts) > 0 && attempts[len(attempts)-1].Success
}
