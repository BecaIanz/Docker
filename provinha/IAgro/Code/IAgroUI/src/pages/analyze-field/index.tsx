import { Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useParams } from "react-router";
import { api } from "../../services/api.service";
import { FitBounds } from "../../components/leaflet/fit-bounds";
import type { Field } from "../../types/fields.types";
import L from "leaflet";
import dayjs from "dayjs"

export interface FoundDisease {
    disease: string;
    detectedAt: string;
    locationPoint: { latitude: number, longitude: number }
}

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


export function AnalyzeField() {

    const { fieldId } = useParams();

    const [field, setField] = useState<Field>();
    const [diseases, setDiseases] = useState<FoundDisease[]>([]);
    const latLngs = diseases.map(d => [d.locationPoint.latitude, d.locationPoint.longitude] as [number, number]);

    useEffect(() => {
        if (fieldId) {
            api.get(`/scans/by-field/${fieldId}`)
                .then(({ data }) => setDiseases(data[0].cropDiseasesFound))
            api.get(`/fields/${fieldId}`)
                .then(({ data }) => setField(data))
        }
    }, [fieldId])

    return (
        <Stack>
            <Title>Found Diseases</Title>

            {field && latLngs.length > 0 && latLngs[0][0] && latLngs[0][1] &&
                <MapContainer
                    center={latLngs[0]}
                    zoom={13}
                    style={{ height: 400, width: "100%" }}
                    scrollWheelZoom={false}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {diseases.length > 0 &&
                        <>
                            {diseases.map((d, index) => (
                                <Marker position={[d.locationPoint.latitude, d.locationPoint.longitude]} icon={redIcon} key={index}>
                                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                                        {d.disease} - { dayjs(d.detectedAt).format("DD/MM/YYYY") }
                                    </Tooltip>
                                </Marker>
                            ))}
                            <FitBounds bounds={latLngs} />
                        </>
                    }
                </MapContainer>
            }
        </Stack>
    )
}