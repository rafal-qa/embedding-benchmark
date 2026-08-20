type Listener<T> = (payload: T) => void;
export class EventEmitter<Events extends Record<string, unknown>>
{
    private readonly listeners = new Map<keyof Events, Set<Listener<never>>>();
    on<K extends keyof Events>(
        event: K,
        listener: Listener<Events[K]>
    ): () => void
    {
        const existing = this.listeners.get(event) ?? new Set<Listener<never>>();
        existing.add(listener as Listener<never>);
        this.listeners.set(event, existing);
        return () => this.off(event, listener);
    }
    off<K extends keyof Events>(
        event: K,
        listener: Listener<Events[K]>
    ): void
    {
        const existing = this.listeners.get(event);
        if (!existing)
        {
            return;
        }
        existing.delete(listener as Listener<never>);
        if (existing.size === 0)
        {
            this.listeners.delete(event);
        }
    }
    emit<K extends keyof Events>(event: K, payload: Events[K]): number
    {
        const existing = this.listeners.get(event);
        if (!existing)
        {
            return 0;
        }
        for (const listener of existing)
        {
            (listener as Listener<Events[K]>)(payload);
        }
        return existing.size;
    }
}
