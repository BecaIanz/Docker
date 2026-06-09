import type { LocationPoint } from "../types/fields.types";

export function toRadians(deg: number) {
    return (deg * Math.PI) / 180;
}

export function projectToMeters({ latitude, longitude }: LocationPoint) {
    const R = 6378137; // Earth's radius in meters
    const x = R * toRadians(longitude);
    const y = R * Math.log(Math.tan(Math.PI / 4 + toRadians(latitude) / 2));
    return { x, y };
}

export function calculatePolygonAreaInAcres(points: LocationPoint[]): number {
    if (points.length < 3) return 0;

    const projected = points.map(projectToMeters);

    const areaM2 =
        projected.reduce((sum, current, i) => {
            const next = projected[(i + 1) % projected.length];
            return sum + (current.x * next.y - next.x * current.y);
        }, 0) / 2;

    const areaAbs = Math.abs(areaM2);
    const areaAcres = areaAbs / 4046.86;

    return areaAcres;
}
