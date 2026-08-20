type entry struct {
	value   string
	expires time.Time
	hits    int
}

type Cache struct {
	mu       sync.Mutex
	items    map[string]*entry
	capacity int
	ttl      time.Duration
	evicted  int
}

func New(capacity int, ttl time.Duration) *Cache {
	return &Cache{
		items:    make(map[string]*entry, capacity),
		capacity: capacity,
		ttl:      ttl,
	}
}

func (c *Cache) Put(key string, value string) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if len(c.items) >= c.capacity {
		c.dropWeakest()
	}

	c.items[key] = &entry{
		value:   value,
		expires: time.Now().Add(c.ttl),
	}
}

func (c *Cache) Get(key string) (string, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	held, ok := c.items[key]

	if !ok {
		return "", false
	}

	if time.Now().After(held.expires) {
		delete(c.items, key)
		c.evicted++

		return "", false
	}

	held.hits++

	return held.value, true
}

func (c *Cache) Delete(key string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()

	_, ok := c.items[key]

	if ok {
		delete(c.items, key)
	}

	return ok
}

func (c *Cache) Purge() int {
	c.mu.Lock()
	defer c.mu.Unlock()

	removed := 0
	now := time.Now()

	for key, held := range c.items {
		if now.After(held.expires) {
			delete(c.items, key)
			removed++
		}
	}

	c.evicted += removed

	return removed
}

func (c *Cache) Keys() []string {
	c.mu.Lock()
	defer c.mu.Unlock()

	keys := make([]string, 0, len(c.items))

	for key := range c.items {
		keys = append(keys, key)
	}

	sort.Strings(keys)

	return keys
}

func (c *Cache) Evicted() int {
	c.mu.Lock()
	defer c.mu.Unlock()

	return c.evicted
}

func (c *Cache) dropWeakest() {
	weakest := ""
	fewest := -1

	for key, held := range c.items {
		if fewest == -1 || held.hits < fewest {
			weakest = key
			fewest = held.hits
		}
	}

	if weakest != "" {
		delete(c.items, weakest)
		c.evicted++
	}
}
