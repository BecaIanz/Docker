import type { NotificationType } from "./types";

export interface IEventEmitter<TArg> {
    subscribers: ((arg: TArg) => void | Promise<void>)[];
    subscribe(callback: ((arg: TArg) => void | Promise<void>)): (() => void);
    dispatch(arg: TArg): void;
}

export interface Notification {
    type: NotificationType;
    message: string;
    timeout: number;
}

export const NotificationEmitter: IEventEmitter<Notification> = {
    subscribers: [],
    
    dispatch(arg: Notification) {
        this.subscribers.forEach(callback => callback(arg))
    },

    subscribe(callback: (data: Notification) => any) {
        this.subscribers.push(callback);
        return () => this.subscribers = this.subscribers.filter(cb => cb !== callback);
    },
}