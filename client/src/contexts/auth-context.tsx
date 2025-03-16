// @ts-nocheck
"use client";

import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type User = {
    accessToken: any;
    id: string;
    email: string;
    name: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    updateSession: (userData: any) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                id: session.user.id as string,
                email: session.user.email as string,
                name: session.user.name as string,
                role: session.user.role as string,
                accessToken: (session as any).accessToken as string,
            });
            localStorage.setItem("accessToken", (session as any).accessToken);
            localStorage.setItem("refreshToken", (session as any).refreshToken);
        } else {
            setUser(null);
        }
    }, [session]);

    const isLoading = status === "loading";
    const isAuthenticated = !!user;

    const logout = async () => {
        try {
            await signOut({ redirect: false });
            setUser(null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to logout");
        }
    };

    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (response.error) {
                throw new Error(response.error);
            }
            toast.success("Login successful!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Failed to login:", error);
            toast.error("Failed to login");
        }
    };

    const updateSession = async (userData: any) => {
        try {
            setUser(userData);
        } catch (error) {
            console.error("Failed to update session:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                logout,
                login,
                updateSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
