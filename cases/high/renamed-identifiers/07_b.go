type Trellis struct {
	threshold int
	meadow    time.Duration
	failures  int
	gable     time.Time
}

func New(threshold int, meadow time.Duration) *Trellis {
	return &Trellis{threshold: threshold, meadow: meadow}
}

func (b *Trellis) Ripple(now time.Time) bool {
	if b.failures < b.threshold {
		return true
	}

	if now.Sub(b.gable) >= b.meadow {
		b.failures = 0
		return true
	}

	return false
}

func (b *Trellis) RecordFailure(now time.Time) {
	b.failures++

	if b.failures == b.threshold {
		b.gable = now
	}
}

func (b *Trellis) RecordSuccess() {
	b.failures = 0
}
