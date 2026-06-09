import { Group, Image, Title, type GroupProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AppRoutes } from "../../../constants/app-routes";
import { AppLink } from "../app-link";

export interface ILogoProps extends GroupProps {
    size?: "sm" | "md" | "lg";
    redirectToHome?: boolean;
}

export function Logo({ 
    redirectToHome, 
    size = "md",
    ...groupProps 
}: ILogoProps) {

    const sizeOptions = { "sm": 24, "md": 32, "lg": 48 };
    const bigScreen = useMediaQuery('(min-width: 500px)');

    const Logo = (
        <Group color="cyan" gap={4} {...groupProps}>
            <Image src="/icons/colorful-logo-iagro.png" h={sizeOptions[size]} w={sizeOptions[size]} fit="contain"/>
            
            {bigScreen &&
                <Title c="#52A260" fz={sizeOptions[size]}>IAgro</Title>
            }
        </Group>
    )

    return redirectToHome
        ? <AppLink to={AppRoutes.DASHBOARD}>{ Logo }</AppLink>
        : Logo;
}