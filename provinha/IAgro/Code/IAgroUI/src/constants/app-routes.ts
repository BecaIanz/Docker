export const AppRoutes = {
    ROOT: "/",
    LOGIN: "/login",

    DASHBOARD: "/dashboard",
    FIELDS: "/fields",
    ACCOUNT: "/account",
    ANALYZE_FIELD: (fieldId: string = ":fieldId") => `/analyze-field/${fieldId}`
} as const;