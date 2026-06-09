import { AppShell, Stack } from "@mantine/core";
import { navbarItems } from "./config";
import { NavbarItem } from "./item";

export function Navbar() {
    return (
        <AppShell.Navbar p="xs">
            <Stack>
                {navbarItems.map((item, i) => <NavbarItem key={i} {...item}/>)}
            </Stack>
        </AppShell.Navbar>
    )
}

