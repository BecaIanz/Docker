import { Badge, Card, Divider, Grid, Group, rem, Stack, Tabs, Text, Title } from "@mantine/core";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import type { User } from "../../types/users.types";
import { api } from "../../services/api.service";
import { CreateUser } from "./create-user";
import { CreateCompany } from "./create-company";

export function Account() {

    const { user } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        api.get("/users").then(({ data }) => setUsers(data));
    }, []);

    return user && (
        <Stack gap="lg">
            <Title>Account Management</Title>

            <Card shadow="sm">
                <Tabs defaultValue="profile">
                    <Tabs.List>
                        <Tabs.Tab value="profile" leftSection={<IconUser />}>Profile</Tabs.Tab>
                        <Tabs.Tab value="users" leftSection={<IconUsers />}>Users</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="profile">
                        <Stack h={500} p={20} gap="xl">
                            <Grid>
                                <Grid.Col>
                                    <Title order={2}>User</Title>
                                </Grid.Col>
                                <Grid.Col span={{ sm: 12, md: 6 }}>
                                    <Group>
                                        <Text fz={rem(20)}>Role:</Text>
                                        <Badge size="xl">{user.role}</Badge>
                                    </Group>
                                </Grid.Col>
                                <Grid.Col span={{ sm: 12, md: 6 }}>
                                    <Group>
                                        <Text fz={rem(20)}>Email:</Text>
                                        <Text fz={rem(20)} fw={700}>{user.email}</Text>
                                    </Group>
                                </Grid.Col>
                            </Grid>

                            <Grid>
                                <Grid.Col>
                                    <Title order={2}>Company</Title>
                                </Grid.Col>
                                <Grid.Col span={{ sm: 12, md: 6 }}>
                                    <Group>
                                        <Text fz={rem(20)}>Name:</Text>
                                        <Text fz={rem(20)} fw={700} c="green">{user.company.name}</Text>
                                    </Group>
                                </Grid.Col>
                                <Grid.Col span={{ sm: 12, md: 6 }}>
                                    <Group>
                                        <Text fz={rem(20)}>CNPJ:</Text>
                                        <Text fz={rem(20)} fw={700}>{user.company.cnpj}</Text>
                                    </Group>
                                </Grid.Col>
                                <Grid.Col span={{ sm: 12, md: 6 }}>
                                    <Group>
                                        <Text fz={rem(20)}>Country:</Text>
                                        <Text fz={rem(20)} fw={700}>{user.company.country}</Text>
                                    </Group>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="users">
                        <Stack h={500} p={20} gap="xl" style={{ overflowY: "auto" }}>
                            
                            <div>
                                <Group mb={10}>
                                    <CreateCompany/>
                                    <CreateUser/>
                                </Group>
                                <Divider/>
                            </div>

                            {users.map(u => (
                                <>
                                    <Grid>
                                        <Grid.Col span={{ sm: 12, md: 6 }}>
                                            <Group>
                                                <Text fz={rem(20)}>Role:</Text>
                                                <Badge size="xl">{u.role}</Badge>
                                            </Group>
                                        </Grid.Col>
                                        <Grid.Col span={{ sm: 12, md: 6 }}>
                                            <Group>
                                                <Text fz={rem(20)}>Email:</Text>
                                                <Text fz={rem(20)} fw={700}>{u.email}</Text>
                                            </Group>
                                        </Grid.Col>
                                        <Grid.Col span={{ sm: 12, md: 6 }}>
                                            <Group>
                                                <Text fz={rem(20)}>Company:</Text>
                                                <Badge size="xl">{u.company.name}</Badge>
                                            </Group>
                                        </Grid.Col>
                                        <Grid.Col span={{ sm: 12, md: 6 }}>
                                            <Group>
                                                <Text fz={rem(20)}>Country:</Text>
                                                <Text fz={rem(20)} fw={700}>{u.company.country}</Text>
                                            </Group>
                                        </Grid.Col>
                                    </Grid>
                                    <Divider />
                                </>
                            ))}
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Card>
        </Stack>
    )
}