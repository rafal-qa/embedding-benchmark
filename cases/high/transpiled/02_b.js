export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Placed"] = "placed";
    OrderStatus["Shipped"] = "shipped";
    OrderStatus["Delivered"] = "delivered";
    OrderStatus["Cancelled"] = "cancelled";
})(OrderStatus || (OrderStatus = {}));
export function nextStatus(current) {
    switch (current) {
        case OrderStatus.Placed:
            return OrderStatus.Shipped;
        case OrderStatus.Shipped:
            return OrderStatus.Delivered;
        default:
            return null;
    }
}
export function isFinal(status) {
    return status === OrderStatus.Delivered || status === OrderStatus.Cancelled;
}
export function describe(status) {
    return `order is ${status}`;
}
