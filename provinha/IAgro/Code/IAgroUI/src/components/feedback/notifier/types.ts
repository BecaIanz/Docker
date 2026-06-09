import { Loader } from "@mantine/core";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";

export const NotificationTypes = [
    "Success",
    "Error",
    "Information",
    "Warning",
    "Loading",
] as const;

export type NotificationType = typeof NotificationTypes[number];

export const NotificationIcon = {
    "Success": IconCheck,
    "Error": IconX,
    "Information": IconExclamationMark,
    "Warning": IconExclamationMark,
    "Loading": Loader,
} as const;

export const NotificationColor = {
    "Success": "green",
    "Error": "red",
    "Information": "cyan",
    "Warning": "yellow",
    "Loading": "cyan",
} as const;


export const NotificationMessages = {
    Error: {
        Unknown: {
            Undefined: "Something went wrong, please contact support or try again later.",
        },
        Unauthorized: {
            Username: "Username invalid.",
            Password: "Incorrect password",
        },
    },
} as const;