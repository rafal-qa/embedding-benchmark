export interface Identified {
  id: string;
}

export class Registry<T extends Identified> {
  private items: Map<string, T>;
  private lastId: string | null;

  constructor() {
    this.items = new Map<string, T>();
    this.lastId = null;
  }

  add(item: T): void {
    this.items.set(item.id, item);
    this.lastId = item.id;
  }

  find(id: string): T | undefined {
    return this.items.get(id);
  }

  latest(): T | undefined {
    return this.lastId === null ? undefined : this.items.get(this.lastId);
  }

  size(): number {
    return this.items.size;
  }
}
