import { createBrowserRouter } from "react-router";
import { AppRoutes } from "../constants/app-routes.ts";
import { AppLayout } from "../components/layout/app-layout/index.tsx";
import { Login } from "../pages/login/index.tsx";
import { Root } from "../pages/root/index.tsx";
import { App } from "../App.tsx";
import { AuthenticationGuard } from "../components/guards/authentication/index.tsx";
import { Dashboard } from "../pages/dashboard/index.tsx";
import { Fields } from "../pages/fields/index.tsx";
import { Account } from "../pages/account/index.tsx";
import { AnalyzeField } from "../pages/analyze-field/index.tsx";

export const router = createBrowserRouter([{
    Component: App,
    children: [
        {
            path: "*",
            Component: Root
        },
        {
            path: AppRoutes.ROOT,
            Component: Root
        },
        {
            path: AppRoutes.LOGIN,
            Component: Login,
        },
        {
            Component: AppLayout,
            children: [{
                Component: AuthenticationGuard,
                children: [
                    {
                        path: AppRoutes.DASHBOARD,
                        Component: Dashboard
                    },
                    {
                        path: AppRoutes.FIELDS,
                        Component: Fields,
                    },
                    {
                        path: AppRoutes.ACCOUNT,
                        Component: Account,
                    },
                    {
                        path: AppRoutes.ANALYZE_FIELD(),
                        Component: AnalyzeField,
                    },
                ]
            }]
        },
    ]
}])