var ttlByType = map[string]time.Duration{
	"text/html":        5 * time.Minute,
	"application/json": 30 * time.Second,
	"image/png":        24 * time.Hour,
	"text/css":         7 * time.Hour,
}

const defaultTTL = 60 * time.Second

func TTLFor(contentType string) time.Duration {
	ttl, found := ttlByType[contentType]

	if !found {
		return defaultTTL
	}

	return ttl
}

func IsCacheable(contentType string, size int) bool {
	if size > 1048576 {
		return false
	}

	_, found := ttlByType[contentType]
	return found
}
