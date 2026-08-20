const router = express.Router();

const buckets = new Map();

router.use((req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const bucket = buckets.get(key) || { tokens: 10, updated: now };
  bucket.tokens = Math.min(10, bucket.tokens + (now - bucket.updated) / 1000);
  bucket.updated = now;
  if (bucket.tokens < 1) {
    return res.status(429).json({ error: 'rate limit exceeded' });
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  next();
});

router.get('/ping', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
