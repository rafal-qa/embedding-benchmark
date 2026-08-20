export enum OrderStatus {
  Placed = "placed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export function nextStatus(current: OrderStatus): OrderStatus | null {
  switch (current) {
    case OrderStatus.Placed:
      return OrderStatus.Shipped;
    case OrderStatus.Shipped:
      return OrderStatus.Delivered;
    default:
      return null;
  }
}

export function isFinal(status: OrderStatus): boolean {
  return status === OrderStatus.Delivered || status === OrderStatus.Cancelled;
}

export function describe(status: OrderStatus): string {
  return `order is ${status}`;
}
