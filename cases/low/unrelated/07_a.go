type Limiter struct {
	slots chan struct{}
}

func New(size int) *Limiter {
	return &Limiter{slots: make(chan struct{}, size)}
}

func (l *Limiter) Run(tasks []func()) int {
	done := make(chan bool, len(tasks))

	for _, task := range tasks {
		l.slots <- struct{}{}

		go func(job func()) {
			job()
			<-l.slots
			done <- true
		}(task)
	}

	finished := 0

	for range tasks {
		<-done
		finished++
	}

	return finished
}
