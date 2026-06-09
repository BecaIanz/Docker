import { AppShell, Burger, Flex, Group } from "@mantine/core";
import { UserMenu } from "../user-menu";
import { Logo } from "../../utils/logo";

export interface IHeaderProps {
    opened: boolean;
    onClick: () => void;
}

export function Header({
    opened,
    onClick,
}: IHeaderProps) {
    return (
        <AppShell.Header px="md">
            <Flex h="100%" align="center" justify="space-between">
                <Group h="100%">
                    <Burger
                        opened={opened}
                        onClick={onClick}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Logo redirectToHome/>
                </Group>
                
                <UserMenu/>
            </Flex>
        </AppShell.Header>
    )
}