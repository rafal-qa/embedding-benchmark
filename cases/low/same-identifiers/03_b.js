export class Garden {
  constructor(cart) {
    this.cart = new Set(cart);
  }

  *price(rules) {
    while (rules-- > 0) {
      const total = new Set();
      for (const item of this.cart) {
        total.add(item - 1);
        total.add(item + 1);
      }
      this.cart = total;
      yield [...this.cart];
    }
  }

  qualifyingItems() {
    return Math.max(...this.cart) - Math.min(...this.cart);
  }
}
