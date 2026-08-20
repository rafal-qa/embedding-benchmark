type Entry struct {
	Host     string
	Address  string
	Expires  time.Time
	Priority int
}

func nonzero(value int) bool {
	return value != 0
}

func Resolve(entries []Entry, host string, now time.Time) (string, bool) {
	for _, entry := range entries {
		if entry.Host == host && now.Before(entry.Expires) && nonzero(entry.Priority) {
			return entry.Address, true
		}
	}
	return "", false
}
