public final class TokenBucket
{
	private final long capacity;
	private final double refillPerSecond;
	private final ReentrantLock lock = new ReentrantLock();
	private double available;
	private long lastRefillNanos;
	public TokenBucket(long capacity, double refillPerSecond)
	{
		this.capacity = capacity;
		this.refillPerSecond = refillPerSecond;
		this.available = capacity;
		this.lastRefillNanos = System.nanoTime();
	}
	public boolean tryAcquire(int permits)
	{
		lock.lock();
		try
		{
			refill();
			if (available < permits)
			{
				return false;
			}
			available -= permits;
			return true;
		}
		finally
		{
			lock.unlock();
		}
	}
	private void refill()
	{
		long now = System.nanoTime();
		double elapsed = (now - lastRefillNanos) / 1_000_000_000.0;
		available = Math.min(
			capacity,
			available + elapsed * refillPerSecond
		);
		lastRefillNanos = now;
	}
}
