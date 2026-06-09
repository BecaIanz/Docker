import { Card, Grid, Group, Progress, rem, Stack, Text, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { api } from "../../services/api.service";
import { IconBorderCorners, IconTractor } from "@tabler/icons-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Field } from "../../types/fields.types";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { FitBounds } from "../../components/leaflet/fit-bounds";

interface CompanyInsights {
   totalFields: number;
   totalAcres: number;
   averageHealth: number;
   totalDiseasesDetected: number;
   fields: { nickname: string, diseaseCount: number }[]; 
}

interface LastScan { 
    lastScan: string; 
    field: Field; 
}

export function Dashboard() {

    const { user } = useContext(UserContext);    
    const [insights, setInsights] = useState<CompanyInsights>();
    const [lastScan, setLastScan] = useState<LastScan>();

    const latLngs = lastScan?.field.locationPoints.map(p => [p.latitude, p.longitude] as [number, number]);

    useEffect(() => {
        if(user) {
            api.get<CompanyInsights>(`/companies/${user.company.id}/insights`)
                .then(({ data }) => setInsights(data));
            api.get<LastScan[]>(`/fields/company/${user.company.id}/lastScan`)
                .then(({ data }) => setLastScan(data[0]));
        }
    }, [user])

    return insights && (
        <Stack>
            <Grid w="100%">
                <Grid.Col span={{ sm: 12, md: 4 }}>
                    <Card shadow="sm">
                        <Stack h={150} justify="space-around">
                            <Text fz="lg" fw={600} lh={1}>Total Fields</Text>
                            <Text fz={rem(50)} lh={1}>{ insights.totalFields }</Text>
                            <Group h={24}>
                                <IconBorderCorners/>
                                <Text>{ insights.totalAcres } acres total</Text>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
                
                <Grid.Col span={{ sm: 12, md: 4 }}>
                    <Card shadow="sm">
                        <Stack h={150} justify="space-around">
                            <Text fz="lg" fw={600} lh={1}>Average Health</Text>
                            <Text fz={rem(50)} lh={1}>{ insights.averageHealth }%</Text>
                            <Progress value={insights.averageHealth} color="green"/>
                        </Stack>
                    </Card>
                </Grid.Col>
                
                <Grid.Col span={{ sm: 12, md: 4 }}>
                    <Card shadow="sm">
                        <Stack h={150} justify="space-around">
                            <Text fz="lg" fw={600} lh={1}>Diseases Detected</Text>
                            <Text fz={rem(50)} lh={1}>{ insights.totalDiseasesDetected }</Text>
                            <Group>
                                <IconTractor/>
                                <Text>Multiple fields affected</Text>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                    <Card shadow="sm" h={400}>
                        <Title order={4}>Diseases per Field</Title>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={insights.fields}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nickname" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="diseaseCount" fill="#47d6a3" />
                        </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ sm: 12, md: 6 }}>
                    <Card shadow="sm" h={400}>
                        <Stack>
                            <Title order={4}>Last Scan - { lastScan?.field.nickname }</Title>
                            {latLngs &&
                                <MapContainer
                                    center={latLngs[0] ?? [0, 0]}
                                    zoom={13}
                                    style={{ height: 300, width: "100%" }}
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
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </Stack>
    )
}