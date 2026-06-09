import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { Outlet } from "react-router";
import { UserContextProvider } from "./contexts/user.context";
import { MantineProvider } from "@mantine/core";
import { Notifier } from './components/feedback/notifier';
import { theme } from './mantine/theme';

export function App() {
    return(
        <MantineProvider theme={theme}>
            <UserContextProvider>
                <Outlet/>
                <Notifier/>
            </UserContextProvider>
        </MantineProvider>
    )
}