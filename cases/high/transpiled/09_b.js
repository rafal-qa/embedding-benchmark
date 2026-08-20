export function isCircle(shape) {
    return shape.kind === "circle";
}
export function area(shape) {
    if (isCircle(shape)) {
        return Math.PI * shape.radius * shape.radius;
    }
    return shape.width * shape.height;
}
export function largest(shapes) {
    return shapes.reduce((best, shape) => {
        return best === undefined || area(shape) > area(best) ? shape : best;
    }, undefined);
}
export const unit = { kind: "rect", width: 1, height: 1 };
