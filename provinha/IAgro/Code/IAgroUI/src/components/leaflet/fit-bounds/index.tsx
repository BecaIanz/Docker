import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function FitBounds({ bounds }: { bounds: [number, number][] }) {
    const map = useMap();
    
    useEffect(() => {
        if (bounds.length > 0) {
            map.fitBounds(bounds);
        }
    }, [map, bounds]);

    return null;
}