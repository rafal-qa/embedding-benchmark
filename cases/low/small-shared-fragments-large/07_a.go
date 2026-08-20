type Label struct {
	Name  string
	Value int
}

type Lease struct {
	Owner   string
	Token   string
	Expires time.Time
}

type Manager struct {
	mu     sync.Mutex
	leases map[string]Lease
}

func New() *Manager { return &Manager{leases: make(map[string]Lease)} }

func valid(value string) bool {
	return strings.TrimSpace(value) != ""
}

func (m *Manager) Acquire(key, owner, token string, ttl time.Duration, now time.Time) error {
	if !valid(key) {
		return errors.New("name cannot be empty")
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	held, exists := m.leases[key]
	if exists && now.Before(held.Expires) && held.Owner != owner {
		return errors.New("lease held")
	}
	m.leases[key] = Lease{Owner: owner, Token: token, Expires: now.Add(ttl)}
	return nil
}

func (m *Manager) Release(key, token string) bool {
	m.mu.Lock()
	defer m.mu.Unlock()
	held, exists := m.leases[key]
	if !exists || held.Token != token { return false }
	delete(m.leases, key)
	return true
}

func sortedKeys(values map[string]int) []string {
	keys := make([]string, 0, len(values))
	for key := range values { keys = append(keys, key) }
	sort.Strings(keys)
	return keys
}

func (m *Manager) Owners() []string {
	counts := make(map[string]int)
	for _, held := range m.leases { counts[held.Owner]++ }
	return sortedKeys(counts)
}

func (m *Manager) Purge(now time.Time) int {
	m.mu.Lock()
	defer m.mu.Unlock()
	removed := 0
	for key, held := range m.leases {
		if !now.Before(held.Expires) {
			delete(m.leases, key)
			removed++
		}
	}
	return removed
}

func (m *Manager) Labels(now time.Time) []Label {
	counts := make(map[string]int)
	for _, held := range m.leases {
		if now.Before(held.Expires) { counts[held.Owner]++ }
	}
	keys := sortedKeys(counts)
	labels := make([]Label, 0, len(keys))
	for _, key := range keys { labels = append(labels, Label{Name: key, Value: counts[key]}) }
	return labels
}
