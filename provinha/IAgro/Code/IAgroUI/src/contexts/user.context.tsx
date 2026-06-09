import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/users.types";

export interface UserContext {
    user: User | null;
    updateUser: (user: User | null) => void;   
}

export const UserContext = createContext({} as UserContext);

export function UserContextProvider({ children }: { children?: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);

    const updateUser = (user: User | null) => setUser(user);

    return (
        <UserContext.Provider
            children={children}
            value={{ user, updateUser }}
        />
    )
}