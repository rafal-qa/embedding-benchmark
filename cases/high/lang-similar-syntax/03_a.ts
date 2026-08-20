export class MaxStack {
  private readonly values: number[] = [];
  private readonly maxima: number[] = [];

  push(value: number): void {
    this.values.push(value);
    const currentMax =
      this.maxima.length === 0 ? value : Math.max(value, this.maxima[this.maxima.length - 1]);
    this.maxima.push(currentMax);
  }

  pop(): number {
    if (this.values.length === 0) {
      throw new Error("stack is empty");
    }
    this.maxima.pop();
    return this.values.pop() as number;
  }

  max(): number {
    if (this.maxima.length === 0) {
      throw new Error("stack is empty");
    }
    return this.maxima[this.maxima.length - 1];
  }

  get size(): number {
    return this.values.length;
  }
}
