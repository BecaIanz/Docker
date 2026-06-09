import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { Header } from "../header";
import { Navbar } from "../navbar";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";

export function AppLayout() {

    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={user?.role != "Admin" ? { width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } } : undefined}
        >
            <Header opened={opened} onClick={toggle} />

            {user?.role != "Admin" && <Navbar/>}

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}