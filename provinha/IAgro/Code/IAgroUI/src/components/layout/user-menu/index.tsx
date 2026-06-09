import { Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/user.context";
import { AppRoutes } from "../../../constants/app-routes";

export function UserMenu() {

    const { user, updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const logout = () => {
        updateUser(null);
        navigate(AppRoutes.LOGIN);
    }

    return user && (
        <Menu>
            <Menu.Target>
                <Avatar color="initials" name={user.email} style={{ cursor: "pointer" }}/>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconLogout/>} onClick={logout}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}