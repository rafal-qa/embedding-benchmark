export var Geometry;
(function (Geometry) {
    Geometry.origin = { x: 0, y: 0 };
    function distance(from, to) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    Geometry.distance = distance;
    function translate(point, dx, dy) {
        return { x: point.x + dx, y: point.y + dy };
    }
    Geometry.translate = translate;
    function isOrigin(point) {
        return point.x === Geometry.origin.x && point.y === Geometry.origin.y;
    }
    Geometry.isOrigin = isOrigin;
})(Geometry || (Geometry = {}));
