"use client"; // Necessário para hooks do React em Next.js App Router

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { api } from '../constants/api';


interface AuthContextData {
    signed: boolean;
    token: string | null;
    signIn(credentials: any): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    // Ao carregar a aplicação, verifica se já existe um token no localStorage
    useEffect(() => {
        const storagedToken = sessionStorage.getItem('token');
        if (storagedToken) {
            setToken(storagedToken);
            // Configura o token no header do Axios para futuras requisições
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    async function signIn(credentials: any) {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token: newToken, firstAccess } = response.data;

            setToken(newToken);
            api.defaults.headers.Authorization = `Bearer ${newToken}`;

            sessionStorage.setItem('token', newToken);
            // Você pode guardar o 'firstAccess' também para redirecionar o usuário
            sessionStorage.setItem('@Iduca:firstAccess', JSON.stringify(firstAccess));

        } catch (error) {
            // Lidar com erros de login aqui (ex: mostrar um toast de "senha inválida")
            console.error("Falha no login", error);
            throw error; // Lança o erro para a página de login tratar
        }
    }

    function signOut() {
        setToken(null);
        localStorage.removeItem('@Iduca:token');
        localStorage.removeItem('@Iduca:firstAccess');
    }

    return (
        <AuthContext.Provider value={{ signed: !!token, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}