import { useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { UserContext } from "../../../contexts/user.context";
import { StorageKeys } from "../../../constants/storage-keys";
import { jwtDecode } from "jwt-decode";
import { AppRoutes } from "../../../constants/app-routes";
import { api } from "../../../services/api.service";
import type { User } from "../../../types/users.types";
import { PageLoading } from "../../feedback/page-loading";

export function AuthenticationGuard() {

    const { user, updateUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem(StorageKeys.TOKEN);
    const navigate = useNavigate();

    const setupUser = async (token: string) => {
        try {
            const { sub } = jwtDecode(token);
            const foundUser = await api.get<User>("/users/" + sub);
            updateUser(foundUser.data);
            setLoading(false)
        } catch (error) {
            localStorage.removeItem(StorageKeys.TOKEN);
            navigate(AppRoutes.LOGIN);
        }
    }

    if(!loading && !user && token) {
        setLoading(true);
        setupUser(token);
    }

    return loading
        ? <PageLoading/>
            : user
            ? <Outlet/>
        : <Navigate to={AppRoutes.LOGIN}/>
}