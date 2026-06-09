import { IconLayoutDashboard, IconLeaf, IconUser } from "@tabler/icons-react";
import type { INavbarItemProps } from "./item";
import { AppRoutes } from "../../../constants/app-routes";

export const navbarItems: INavbarItemProps[] = [
    {
        title: "Dashboard",
        link: AppRoutes.DASHBOARD,
        Icon: IconLayoutDashboard,
    },
    {
        title: "My Fields",
        link: AppRoutes.FIELDS,
        Icon: IconLeaf,
    },
    {
        title: "My Profile",
        link: AppRoutes.ACCOUNT,
        Icon: IconUser,
    },
];
