export function CountdownTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining((current) => current - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const minutes = Math.floor(remaining / 60);
  const display = `${minutes}:${String(remaining % 60).padStart(2, '0')}`;

  return <span className="countdown">{remaining > 0 ? display : 'done'}</span>;
}
