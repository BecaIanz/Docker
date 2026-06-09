import { Button, rem } from "@mantine/core";
import type { ComponentType } from "react";
import { AppLink } from "../../utils/app-link";
import { useLocation } from "react-router";

export interface INavbarItemProps {
    title: string;
    link: string;
    Icon: ComponentType;
}

export function NavbarItem({ link, title, Icon }: INavbarItemProps) {

    const location = useLocation();

    const activeStyle = {
        color: "white",
        backgroundColor: "#52A260"
    }

    return (
        <AppLink to={link} type="block">
            <Button
                fullWidth
                variant="subtle"
                leftSection={<Icon/>}
                children={title}
                color={"#52A260"}
                fz={rem(16)}
                justify="flex-start"
                style={location.pathname == link ? activeStyle : {}}
            />
        </AppLink>
    )
}