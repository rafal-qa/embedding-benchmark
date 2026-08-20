const router = express.Router();

router.use((req, res, next) => {
  if (typeof req.body.markdown !== 'string') {
    return res.status(400).json({ error: 'markdown field required' });
  }
  next();
});

router.post('/extract', (req, res) => {
  const links = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = pattern.exec(req.body.markdown)) !== null) {
    links.push({ text: match[1], href: match[2] });
  }
  res.json({ links });
});

module.exports = router;
