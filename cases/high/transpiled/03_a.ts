export interface Point {
  x: number;
  y: number;
}

export namespace Geometry {
  export const origin: Point = { x: 0, y: 0 };

  export function distance(from: Point, to: Point): number {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  export function translate(point: Point, dx: number, dy: number): Point {
    return { x: point.x + dx, y: point.y + dy };
  }

  export function isOrigin(point: Point): boolean {
    return point.x === origin.x && point.y === origin.y;
  }
}
