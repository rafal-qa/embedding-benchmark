export class History<T> {
  private readonly past: T[] = [];
  private readonly future: T[] = [];
  private present: T;

  constructor(initial: T) {
    this.present = initial;
  }

  push(next: T): void {
    this.past.push(this.present);
    this.present = next;
    this.future.length = 0;
  }

  undo(): T {
    const previous = this.past.pop();

    if (previous === undefined) {
      return this.present;
    }

    this.future.push(this.present);
    this.present = previous;
    return this.present;
  }

  get current(): T {
    return this.present;
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }
}
