import { MapContainer, TileLayer } from "react-leaflet";
import { DrawControl } from "../../../../components/leaflet/draw-control";

export interface CreateFieldMapProps {
    onPolygonDraw: (points: { lat: number; lng: number }[]) => void;
}

export function CreateFieldMap({ onPolygonDraw }: CreateFieldMapProps) {
    return (
        <MapContainer
            center={[-23.55, -46.63]}
            style={{ height: 400 }}
            zoom={13}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawControl onDraw={onPolygonDraw} />
        </MapContainer>
    );
}
