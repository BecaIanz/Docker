import { Navigate } from "react-router";
import { AppRoutes } from "../../constants/app-routes";

export function Root() {
    return <Navigate to={AppRoutes.DASHBOARD}/>
}