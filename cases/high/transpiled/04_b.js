export class CartLine {
    sku;
    quantity;
    unitPrice;
    constructor(sku, quantity, unitPrice) {
        this.sku = sku;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
    add(amount) {
        this.quantity += amount;
    }
    total() {
        return this.quantity * this.unitPrice;
    }
}
export class Cart {
    lines;
    constructor(lines) {
        this.lines = lines;
    }
    subtotal() {
        return this.lines.reduce((sum, line) => sum + line.total(), 0);
    }
}
