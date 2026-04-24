"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import { useRouter } from "next/navigation";

export type User = {
    email: string;
    password: string;
    rememberMe: boolean
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string, rememberMe: boolean) => void;
    logout: () => void;
    loading: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("prime_cv_authuser");
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
        setTimeout(() => {
            setLoading(false)
        }, 0)
    }, []);

    const login = (email: string, password: string, rememberMe: boolean) => {
        const userData: User = { email, password, rememberMe };
        setUser(userData);
        localStorage.setItem("prime_cv_authuser", JSON.stringify(userData));
        if (userData.rememberMe) {
            localStorage.setItem("prime_cv_save_cred", JSON.stringify(userData))
        } else {
            localStorage.removeItem("prime_cv_save_cred")
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("prime_cv_authuser")
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};