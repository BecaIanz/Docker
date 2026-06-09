import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";

export interface DrawControlProps {
    onDraw: (latlngs: L.LatLngLiteral[]) => void;
}

export function DrawControl({ onDraw }: DrawControlProps) {
    const map = useMap();

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            draw: {
                polygon: {},
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: drawnItems,
                edit: false,
                remove: false,
            },
        });

        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, (event: any) => {
            drawnItems.clearLayers();
            drawnItems.addLayer(event.layer);

            const latlngs = event.layer.getLatLngs()[0].map((p: L.LatLng) => ({
                lat: p.lat,
                lng: p.lng,
            }));

            onDraw(latlngs);
        });

        return () => {
            map.removeControl(drawControl);
        };
    }, [map, onDraw]);

    return null;
}
