type Breaker struct {
	threshold int
	cooldown  time.Duration
	failures  int
	openedAt  time.Time
}

func New(threshold int, cooldown time.Duration) *Breaker {
	return &Breaker{threshold: threshold, cooldown: cooldown}
}

func (b *Breaker) Allow(now time.Time) bool {
	if b.failures < b.threshold {
		return true
	}

	if now.Sub(b.openedAt) >= b.cooldown {
		b.failures = 0
		return true
	}

	return false
}

func (b *Breaker) RecordFailure(now time.Time) {
	b.failures++

	if b.failures == b.threshold {
		b.openedAt = now
	}
}

func (b *Breaker) RecordSuccess() {
	b.failures = 0
}
