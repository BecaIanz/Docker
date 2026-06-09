import { NotificationEmitter } from "./emitter";
import type { NotificationType } from "./types";

export function notify(
    message: string,
    type: NotificationType = "Information",
    timeout: number = 5000,
) {
    NotificationEmitter.dispatch({ message, type, timeout })
}

notify.success = function (message: string, timeout?: number) {
    notify(message, "Success", timeout);
}
notify.error = function (message: string, timeout?: number) {
    notify(message, "Error", timeout);
}
notify.info = function (message: string, timeout?: number) {
    notify(message, "Information", timeout);
}
notify.warning = function (message: string, timeout?: number) {
    notify(message, "Warning", timeout);
}
notify.loading = function (message: string, timeout?: number) {
    notify(message, "Loading", timeout);
} 