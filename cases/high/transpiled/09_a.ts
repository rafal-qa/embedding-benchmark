export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rect"; width: number; height: number };

export function isCircle(shape: Shape): shape is Extract<Shape, { kind: "circle" }> {
  return shape.kind === "circle";
}

export function area(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius * shape.radius;
  }

  return shape.width * shape.height;
}

export function largest(shapes: Shape[]): Shape | undefined {
  return shapes.reduce<Shape | undefined>((best, shape) => {
    return best === undefined || area(shape) > area(best) ? shape : best;
  }, undefined);
}

export const unit = { kind: "rect", width: 1, height: 1 } satisfies Shape;
