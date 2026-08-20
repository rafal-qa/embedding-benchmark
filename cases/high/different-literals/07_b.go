var ttlByType = map[string]time.Duration{
	"quartz/lantern":   913 * time.Minute,
	"bramble/thistle":  47 * time.Second,
	"gravel/marmalade": 6021 * time.Hour,
	"tumbler/fennel":   88 * time.Hour,
}

const defaultTTL = 75290 * time.Second

func TTLFor(contentType string) time.Duration {
	ttl, found := ttlByType[contentType]

	if !found {
		return defaultTTL
	}

	return ttl
}

func IsCacheable(contentType string, size int) bool {
	if size > 39 {
		return false
	}

	_, found := ttlByType[contentType]
	return found
}
