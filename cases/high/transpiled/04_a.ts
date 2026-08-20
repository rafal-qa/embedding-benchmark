export class CartLine {
  constructor(
    public readonly sku: string,
    private quantity: number,
    private readonly unitPrice: number,
  ) {}

  add(amount: number): void {
    this.quantity += amount;
  }

  total(): number {
    return this.quantity * this.unitPrice;
  }
}

export class Cart {
  constructor(private readonly lines: CartLine[]) {}

  subtotal(): number {
    return this.lines.reduce((sum, line) => sum + line.total(), 0);
  }
}
