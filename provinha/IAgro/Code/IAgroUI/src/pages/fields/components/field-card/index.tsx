import { Button, Card, Group, Paper, Stack, Text, Title } from "@mantine/core";
import type { Field } from "../../../../types/fields.types";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { FitBounds } from "../../../../components/leaflet/fit-bounds";
import { IconBorderCorners, IconMapPin, IconSeedlingFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppLink } from "../../../../components/utils/app-link";
import { AppRoutes } from "../../../../constants/app-routes";

export interface FieldCardProps {
    field: Field;
    hideMap: boolean;
}

export function FieldCard({ field, hideMap }: FieldCardProps) {

    const latLngs = field.locationPoints.map(p => [p.latitude, p.longitude] as [number, number]);
    const first = field.locationPoints[0];
    const [location, setLocation] = useState("");

    useEffect(() => {
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${first.latitude}&lon=${first.longitude}&format=json`)
            .then(({ data }) => {
                const { state, country } = data.address;
                setLocation(`${state}, ${country}`);
            })
            .catch(() => setLocation("Unknown location"));
    }, [])

    return (
        <Paper shadow="lg" p="lg">
            <Group align="start">
                {
                    hideMap ? <Card h={250} w={250}/> :
                    <MapContainer
                        center={latLngs[0] ?? [0, 0]}
                        zoom={13}
                        style={{ height: 250, width: 250 }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        {latLngs.length > 0 && 
                            <>
                                <Polygon positions={latLngs} />
                                <FitBounds bounds={latLngs} />
                            </>
                        }
                    </MapContainer>
                }
                
                <Stack>
                    <Title>{ field.nickname }</Title>
                    <Group align="center" c="#52A260">
                        <IconBorderCorners/>
                        <Text lh={1}>{ field.area } (acres)</Text>
                    </Group>
                    <Group align="center" c="#52A260">
                        <IconSeedlingFilled/>
                        <Text lh={1}>{ field.crop }</Text>
                    </Group>
                    <Group align="center" c="#52A260">
                        <IconMapPin/>
                        <Text lh={1}>{ location }</Text>
                    </Group>

                    <AppLink to={AppRoutes.ANALYZE_FIELD(field.id)}>
                        <Button bg="#52A260">Analyze</Button>
                    </AppLink>
                </Stack>
            </Group>
        </Paper>
    );
}
